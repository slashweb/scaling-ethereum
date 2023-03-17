import {
    chakra,
    Flex,
    VisuallyHidden,
    HStack,
    Button,
    useDisclosure,
    Avatar,
    Text,
    Box,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from 'react'
import { AiFillHome, AiFillBell, AiOutlineShop } from "react-icons/ai";
import { BsFillCameraVideoFill, BsPlus } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setBalance, setWallet } from "../actions/users";
import { useWeb3React } from '@web3-react/core'
import { connector } from '../config/web3'


function Navbar() {

    const { active, activate, deactivate, account, library } = useWeb3React();
    const wallet = useSelector((state) => state.user.wallet)
    const balance = useSelector((state) => state.user.balance)
    const dispatch = useDispatch()
    
    

    const connect = useCallback(() => {
        activate(connector)
    }, [activate])


    const getBalance = useCallback(async () => {
        const toset = await library.eth.getBalance(account)
        dispatch(setBalance((toset / 1e18).toFixed(2)))
    })

    async function disconnectWallet() {
        deactivate()
        dispatch(setWallet(''))
        dispatch(setBalance(''))
    }

    useEffect(() => {
        if (active) {
            dispatch(setWallet(account))
            getBalance()
        }
    })



    const bg = 'black';
    const mobileNav = useDisclosure();
    return (
        <>
            <chakra.header
                bg={bg}
                w="full"
                px={{ base: 2, sm: 4 }}
                py={4}
                shadow="md"
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" spacing={3} alignItems="center">
                        <Link
                            to={'/'}
                        >
                            <Text>Logo {active ? 'hola' : 'adios'}</Text>
                        </Link>

                        <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
                            <Link to={'/'}>
                                <Button variant="solid"
                                    leftIcon={<AiFillHome />}
                                    colorScheme="brand"
                                    size="sm">
                                    Home
                                </Button>
                            </Link>
                            <Link to={'/marketplace'}>
                                <Button
                                    variant="solid"
                                    colorScheme="brand"
                                    leftIcon={<AiOutlineShop />}
                                    size="sm"
                                >
                                    Marketplace
                                </Button>
                            </Link>
                            <Link to={'/courses'}>
                                <Button
                                    variant="solid"
                                    colorScheme="brand"
                                    leftIcon={<BsFillCameraVideoFill />}
                                    size="sm"
                                >
                                    Courses
                                </Button>
                            </Link>
                        </HStack>
                    </HStack>
                    <HStack
                        spacing={3}
                        display={mobileNav.isOpen ? "none" : "flex"}
                        alignItems="center"
                    >
                        {balance ?
                            <Box color='blue' fontWeight={'bold'} backgroundColor='blue.400' p={2} rounded={'md'} >
                                {balance + ' ETH'}
                            </Box> : null}

                        <Text color='#ffffff' fontWeight={'bold'} >

                            {wallet ? wallet.substr(0, 3) + '...' + wallet.substr(wallet.length - 3, 3) : 'No wallet'}
                        </Text>

                        <chakra.a
                            p={3}
                            color="gray.800"
                            _dark={{ color: "inherit" }}
                            rounded="sm"
                            _hover={{ color: "gray.800", _dark: { color: "gray.600" } }}
                        >
                            <AiFillBell />
                            <VisuallyHidden>Notifications</VisuallyHidden>
                        </chakra.a>

                        <Button
                            variant="solid"
                            size="sm"
                            leftIcon={wallet ? null : <BsPlus />} onClick={wallet ? connect : connect}
                        >
                            {wallet ? 'Disconnect wallet' : 'Connect wallet'}
                        </Button>
                        <Avatar
                            size="sm"
                            name="Dan Abrahmov"
                            src="https://bit.ly/dan-abramov"
                        />
                    </HStack>
                </Flex>
            </chakra.header>
        </>
    );
};


export default Navbar