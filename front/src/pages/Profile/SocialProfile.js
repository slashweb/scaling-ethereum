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
    Select,

} from '@chakra-ui/react';
import {useState} from 'react';
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
    avatarURL: 'https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png',
    balance: '5 ETH',
    statistics: {
        likes: 54,
        sales: 3,
        inbox: 6,
    }
}

export default function SocialProfile(props) {
    const {followersNumber, followingNumber} = props
    const {isOpen, onOpen, onClose} = useDisclosure()
    //const dispatch = useDispatch()

    const handle = useSelector((state) => state.user.handle)
    const type = useSelector((state) => state.user.type)
    const [handleForm, setHandleForm] = useState('')
    const [typeForm, setTypeForm] = useState('')
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
                        src={ wallpaperProfile }
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
                                {userExample.handle}
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
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Editar perfil</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text textAlign={'left'} color={'gray.400'}>Handle (Optional)</Text>
                        <Input fontSize={'xl'} placeholder={'Handle id'} value={handleForm}
                               onChange={(e) => setHandleForm(e.target.value)}/>
                        <Text textAlign={'left'} color={'gray.400'}>Choose a type of contributor</Text>
                        <Select value={typeForm} placeholder='Choose one...'
                                onChange={(e) => setTypeForm(e.target.value)}>
                            <option value='creator'>Creator</option>
                            <option value='user'>User</option>
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme='blue'
                                onClick={() => {
                                    //dispatch(setHandle(handleForm))
                                    // dispatch(setType(typeForm))
                                    console.log('Handle: ', handle, 'Type: ', type)
                                    onClose()
                                }


                                }>Guardar cambios</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
