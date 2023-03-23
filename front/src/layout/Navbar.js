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
import React, {useCallback, useEffect} from 'react'
import {AiFillHome, AiFillBell, AiOutlineShop} from "react-icons/ai";
import {BsFillCameraVideoFill, BsPlus} from "react-icons/bs";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {setBalance, setWallet} from "../actions/users";
import {useWeb3React} from '@web3-react/core'
import {connector} from '../config/web3'
import {Auth} from '@polybase/auth'
import useCourses from "../hooks/useCourses";
import Web3 from "web3";

function Navbar() {

    const auth = new Auth()
    const coursesContract = useCourses()

    console.log('contract', coursesContract)
    auth.onAuthUpdate((authState) => {
        if (authState) {
            console.log('User is logged in', authState)
        } else {

        }
    })

    const {active, activate, deactivate, account, library} = useWeb3React();
    const wallet = useSelector((state) => state.user.wallet)
    const balance = useSelector((state) => state.user.balance)
    const type = useSelector((state) => state.user.type)
    const dispatch = useDispatch()

    const connect = useCallback(async () => {
        // activate(connector)
        const authState = await auth.signIn({force: true})
        const userId = authState.userId

        dispatch(setWallet(userId))
        console.log('auth state', authState)
    }, [activate])


    const getBalance = useCallback(async () => {
        const toSet = await library.eth.getBalance(account)
        dispatch(setBalance((toSet / 1e18).toFixed(2)))
    })

    async function disconnectWallet() {
        deactivate()
        dispatch(setWallet(''))
        dispatch(setBalance(''))
    }

    const test = async () => {
        const res2 = await coursesContract?.methods?.getAllCourses().call()
        console.log('test here', res2)
    }

    useEffect(() => {
        if (active) {
            dispatch(setWallet(account))
            getBalance()
        } else {
            connect()
        }
    }, [active])

    const bg = 'black';
    const mobileNav = useDisclosure();
    return (
        <>
            <chakra.header
                bg={bg}
                w="full"
                px={{base: 2, sm: 4}}
                py={4}
                shadow="md"
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" spacing={3} alignItems="center">
                        <Link to={'/'}>
                            <Text>Logo</Text>
                        </Link>
                        <HStack spacing={3} display={{base: "none", md: "inline-flex"}}>
                            <Link to={'/'}>
                                <Button variant="solid"
                                        leftIcon={<AiFillHome/>}
                                        colorScheme="brand"
                                        size="sm">
                                    Home
                                </Button>
                            </Link>
                            <Link to={'/marketplace'}>
                                <Button
                                    variant="solid"
                                    colorScheme="brand"
                                    leftIcon={<AiOutlineShop/>}
                                    size="sm"
                                >
                                    Marketplace
                                </Button>
                            </Link>
                            <Link to={'/courses'}>
                                <Button
                                    variant="solid"
                                    colorScheme="brand"
                                    leftIcon={<BsFillCameraVideoFill/>}
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
                            <Box color='blue' fontWeight={'bold'} backgroundColor='blue.400' p={2} rounded={'md'}>
                                {balance + ' ETH'}
                            </Box> : null}

                        <Text color='#ffffff' fontWeight={'bold'}>

                            {wallet ? wallet.substr(0, 3) + '...' + wallet.substr(wallet.length - 3, 3) : 'No wallet'}
                        </Text>

                        <Box
                            p={3}
                            color="gray.800"
                            _dark={{color: "inherit"}}
                            rounded="sm"
                            _hover={{color: "gray.800", _dark: {color: "gray.600"}}}
                        >
                            <Link to={'notifications'}>
                                <AiFillBell/>
                                <VisuallyHidden>Notifications</VisuallyHidden>
                            </Link>
                        </Box>

                        <Button
                            variant="solid"
                            size="sm"
                            onClick={test}
                        >
                            Test btn
                        </Button>
                        <Button
                            variant="solid"
                            size="sm"
                            leftIcon={wallet ? null : <BsPlus/>} onClick={wallet ? disconnectWallet : connect}
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
                                        <Avatar
                                            size={'sm'}
                                            src={
                                                'https://bit.ly/dan-abramov'
                                            }
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem><Link to={'profile'}>Profile</Link></MenuItem>
                                        <MenuItem><Link to={'favorites'}>Favorites</Link></MenuItem>
                                        <MenuItem><Link to={'notifications'}>Notifications</Link></MenuItem>
                                        <MenuItem><Link to={'subscriptions'}>My subscriptions</Link></MenuItem>
                                        {type === 'user' || !type ? null :
                                            <MenuItem><Link to={'subscribers'}>My subscribers</Link></MenuItem>}
                                        <MenuDivider/>
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