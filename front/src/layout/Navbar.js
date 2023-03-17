import {
    chakra,
    Flex,
    VisuallyHidden,
    HStack,
    Button,
    useDisclosure,
    Avatar,
    Text,
} from "@chakra-ui/react";
import React, { useEffect } from 'react'
import { AiFillHome, AiOutlineInbox, AiFillBell, AiOutlineShop } from "react-icons/ai";
import { BsFillCameraVideoFill, BsPlus } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setWallet } from "../features/userReducer";
import Web3 from 'web3'
function Navbar() {

    const wallet = useSelector((state) => state.user.wallet)
    const dispatch = useDispatch()

    function connectWallet() {
        console.log('Wallet')
        if (window.ethereum) {
            
            const web3 = new Web3(window.ethereum);
            web3.eth.requestAccounts().then(response => {
                dispatch(setWallet(response[0]))
            })
        }else{
            console.log('Se necesita instalar una extension de Metamask')
        }
    }
   async function disconnectWallet() {
        console.log('Disconnecting Wallet')
        if (window.ethereum) {
            if(wallet){
                dispatch(setWallet(''))
        }}
    }

    useEffect(() => {

    }, [])


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
                            <Text>Logo</Text>
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
                        <Button colorScheme="brand" leftIcon={<BsPlus />} onClick={wallet?disconnectWallet:connectWallet}>
                            {wallet?'Disconnect wallet':'Connect wallet'}
                        </Button>

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
                        <Link to={'/profile'}>
                            <Button
                                variant="solid"
                                size="sm"

                            >
                                {wallet?wallet.substr(0, 3) + '...' + wallet.substr(wallet.length-3, 3):'No wallet'}
                            </Button>
                        </Link>
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