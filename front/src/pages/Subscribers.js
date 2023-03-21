import { Avatar, Box, Button, Center, Flex, Grid, Heading, HStack, Image, Input, InputGroup, InputRightElement, Select, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { SimpleProduct } from './MarketPlace'
const exampleSubscribers = [{
    handle: 'Marie Johnson',
    wallet: 'b10..zx9',
    userType: 'user',
    description: '',
    avatarURL: 'https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png',
    plan: 'basic'
},
{
    handle: 'Altea Williams',
    wallet: '0x9..192',
    userType: 'user',
    description: 'Frontend Developer',
    avatarURL: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
    plan: 'pro'
},
{
    handle: 'Daniel Gibson',
    wallet: '0x1..2s0',
    userType: 'user',
    description: 'High School Student',
    avatarURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    plan: 'pro'
},
{
    handle: 'James Hudson',
    wallet: '0x4..114',
    userType: 'creator',
    description: 'Photographer, Painter',
    avatarURL: 'https://api.dicebear.com/5.x/lorelei/svg',
    plan: 'basic'
},
{
    handle: 'Patrice Ville',
    wallet: 'b45..b32',
    userType: 'user',
    description: 'Graphic Designer',
    avatarURL: 'https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png',
    plan: 'basic'
}

]
function SocialProfile(props) {
    const { key, handle, wallet, userType, description, avatarURL, plan } = props
    return (
        <Center py={6} key={key}>
            <Box
                maxW={'270px'}
                w={'full'}
                bg={plan === 'basic' ? 'blue.50' : plan === 'pro' ? 'yellow.50' : 'white'}
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
                        bg={useColorModeValue('#151f21', 'gray.900')}
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

function Subscribers() {
    const [search, setSearch] = useState('')
    const [criteria, setCriteria] = useState('')
    const [results, setResults] = useState(exampleSubscribers)
    console.log(exampleSubscribers)
    const searchBar = (e) => {
        setSearch(e.target.value)
    }
    //funcion para filtrar
    function SearchFunction() {

        if (!search && !criteria) {
            setResults(exampleSubscribers)
        } else {
            setResults(exampleSubscribers.filter((dato) =>
                dato[criteria] === search))
        }
    }
    return (
        <>
            <HStack bg={'white'} p={5}>
                <Select w={'1/4'} value={criteria} placeholder='Choose one...' onChange={(e) => setCriteria(e.target.value)}>
                    <option value='handle'>Handle</option>
                    <option value='plan'>Plan</option>
                </Select>
                <InputGroup>
                    <Input type="text" disabled={!criteria}
                        value={search} onChange={searchBar}
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
            <Heading m={10}>My Subscribers</Heading>
            <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12}>
                {results ? results.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <SocialProfile

                                handle={item.handle}
                                wallet={item.wallet}
                                userType={item.userType}
                                description={item.description}
                                avatarURL={item.avatarURL}
                                plan={item.plan}
                            />
                        </React.Fragment>
                    )
                }) : <Text>No content available</Text>}
            </SimpleGrid>
        </>
    )
}

export default Subscribers