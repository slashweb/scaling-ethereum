import { Button, Center, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Box, Flex, Image, chakra } from "@chakra-ui/react";
import useCourses from '../hooks/useCourses';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsdEthValue } from '../utils/conversion-coins';
import Swal from 'sweetalert2';
function CardPayments(props) {
    const { amount, from, idContent, isPayed, id } = props
    const coursesContract = useCourses()
    const [conversionETH, setConversionETH] = useState(0)
    const wallet = useSelector((state) => state.user.wallet)
    async function setDolarEthConversion() {
        try {
            const res = await getUsdEthValue(1)
            setConversionETH((parseFloat(amount / Math.pow(10, 18)) / res).toFixed(2))
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: `Error code: ${e.code} in Conversion Eth to Dollar`,
                text: `${e.message}`,
            })
        }
    }
    const claimThisPay = async () => {
        const res = await coursesContract?.methods?.getBalanceForSingleBuy().call({ from: wallet })
        console.log(res)
    }
    useEffect(() => {
        setDolarEthConversion()
    }, [])

    return (
        <HStack w={'full'}>
            <Box bg={'white'} rounded={'lg'} p={5} mt={2} mb={3} w={'full'} >
                <Center alignItems="center">
                    <chakra.span
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                    >
                        Mar 25, 2023
                    </chakra.span>
                </Center>
                <Box mt={2}>

                    <Heading
                        fontSize="2xl"
                        color="gray.700"
                        _dark={{ color: "white" }}
                        fontWeight="700"

                    >
                        Pay for a course
                    </Heading>
                    <Link to={`/courses/${idContent}`}
                        _hover={{
                            color: "gray.600",
                            _dark: {
                                color: "gray.200",
                            },
                            textDecor: "underline",
                        }}
                    > See course</Link>

                    <Text>From: {from ? from.substr(0, 3) + '...' + from.substr(from.length - 3, 3) : 'anonymous'}</Text>
                    <chakra.p mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
                        ${conversionETH}USD
                    </chakra.p>
                </Box>
            </Box>

            <Button variant={'solid'}
                bg={isPayed ? 'white' : 'darkblue'}
                color={isPayed ? 'green' : 'white'}
                isDisabled={isPayed}
                onClick={claimThisPay}
                px={10}>{isPayed ? 'Already claimed!' : 'Claim this purchase'}</Button>
        </HStack>
    );
}
function Payments() {
    const [availableBalance, setAvailableBalance] = useState(0)
    const wallet = useSelector((state) => state.user.wallet)
    const coursesContract = useCourses()
    const [buysFromAuthor, setBuysFromAuthor] = useState([])

    const [conversionETH, setConversionETH] = useState(0)

    async function setDolarEthConversion() {
        try {
            getAvailableBalance()
            const res = await getUsdEthValue(1)
            setConversionETH(res)
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: `Error code: ${e.code} in Conversion Eth to Dollar`,
                text: `${e.message}`,
            })
        }
    }

    const claimAllAvailable = async () => {
        const res = await coursesContract?.methods?.getAllBalanceForCreator(wallet).call({ from: wallet })
        getAvailableBalance()
        getBuysFromAuthor()
        console.log(res)
    }
    const getAvailableBalance = async () => {
        const res = await coursesContract?.methods?.getAvailableBalance().call({ from: wallet })
        setAvailableBalance(res)

    }
    const getBuysFromAuthor = async () => {
        const res = await coursesContract?.methods?.getBuysFromAuthor().call({ from: wallet })
        setBuysFromAuthor(res)
        console.log(res)
    }
    useEffect(() => {
        setDolarEthConversion()
        getAvailableBalance()

        getBuysFromAuthor()
    }, [])
    return (
        <Container>
            <Heading>My Payments</Heading>
            <Text> Available balance ${(parseFloat(availableBalance / Math.pow(10, 18)) / conversionETH).toFixed(2)} USD </Text>
            <Button variant={'solid'}
                onClick={() => claimAllAvailable()}
            >Claim available money</Button>
            <VStack w={'full'}>
                {buysFromAuthor.length !== 0 ? buysFromAuthor.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <CardPayments
                                amount={item.ammount}
                                from={item.from}
                                idContent={item.idContent}
                                isPayed={item.isPayed}
                                id={item.id}
                            />
                        </React.Fragment>
                    )
                })
                    : <Text>No buys</Text>}

            </VStack>
        </Container>
    )
}

export default Payments