import React from 'react'
import { useState, useEffect } from 'react'
import {
    useDisclosure,
    Box,
    Stack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Text,
} from "@chakra-ui/react"
import { getUsdEthValue, getUsdEthValueForContract, getWei } from '../../utils/conversion-coins'
import Swal from 'sweetalert2'
import useCourses from '../../hooks/useCourses'
import { useSelector } from 'react-redux'
function BuyModal(props) {
    const { title, price, id } = props
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const wallet = useSelector((state) => state.user.wallet)
    const [eth, setEth] = useState()
    const [conversion, setConversion] = useState()
    const [conversionWei, setConversionWei] = useState()

    const coursesContract = useCourses()
    async function setDolarEthConversion() {
        try {
            const res = await getUsdEthValue(1)
            setConversion(res)
            getEths(res, parseInt(price))
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: `Error code: ${e.code} in Conversion Eth to Dollar`,
                text: `${e.message}`,
            })
        }
    }
    async function setWeiConversion() {
        try {
            const res = await getWei(1)
            setConversionWei(res)

        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: `Error code: ${e.code} in Conversion Eth to Dollar`,
                text: `${e.message}`,
            })
        }
    }
    function getEths(conversion, quantity) {
        setEth(quantity * conversion)
    }

    async function confirmTransaction() {
        const newPrice = await getUsdEthValueForContract(price)
        const newPriceW = getWei(newPrice)
        console.log('price test', newPriceW)
        let res = await coursesContract?.methods?.buyContent(id).send({
            value: newPriceW.toFixed(0),
            ammount: newPriceW.toFixed(0),
            from: wallet 
        })
        console.log('0x', res)
    }
    useEffect(() => {
        setDolarEthConversion()

    }, [])

    return (
        <>
            <Button
                color='white'
                bg={'purple'}
                onClick={onOpen}
                fontSize='sm'
                fontWeight='500'
                borderRadius='70px'
                px='24px'
                py='5px'>
                Buy
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Buy Course</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>By accepting this transaction, you will be able to view this course</Text>
                        <Box p={8}>
                            <Stack spacing={4}>
                                <FormControl id="title">
                                    <FormLabel>Title</FormLabel>
                                    <Text color={'darkblue'}>{title} </Text>
                                </FormControl>
                                <FormControl id="price">
                                    <FormLabel>Price</FormLabel>
                                    <Text fontWeight={'bold'} >${price} USD</Text>
                                    <Text >{isNaN(eth) ? parseInt(price) * conversion : eth} ETH </Text>
                                </FormControl>


                            </Stack>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            colorScheme='blue'
                            isLoading={isLoading}
                            onClick={confirmTransaction}
                        >
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default BuyModal