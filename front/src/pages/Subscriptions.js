import { InfoIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Center, Flex, Heading, HStack, Input, InputGroup, InputRightElement, List, ListIcon, ListItem, Select, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const exampleSubscriptions = [
    {
        title: 'Basic',
        plan: 'basic',
        handle: 'John Doe',
        price: '0.0023 ETH',
        duration: 12,
        features: ['Access to all content']
    },
    {
        title: 'Pro',
        plan: 'pro',
        handle: 'John Doe',
        price: '0.0053 ETH',
        duration: 24,
        features: ['Access to all content', 'You can bid NFTS']
    },
    {
        title: 'Gold',
        plan: 'gold',
        handle: 'John Doe',
        price: '0.0093 ETH',
        duration: 36,
        features: ['Access to all content', 'You can bid NFTS', '5 paid content included']
    },
    {
        title: 'Basic',
        plan: 'basic',
        handle: 'James Hudson',
        price: '0.0010 ETH',
        duration: 12,
        features: ['Access to all content']
    },
    {
        title: 'Pro',
        plan: 'pro',
        handle: 'James Hudson',
        price: '0.0044 ETH',
        duration: 12,
        features: ['Access to all content', 'You can bid NFTS']
    },
    {
        title: 'Pro',
        plan: 'pro',
        handle: 'Richard Belmont',
        price: '0.0099 ETH',
        duration: 36,
        features: ['Access to all content', 'You can bid NFTS']
    },
]
function PriceWrapper(props) {
    const { title, plan, handle, price, duration, features } = props
    return (

        <Box
            mb={4}
            shadow="md"
            borderWidth="1px"
            bg={plan === 'basic' ? 'blue.50' : plan === 'pro' ? 'yellow.50' : plan === 'gold' ? 'orange.100' : 'white'}
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={'gray.200'}
            borderRadius={'xl'}>
            <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                    {title}
                </Text>

                <Text fontWeight="300" fontSize="lg">
                    {handle}
                </Text>
                <Text fontWeight="100" fontSize="sm">
                    Plan {plan}
                </Text>
                <HStack justifyContent="center">
                    <Text fontSize="5xl" fontWeight="900">
                        {price}
                    </Text>

                </HStack>
                <Text fontSize="3xl" color="gray.500">
                    for {duration} months
                </Text>
            </Box>
            <VStack
                bg={'gray.50'}
                py={4}
                borderBottomRadius={'xl'}>
                <List spacing={3} textAlign="start" px={12}>
                    {features.map((item, index) => {
                        return (
                            <ListItem key={index}>
                                <ListIcon as={FaCheckCircle} color="green.500" />
                                {item}
                            </ListItem>
                        )
                    })
                    }
                </List>
                <Box w="80%" pt={7}>
                    <Button w="full" colorScheme="red" variant="outline">
                        Subscribe
                    </Button>
                </Box>
            </VStack>
        </Box>

    );
}
function SubscriptionCard(props) {
    const { handle, wallet, userType, description, avatarURL, plan } = props
    return (
        <Center py={6}>
            <Box
                maxW={'270px'}
                w={'full'}
                bg={plan === 'basic' ? 'blue.50' : plan === 'pro' ? 'yellow.50' : plan === 'gold' ? 'orange.100' : 'white'}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Flex
                    h={'120px'}
                    w={'full'}
                    color={'gold'}

                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={avatarURL}
                        alt={'Author'}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {handle}
                        </Heading>
                        <Text color={'gray.500'}>{description}</Text>
                        <Text color={'gray.500'}>{wallet}</Text>
                    </Stack>

                    <Stack spacing={0} align={'center'}>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            {userType}
                        </Text>
                    </Stack>

                    <Button
                        w={'full'}
                        mt={8}
                        bg={'#151f21'}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}>
                        {plan}
                    </Button>
                </Box>
            </Box>
        </Center>
    );
}
function NoSubscriptions() {
    return (
        <Center textAlign="center" py={10} px={6} mx={20} m={12} bg={'white'} rounded={'lg'}>
            <VStack>
                <InfoIcon boxSize={'50px'} color={'blue.500'} />
                <Heading as="h2" size="lg" mt={6} mb={2}>
                    You haven't subscribed yet. Subscribe your favorite creators to enjoy their content
                </Heading>
            </VStack>
        </Center>
    )
}
function NotFound(props) {
    const { search, criteria } = props
    return (
        <Center textAlign="center" py={10} px={6} mx={20} m={12} bg={'white'} rounded={'lg'}>
            <VStack>
                <InfoIcon boxSize={'50px'} color={'blue.500'} />
                <Heading as="h2" size="lg" mt={6} mb={2}>

                    Content not found with '{search}' as a {criteria}. Check your spelling or use other terms
                </Heading>
            </VStack>
        </Center>
    )
}

function Subscriptions() {
    const [search, setSearch] = useState('')
    const [criteria, setCriteria] = useState('')
    const [results, setResults] = useState(exampleSubscriptions)
    const searchBar = (e) => {
        setSearch(e.target.value)
    }
    //funcion para filtrar
    function SearchFunction() {

        if (!search || !criteria || criteria === 'all') {
            setResults(exampleSubscriptions)
        } else {
            setResults(exampleSubscriptions.filter((dato) =>
                dato[criteria] === search))
        }
    }
    const type =useSelector(type)
    return (
        <>
        
            <HStack bg={'white'} p={5}>
                <Select w={'1/4'} value={criteria} placeholder='Choose one...' onChange={(e) => setCriteria(e.target.value)}>
                    <option value='all'>Get All</option>
                    <option value='handle'>Handle</option>
                    <option value='plan'>Plan</option>
                </Select>
                <InputGroup>
                    <Input type="text" disabled={!criteria || criteria === 'all'} value={search}
                        onChange={searchBar}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                SearchFunction()
                            }
                        }}
                        placeholder='Write a term for search' />
                    <InputRightElement width='1/5'>
                        <Button bg={'darkblue'} color={'white'} size='md' onClick={SearchFunction}>
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup></HStack>
            <Heading m={10}>Subscriptions (user's view)</Heading>
            {results.length > 0 ?
                <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12}>
                    {results.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <PriceWrapper
                                    title={item.title}
                                    plan={item.plan}
                                    handle={item.handle}
                                    price={item.price}
                                    duration={item.duration}
                                    features={item.features}
                                />
                            </React.Fragment>
                        )
                    })}
                </SimpleGrid>
                : exampleSubscriptions.length > 0 ?
                    <NotFound search={search} criteria={criteria} />
                    :
                    <NoSubscriptions />}
        </>
    )
}

export default Subscriptions
/*
        <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>

        */