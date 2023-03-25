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
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import wallpaperProfile from '../../assets/wallpaperProfile.jpeg'
import useCourses from "../../hooks/useCourses";
import { getFileWithCid } from '../../utils';

export default function SocialProfile({ onNewFavorite,
    followers, following, isAlreadyFollowed, user, isLoadingVF, isLoadingFollowing }) {
    const [handleForm, setHandleForm] = useState()
    const [profilePic, setProfilePic] = useState()
    const [profile, setProfile] = useState()
    const [addr, setAddr] = useState()

    const coursesContract = useCourses()

    const getProfile = async () => {
        try {
            let res = await coursesContract?.methods?.getMyProfile().call({ from: user })
            if (res.length !== 0) {
                if (!profile) {
                    setProfile(res)
                    setProfilePic(res.profilePic)
                    setHandleForm(res.handle)
                    setAddr(res.addr)
                }
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: `Error code: ${e.code}`,
                text: `${e.message}`,
            })
        }
    }

    useEffect(() => {
        getProfile()
    }, [])
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
                        src={wallpaperProfile}
                        objectFit={'cover'}
                    />
                    <Flex justify={'center'} mt={-12}>
                        <Avatar
                            size={'xl'}
                            src={getFileWithCid(profilePic)}
                            alt={'Author'}
                            css={{
                                border: '2px solid white',
                            }}
                        />
                    </Flex>
                    <Box p={6}>
                        <Stack spacing={0} align={'center'} mb={5}>
                            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                {handleForm}
                            </Heading>
                            <Text p={2}>{addr}</Text>
                        </Stack>
                        <Stack direction={'row'} justify={'center'} spacing={6}>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600} isLoading={isLoadingFollowing}>{following}</Text>
                                <Text fontSize={'sm'} color={'gray.500'} >
                                    Following
                                </Text>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600} isLoading={isLoadingFollowing}>{followers}</Text>
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
                            isLoading={isLoadingVF}
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
