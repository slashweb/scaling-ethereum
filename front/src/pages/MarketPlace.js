import React, { useEffect } from 'react'
import Pagination from "@choc-ui/paginator";
import { Box, Button, Center,Flex, Heading,  Image, Link, SimpleGrid, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import TopCreatorTable from './marketplace/TopCreatorTable';
import { tableDataTopCreators } from '../test/tableDataTopCreators';
import { tableColumnsTopCreators } from '../test/tableColumnsTopCreators';
import HistoryItem from './marketplace/HistoryItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../features/courseReducer';
function SimpleProduct(props) {
    const { image, name, author, price, bidders, download, currentbid } = props;
    return (
        <Center py={4}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${image})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={image}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {author}
                    </Text>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {name}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                            {price}
                        </Text>
                    </Stack>
                    <Link
                        href={download}
                        mt={{
                            base: "0px",
                            md: "10px",
                            lg: "0px",
                            xl: "10px",
                            "2xl": "0px",
                        }}>
                        <Button

                            color='white'
                            bg={'purple'}
                            fontSize='sm'
                            fontWeight='500'
                            borderRadius='70px'
                            px='24px'
                            py='5px'>
                            Place Bid
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Center>
    );
}

function PaginationView() {
    return (
        <Flex
            w="full"
            bg={"gray.400"}
            _dark={{ bg: "gray.600" }}
            p={50}
            alignItems="center"
            justifyContent="center"
        >
            <Pagination
                defaultCurrent={9}
                total={500}
                paginationProps={{ display: "flex" }}
                pageNeighbours={1}
                showQuickJumper
            />
        </Flex>
    );
};


function MarketPlace() {
    const data = useSelector((state) => state.course.data)
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(fetchCourses())
    },[])
    return (
        <>
            <Box pt={{ base: "80px", md: "80px", xl: "80px" }}>

                    <Flex flexDirection='row' justifyContent={'space-around'}>
                        <Flex direction='column'>

                            <Flex
                                mt='45px'
                                mb='20px'
                                justifyContent='space-between'
                                direction={{ base: "column", md: "row" }}
                                align={{ base: "start", md: "center" }}>
                                <Text color={'black'} fontSize='2xl' ms='24px' fontWeight='700'>
                                    Trending NFTs
                                </Text>
                                <Flex
                                    align='center'
                                    me='20px'
                                    ms={{ base: "24px", md: "0px" }}
                                    mt={{ base: "20px", md: "0px" }}>
                                    <Link
                                        color={'purple'}
                                        fontWeight='500'
                                        me={{ base: "34px", md: "44px" }}
                                        to='#art'>
                                        All
                                    </Link>
                                    <Link
                                        color={'purple'}
                                        fontWeight='500'
                                        me={{ base: "34px", md: "44px" }}
                                        to='#art'>
                                        Art
                                    </Link>
                                    <Link
                                        color={'purple'}
                                        fontWeight='500'
                                        me={{ base: "34px", md: "44px" }}
                                        to='#music'>
                                        Music
                                    </Link>
                                    <Link
                                        color={'purple'}
                                        fontWeight='500'
                                        me={{ base: "34px", md: "44px" }}
                                        to='#collectibles'>
                                        Collectibles
                                    </Link>
                                    <Link color={'purple'} fontWeight='500' to='#sports'>
                                        Sports
                                    </Link>
                                </Flex>
                            </Flex>

                            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
                                {data.map((item, index) => {
                                    return (
                                        <>
                                            <SimpleProduct
                                                key={index}
                                                name={item.title}
                                                author={item.author}
                                                bidders={item.bidders}
                                                image={item.preview}
                                                price={item.price}
                                                download='#'
                                            />
                                        </>
                                    )
                                })}
                            </SimpleGrid>
                        </Flex>
                        <Flex
                            flexDirection='column'
                            gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
                            <Box px='0px' mb='20px'>
                                <TopCreatorTable
                                    tableData={tableDataTopCreators}
                                    columnsData={tableColumnsTopCreators}
                                />
                            </Box>
                            <Box p='0px'>
                                <Flex
                                    align={{ sm: "flex-start", lg: "center" }}
                                    justify='space-between'
                                    w='100%'
                                    px='22px'
                                    py='18px'>
                                    <Text color={'purple'} fontSize='xl' fontWeight='600'>
                                        History
                                    </Text>
                                    <Button variant='action'>See all</Button>
                                </Flex>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <HistoryItem
                                                name={item.title}
                                                date='30s ago'
                                                key={index}
                                                author={item.author}
                                                image={item.preview}
                                                price={item.price}
                                            />
                                        )
                                    })
                                }

                            </Box>
                        </Flex>

                    </Flex>
            </Box>
            <PaginationView />
        </>

    )
}

export default MarketPlace