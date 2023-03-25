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
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Menu,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from 'react'
import { AiFillHome, AiFillBell, AiOutlineShop } from "react-icons/ai";
import { BsFillCameraVideoFill, BsPlus } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setWallet } from "../actions/users";
import { Auth } from '@polybase/auth'
import useCourses from "../hooks/useCourses";
import { guid } from "../utils";
import { getFileWithCid } from "../utils";

function Navbar() {

    const auth = new Auth()
    const wallet = useSelector((state) => state.user.wallet)
    const coursesContract = useCourses()
    const type = useSelector((state) => state.user.type)
    const dispatch = useDispatch()
    const [balance, setBalance] = useState()
    const [profile, setProfile] = useState()

    const createNewProfile = async () => {
        const res = await coursesContract?.methods?.createNewProfile(guid(), '').send({ from: wallet })
        if (res) {
            return await getMyProfile()
        }
        return res
    }

    const getMyProfile = async () => {
        let res = await coursesContract?.methods?.getMyProfile().call({ from: wallet })
        if (res.addr === '0x0000000000000000000000000000000000000000') {
            await createNewProfile()
        }
        setProfile(res)
        return res
    }

    auth.onAuthUpdate(async (authState) => {
        if (authState) {
            const userId = authState.userId
            await getMyProfile()
            dispatch(setWallet(userId))
        } else {
        }
    })

    async function signIn(force) {
        const res = await auth.signIn({ force });
    }


    const connect = async () => {
        const authState = await auth.signIn({ force: true })
        const userId = authState.userId
        dispatch(setWallet(userId))
    }

    async function disconnectWallet() {
        await auth.signOut()
        dispatch(setWallet(''))
        dispatch(setBalance(''))
    }

    useEffect(() => {
        connect()
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
                        <Link to={'/'}>
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
                        </HStack>
                    </HStack>
                    <HStack
                        spacing={3}
                        display={mobileNav.isOpen ? "none" : "flex"}
                        alignItems="center"
                    >
                        {balance ?
                            <Box color='blue' fontWeight={'bold'} backgroundColor='blue.400' p={2} rounded={'md'}>
                                {balance + ' ETH'}
                            </Box> : null}

                        <Text color='#ffffff' fontWeight={'bold'}>

                            {wallet ? wallet.substr(0, 3) + '...' + wallet.substr(wallet.length - 3, 3) : 'No wallet'}
                        </Text>

                        <Box
                            p={3}
                            color="gray.800"
                            _dark={{ color: "inherit" }}
                            rounded="sm"
                            _hover={{ color: "gray.800", _dark: { color: "gray.600" } }}
                        >
                            <Link to={'notifications'}>
                                <AiFillBell />
                                <VisuallyHidden>Notifications</VisuallyHidden>
                            </Link>
                        </Box>

                        <Button
                            variant="solid"
                            size="sm"
                            leftIcon={wallet ? null : <BsPlus />} onClick={wallet ? disconnectWallet : connect}
                        >
                            {wallet ? 'Disconnect wallet' : 'Connect wallet'}
                        </Button>
                        {wallet ?
                            <Flex>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        {
                                            profile ?

                                                <Avatar
                                                    size={'sm'}
                                                    src={getFileWithCid(profile.profilePic)}
                                                />
                                                :
                                                <Avatar
                                                    size={'sm'}
                                                    src={'https://bit.ly/dan-abramov'}
                                                />
                                        }
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem><Link to={'profile'}>Profile</Link></MenuItem>
                                        <MenuItem><Link to={'favorites'}>Favorites</Link></MenuItem>
                                        <MenuItem><Link to={'notifications'}>Notifications</Link></MenuItem>
                                        <MenuItem><Link to={'subscriptions'}>My subscriptions</Link></MenuItem>
                                        {type === 'user' || !type ? null :
                                            <MenuItem><Link to={'subscribers'}>My subscribers</Link></MenuItem>}
                                        <MenuDivider />
                                        <MenuItem>Sign Out</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                            : null}
                    </HStack>
                </Flex>
            </chakra.header>
        </>
    );
};


export default Navbar