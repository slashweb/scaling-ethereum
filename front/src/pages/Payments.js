import {Button, Center, Container, Heading, HStack, Text, VStack} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import {Box, Flex, Image, chakra} from "@chakra-ui/react";
import useCourses from '../hooks/useCourses';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUsdEthValue} from '../utils/conversion-coins';
import Swal from 'sweetalert2';


function Payments() {
    const [availableBalance, setAvailableBalance] = useState(0)
    const wallet = useSelector((state) => state.user.wallet)
    const coursesContract = useCourses()
    const [buysFromAuthor, setBuysFromAuthor] = useState([])
    const [isLoading, setIsloading] = useState(false);

    const [conversionETH, setConversionETH] = useState(0)

    const init = async () => {
        await setDolarEthConversion()
        await getAvailableBalance()
        await getBuysFromAuthor()
    }

    const claimThisPay = async id => {
        setIsloading(true)
        await coursesContract?.methods?.getBalanceForSingleBuy(wallet, id).send({from: wallet})
        setIsloading(false)
        await init()
    }

    async function setDolarEthConversion() {
        try {
            await getAvailableBalance()
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
        setIsloading(true)
        await coursesContract?.methods?.getAllBalanceForCreator(wallet).send({from: wallet})
        setIsloading(false)
        await init()
    }
    const getAvailableBalance = async () => {
        const res = await coursesContract?.methods?.getAvailableBalance().call({from: wallet})
        setAvailableBalance(res)
    }
    const getBuysFromAuthor = async () => {
        const res = await coursesContract?.methods?.getBuysFromAuthor().call({from: wallet})
        setBuysFromAuthor(res)
    }
    useEffect(() => {
        init()
    }, [])
    return (
        <Container p={10} minH={'100vh'}>
            <Heading>My Payments</Heading>

            <HStack mt={10} mb={10} justifyContent={'flex-end'}>
                <Text>
                    Available balance
                    ${(parseFloat(availableBalance / Math.pow(10, 18)) / conversionETH).toFixed(0)} USD
                </Text>
                <Button
                    variant={'solid'}
                    onClick={() => claimAllAvailable()}
                    isLoading={isLoading}
                >
                    Claim available money
                </Button>
            </HStack>
            <VStack w={'full'}>
                {buysFromAuthor.length !== 0 ? buysFromAuthor.map((item, index) => {
                        const {isPayed, id, idContent, from, ammount} = item
                        return (
                            <React.Fragment key={index}>
                                <HStack w={'full'}>
                                    <Box bg={'white'} rounded={'lg'} p={5} mt={2} mb={3} w={'full'}>
                                        <Box mt={2}>
                                            <Link to={`/courses/${idContent}`}
                                                  _hover={{
                                                      color: "gray.600",
                                                      _dark: {
                                                          color: "gray.200",
                                                      },
                                                      textDecor: "underline",
                                                  }}
                                            > See course</Link>

                                            <Text>
                                                From: {from ? from.substr(0, 3) + '...' + from.substr(from.length - 3, 3) : 'anonymous'} -
                                                ${(parseFloat(ammount / Math.pow(10, 18)) / conversionETH).toFixed(0)} USD
                                            </Text>
                                        </Box>
                                    </Box>

                                    <Button variant={'solid'}
                                            bg={isPayed ? 'white' : 'darkblue'}
                                            color={isPayed ? 'green' : 'white'}
                                            isDisabled={isPayed}
                                            isLoading={isLoading}
                                            onClick={() => claimThisPay(id)}
                                            px={10}>{isPayed ? 'Already claimed!' : 'Claim this purchase'}
                                    </Button>
                                </HStack>
                            </React.Fragment>
                        )
                    })
                    : <Text>No buys</Text>}

            </VStack>
        </Container>
    )
}

export default Payments