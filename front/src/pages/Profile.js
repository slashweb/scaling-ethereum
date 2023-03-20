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
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
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

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

function SocialProfileWithImage(props) {
  return (
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
          h={'120px'}
          w={'full'}
          src={
            wallpaperProfile
          }
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={userExample.avatarURL}
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
      <Heading>My Content</Heading>
      <Button>Add new content</Button>
      {getItemsByAuthor(userExample.handle) ?
        showContentCards(getItemsByAuthor(userExample.handle))
        :
        <NoContentbyAuthor />}
    </>
  );
}

