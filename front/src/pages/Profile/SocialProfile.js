import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Input,
    Button,
    Avatar,
    Center,
    useColorModeValue,
    Image,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    HStack
} from '@chakra-ui/react';
import FilePicker from "chakra-ui-file-picker";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import wallpaperProfile from '../../assets/wallpaperProfile.jpeg'
import useCourses from "../../hooks/useCourses";
import Swal from "sweetalert2";
import { saveImageToFileCoin } from "../../utils";
import { getFileWithCid } from "../../utils";

export default function SocialProfile(props) {
    const wallet = useSelector((state) => state.user.wallet)
    const { followersNumber, followingNumber } = props
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [handleForm, setHandleForm] = useState()
    const [profile, setProfile] = useState()
    const [isLoading, setIsLoading] = useState()
    const [addr, setAddr] = useState()


    const coursesContract = useCourses()

    const getMyProfile = async () => {
        try {
            let res = await coursesContract?.methods?.getMyProfile().call({ from: wallet })
            if (res.length !== 0) {
                if (!profile) {
                    setProfile(res)
                    setHandleForm(res.handle)
                    setAddr(res.addr)
                }
            }
        }
        catch (e) {
            Swal.fire({
                icon: 'error',
                title: `Error code: ${e.code} en getMyProfile`,
                text: `Profile not valid or not found`,
            })
        }
    }
    const setHandleProfile = async () => {
        setIsLoading(true)
        try {
            await coursesContract?.methods?.setProfileHandle(handleForm).send({ from: wallet })
            await getMyProfile()
            onClose()
            Swal.fire('Handle updated successfully')
            setIsLoading(false)
        } catch (err) {
            Swal.fire('Handle cannot updated')
            setIsLoading(false)
        }
    }

    const setProfileImage = async (cid) => {
        setIsLoading(true)
        try {
            await coursesContract?.methods?.setProfileImage(cid).send({ from: wallet })
            await getMyProfile()
            onClose()
            await Swal.fire('Profile picture updated successfully')
        } catch (err) {
            await Swal.fire('Profile picture cannot updated')
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getMyProfile()
    }, [profile])
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
                        {
                            profile ?
                                <Avatar
                                    size={'xl'}
                                    src={getFileWithCid(profile.profilePic)}
                                    alt={'Author'}
                                    css={{
                                        border: '2px solid white',
                                    }}
                                />
                                : null
                        }
                    </Flex>
                    <Box p={6}>
                        <Stack spacing={0} align={'center'} mb={5}>
                            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                {profile?.handle}
                            </Heading>
                            <Text p={2}>{addr}</Text>
                        </Stack>
                        <Stack direction={'row'} justify={'center'} spacing={6}>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>{followingNumber}</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Following
                                </Text>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>{followersNumber}</Text>
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
                            onClick={onOpen}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }}>
                            Edit profile
                        </Button>
                    </Box>
                    {props.children}
                </Box>
            </Center>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack>
                            <Text textAlign={'left'} color={'gray.400'}>Handle</Text>
                            <Input fontSize={'xl'}
                                placeholder={'Handle id'}
                                value={handleForm}
                                onChange={(e) => setHandleForm(e.target.value)
                                } />
                        </HStack>
                        <HStack mt={8}>
                            {profile?.profilePic}
                            <FilePicker
                                onFileChange={async (fileList) => {
                                    setIsLoading(true)
                                    try {
                                        const cid = await saveImageToFileCoin(fileList)
                                        setProfileImage(cid)
                                    } catch (err) {
                                        Swal.fire('There was an error uploading the image')
                                        setIsLoading(false)
                                    }
                                }}
                                placeholder={"Profile image"}
                                clearButtonLabel='browse'
                                multipleFiles={false}
                                hideClearButton={false}
                            />
                        </HStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='blue'
                            onClick={() => setHandleProfile(handleForm)}
                            isLoading={isLoading}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
