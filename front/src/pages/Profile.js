import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  Center,
  useColorModeValue,
  Image,
  StatLabel,
  StatNumber,
  Stat,
  VStack,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  HStack,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setHandle, setType } from '../actions/users';
import wallpaperProfile from '../assets/wallpaperProfile.jpeg'
import data from '../test/exampleTest';
import { SimpleProduct } from './MarketPlace';

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
function SocialProfileWithImage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
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
            src={
              wallpaperProfile
            }
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={userExample.avatarURL ? userExample.avatarURL : 'https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png'}
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
                <Text fontWeight={600}>{userExample.following}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Following
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
          <ModalHeader>Editar perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign={'left'} color={'gray.400'}>Handle (Optional)</Text>
            <Input fontSize={'xl'} placeholder={'Handle id'} value={handleForm}
              onChange={(e) => setHandleForm(e.target.value)} />
            <Text textAlign={'left'} color={'gray.400'}>Choose a type of contributor</Text>
            <Select value={typeForm} placeholder='Choose one...' onChange={(e) => setTypeForm(e.target.value)}>
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
                dispatch(setHandle(handleForm))
                dispatch(setType(typeForm))
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


function StatsCard({ title, stat, icon }) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

function UserStatistics() {
  return (
    <Box mx={'auto'} pt={5} px={20} >
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'likes'}
          stat={userExample.statistics.likes}
          icon={<BsPerson size={'3em'} />}
        />
        <StatsCard
          title={'sales'}
          stat={userExample.statistics.sales}
          icon={<FiServer size={'3em'} />}
        />
        <StatsCard
          title={'inbox'}
          stat={userExample.statistics.inbox}
          icon={<FiServer size={'3em'} />}
        />
      </SimpleGrid>
    </Box>
  )
}
function NoContentbyAuthor() {
  return (

    <Center textAlign="center" py={10} px={6} mx={20} m={12} bg={'white'} rounded={'lg'}>
      <VStack>
        <InfoIcon boxSize={'50px'} color={'blue.500'} />
        <Heading as="h2" size="lg" mt={6} mb={2}>
          Your profile is empty. Share something to the world!
        </Heading>
      </VStack>
    </Center>
  )
}

function MyContent(){
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [images, setImages]= useState([])
  const [isLoading, setIsLoading] = useState(false)
  const newData={
    title:'',
    price:'',
    author:'',
    description:'',
    images:[]
  }
  return(
    <>
    <Heading>My Content</Heading>
    <Button onClick={onOpen}>Add new content</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new content</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            p={8}>
                            <Stack spacing={4}>
                                <HStack>
                                    <FormControl id="title" isRequired>
                                        <FormLabel>Title</FormLabel>
                                        <Input type="text" onChange={(e) => newData.title=(e.target.value)} />
                                    </FormControl>
                                    <FormControl id="price" isRequired>
                                        <FormLabel>Price</FormLabel>
                                        <Input type="number" onChange={(e) => newData.price=(e.target.value)} />
                                    </FormControl>
                                </HStack>
                                <FormControl id="description" isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea onChange={(e) => newData.description=(e.target.value)} />
                                </FormControl>

                                <FormControl id="pictures" isRequired>
                                    <HStack>
                                        <FormLabel>URL Images</FormLabel>
                                        <Button
                                            size={'xs'}
                                            colorScheme={'teal'}
                                            onClick={() => {
                                                const localTags = [...images]
                                                localTags.push('')
                                                setImages(localTags)
                                            }}
                                        >+</Button>

                                    </HStack>
                                    {
                                        images.map((tag, index) => {
                                            return <HStack mt={2} key={index}>
                                                <Input value={tag} onChange={(e) => {
                                                    const localTags = [...images]
                                                    localTags[index] = e.target.value
                                                    setImages(localTags)
                                                }} />
                                                <Button size={'sm'} colorScheme={'red'} onClick={() => {
                                                    const localTags = [...images]
                                                    localTags.splice(index, 1)
                                                    setImages(localTags)
                                                }}>
                                                    Delete
                                                </Button>
                                            </HStack>
                                        })
                                    }
                                </FormControl>
                            </Stack>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' isLoading={isLoading} onClick={()=>createNewContent(newData, images)}>Create content</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    </>
  )
}
function createNewContent(newData, images){
  newData.images=images
  console.log(JSON.stringify(newData))

}

export default function Profile() {
  function getItemsByAuthor(author) {
    const authorContent = data.filter(item => item.author == author)
    return authorContent
  }
  function showContentCards(data) {
    return (
      <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12} >
        {data.map((item, index) => {
          return (
            <SimpleProduct
              key={index}
              name={item.title}
              author={item.author}
              bidders={item.bidders}
              image={item.images[0]}
              price={item.price}
              download='#'
              id={item.id}
            />
          )
        })}
      </SimpleGrid>
    )
  }
  return (
    <>
      <SocialProfileWithImage>
        <UserStatistics />
      </SocialProfileWithImage>
<MyContent />
      {getItemsByAuthor(userExample.handle) ?
        showContentCards(getItemsByAuthor(userExample.handle))
        :
        <NoContentbyAuthor />}
    </>
  );
}

