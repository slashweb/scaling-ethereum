import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Button,
    Avatar,
    Center,
    useColorModeValue,
    Image,

} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import wallpaperProfile from '../../assets/wallpaperProfile.jpeg'

const userExample = {
    handle: 'John Doe',
    wallet: '0x3..bb3',
    subscribers: 8,
    following: 3,
    numberOfItems: 2,
    userType: 'creator',
    description: 'NFT creator',
    avatarURL: 'https://bafybeiaksuur3oj4bhaxdgzwhrbnjg6gl4hop2srtocgbh3edl3pvjpiwe.ipfs.w3s.link',
    balance: '5 ETH',
    statistics: {
        likes: 54,
        sales: 3,
        inbox: 6,
    }
}

export default function SocialProfile({onNewFavorite, followers, following, isAlreadyFollowed}) {
    const handle = useSelector((state) => state.user.handle)
    return (
        <>
            <Center py={6}>
                <Box
                    maxW={'80%'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    pb={10}
                    overflow={'hidden'}>
                    <Image
                        h={'180px'}
                        w={'full'}
                        src={
                            'https://bafybeiaksuur3oj4bhaxdgzwhrbnjg6gl4hop2srtocgbh3edl3pvjpiwe.ipfs.w3s.link/'
                        }
                        objectFit={'cover'}
                    />
                    <Flex justify={'center'} mt={-12}>
                        <Avatar
                            size={'xl'}
                            src={'https://bafybeiaksuur3oj4bhaxdgzwhrbnjg6gl4hop2srtocgbh3edl3pvjpiwe.ipfs.w3s.link/'}
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
                            <Text bg={'blue'} color={'white'} rounded={'md'} p={2}>{userExample.userType}</Text>
                            <Text color={'gray.500'}>{userExample.description}</Text>
                        </Stack>
                        <Stack direction={'row'} justify={'center'} spacing={6}>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>{userExample.subscribers}</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Subscribers
                                </Text>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>{following}</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Following
                                </Text>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>{followers}</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Followers
                                </Text>
                            </Stack>
                        </Stack>
                        <Button
                            w={'2/3'}
                            mt={8}
                            bg={useColorModeValue('#151f21', 'gray.900')}
                            color={'white'}
                            rounded={'md'}
                            isDisabled={isAlreadyFollowed}
                            onClick={onNewFavorite}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }}>
                            Follow
                        </Button>
                    </Box>
                </Box>

            </Center>
        </>
    );
}
