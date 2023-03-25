import { Avatar, Box, Button, Center, Flex, Heading, Stack, Text, } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { getFileWithCid } from '../../utils';

export function ProfileCard(props) {
    const { key, handle, wallet, userType, description, avatarURL, plan, isLoading } = props
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
                        src={getFileWithCid(avatarURL)}
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
                        <Text color={'gray.500'}>{wallet.substr(0, 3) + '...' + wallet.substr(wallet.length - 3, 3)}</Text>
                    </Stack>

                    <Stack spacing={0} align={'center'}>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            {userType}
                        </Text>
                    </Stack>
                    <Stack spacing={0} align={'center'}>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            {plan}
                        </Text>
                    </Stack>
                    <Link to={`/profile/${wallet}`}>
                        <Button
                            w={'full'}
                            mt={8}
                            bg={'#151f21'}
                            color={'white'}
                            rounded={'md'}
                            isLoading={isLoading}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }}>
                            Visit Profile
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Center>
    );
}