import React, { useCallback, useEffect } from 'react'
import { chakra, Box, useColorModeValue, Icon, Image, Flex, Stack, Button } from "@chakra-ui/react";
import { useWeb3React } from '@web3-react/core'
import useCourses from '../hooks/useCourses';
import { connector } from '../config/web3';

function Hero1() {
    const bg = useColorModeValue("white", "gray.800");
    return (
        <Box pos="relative" overflow="hidden" bg={bg} mt={10}>
            <Box maxW="7xl" mx="auto">
                <Box
                    pos="relative"
                    pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
                    maxW={{ lg: "2xl" }}
                    w={{ lg: "full" }}
                    zIndex={1}
                    bg={bg}
                    border="solid 1px transparent"
                >
                    <Icon
                        display={{ base: "none", lg: "block" }}
                        position="absolute"
                        right={0}
                        top={0}
                        bottom={0}
                        h="full"
                        w={48}
                        color={bg}
                        transform="translateX(50%)"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </Icon>
                    <Box
                        mx="auto"
                        maxW={{ base: "7xl" }}
                        px={{ base: 4, sm: 6, lg: 8 }}
                        mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
                    >
                        <Box
                            w="full"
                            textAlign={{ sm: "center", lg: "left" }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <chakra.h1
                                fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                                letterSpacing="tight"
                                lineHeight="short"
                                fontWeight="extrabold"
                                color="gray.900"
                                _dark={{ color: "white" }}
                            >
                                <chakra.span display={{ base: "block", xl: "inline" }}>
                                    Data to enrich your{" "}
                                </chakra.span>
                                <chakra.span
                                    display={{ base: "block", xl: "inline" }}
                                    color="brand.600"
                                    _dark={{ color: "brand.400" }}
                                >
                                    online business
                                </chakra.span>
                            </chakra.h1>
                            <chakra.p
                                mt={{ base: 3, sm: 5, md: 5 }}
                                fontSize={{ sm: "lg", md: "xl" }}
                                maxW={{ sm: "xl" }}
                                mx={{ sm: "auto", lg: 0 }}
                                color="gray.500"
                            >
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                                fugiat aliqua.
                            </chakra.p>
                            <Box
                                mt={{ base: 5, sm: 8 }}
                                display={{ sm: "flex" }}
                                justifyContent={{ sm: "center", lg: "start" }}
                                fontWeight="extrabold"
                                fontFamily="fantasy"
                            >
                                <Box rounded="full" shadow="md">
                                    <chakra.a
                                        w="full"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        border="solid 1px transparent"
                                        fontSize={{ base: "md", md: "lg" }}
                                        rounded="md"
                                        color="white"
                                        bg="#276387"
                                        _hover={{ bg: "brand.700" }}
                                        px={{ base: 8, md: 10 }}
                                        py={{ base: 3, md: 4 }}
                                        cursor="pointer"
                                    >
                                        Get started
                                    </chakra.a>
                                </Box>
                                <Box mt={[3, 0]} ml={[null, 3]}>
                                    <chakra.a
                                        w="full"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        px={{ base: 8, md: 10 }}
                                        py={{ base: 3, md: 4 }}
                                        border="solid 1px transparent"
                                        fontSize={{ base: "md", md: "lg" }}
                                        rounded="md"
                                        color="brand.700"
                                        bg="brand.100"
                                        _hover={{ bg: "brand.200" }}
                                        cursor="pointer"
                                    >
                                        Live demo
                                    </chakra.a>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                position={{ lg: "absolute" }}
                top={{ lg: 0 }}
                bottom={{ lg: 0 }}
                right={{ lg: 0 }}
                w={{ lg: "50%" }}
                border="solid 1px transparent"
            >
                <Image
                    h={[56, 72, 96, "full"]}
                    w="full"
                    fit="cover"
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                    alt=""
                    loading="lazy"
                />
            </Box>
        </Box>
    );
}
function Feature(props) {
    return (
        <Flex>
            <Flex shrink={0}>
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    h={12}
                    w={12}
                    rounded="md"
                    _light={{ bg: "brand.500" }}
                    color="white"
                >
                    <Icon
                        boxSize={6}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        {props.icon}
                    </Icon>
                </Flex>
            </Flex>
            <Box ml={4}>
                <chakra.dt
                    fontSize="lg"
                    fontWeight="medium"
                    lineHeight="6"
                    _light={{ color: "gray.900" }}
                >
                    {props.title}
                </chakra.dt>
                <chakra.dd mt={2} color="gray.500" _dark={{ color: "gray.400" }}>
                    {props.children}
                </chakra.dd>
            </Box>
        </Flex>
    );
};
function FeatureView() {
    return (
        <Flex
            bg="#edf3f8"
            _dark={{ bg: "#3e3e3e" }}
            p={20}
            w="auto"
            justifyContent="center"
            alignItems="center"
        >
            <Box py={12} bg="white" _dark={{ bg: "gray.800" }} rounded="xl">
                <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
                    <Box textAlign={{ lg: "center" }}>
                        <chakra.h2
                            _light={{ color: "brand.600" }}
                            fontWeight="semibold"
                            textTransform="uppercase"
                            letterSpacing="wide"
                        >
                            Transactions
                        </chakra.h2>
                        <chakra.p
                            mt={2}
                            fontSize={{ base: "3xl", sm: "4xl" }}
                            lineHeight="8"
                            fontWeight="extrabold"
                            letterSpacing="tight"
                            _light={{ color: "gray.900" }}
                        >
                            A better way to send money
                        </chakra.p>
                        <chakra.p
                            mt={4}
                            maxW="2xl"
                            fontSize="xl"
                            mx={{ lg: "auto" }}
                            color="gray.500"
                            _dark={{ color: "gray.400" }}
                        >
                            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
                            magnam voluptatum cupiditate veritatis in accusamus quisquam.
                        </chakra.p>
                    </Box>

                    <Box mt={10}>
                        <Stack
                            spacing={{ base: 10, md: 0 }}
                            display={{ md: "grid" }}
                            gridTemplateColumns={{ md: "repeat(2,1fr)" }}
                            gridColumnGap={{ md: 8 }}
                            gridRowGap={{ md: 10 }}
                        >
                            <Feature
                                title="Competitive exchange rates"
                                icon={
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                    />
                                }
                            >
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Maiores impedit perferendis suscipit eaque, iste dolor
                                cupiditate blanditiis ratione.
                            </Feature>

                            <Feature
                                title=" No hidden fees"
                                icon={
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                    />
                                }
                            >
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Maiores impedit perferendis suscipit eaque, iste dolor
                                cupiditate blanditiis ratione.
                            </Feature>

                            <Feature
                                title="Transfers are instant"
                                icon={
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                }
                            >
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Maiores impedit perferendis suscipit eaque, iste dolor
                                cupiditate blanditiis ratione.
                            </Feature>

                            <Feature
                                title="Mobile notifications"
                                icon={
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                }
                            >
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Maiores impedit perferendis suscipit eaque, iste dolor
                                cupiditate blanditiis ratione.
                            </Feature>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
};

function Home() {
    const { active, account, activate } = useWeb3React()
    const coursesContract = useCourses()
    const getCourses = useCallback(async () => {
        if (coursesContract) {
            const res = await coursesContract?.methods?.retrieve()?.call()
            console.log('res', res)
        }

    }, [coursesContract])

    const connect = useCallback(() => {
        activate(connector)
    }, [activate])

    useEffect(() => {
        if (active) {
            getCourses()
        }
    }, [active, connect, getCourses])

    return (
        <>
            <Hero1 />
            <FeatureView />
        </>
    )
};


export default Home