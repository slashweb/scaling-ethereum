import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { AiOutlineSend } from 'react-icons/ai'

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Image,
  CardFooter,
  Button,
  CardBody,
  IconButton,
  CardHeader,
  Card,
  Flex,
  Avatar,
  Center,
  Input,
} from '@chakra-ui/react';
import { CheckIcon, InfoIcon } from '@chakra-ui/icons';
import data from '../test/exampleTest';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { SimpleProduct } from './MarketPlace';

// Replace test data with your own
const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i,
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
  };
});

function GridListWithHeading() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>This is the headline</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

function ContentCard({ props }) {
  const { author, title, images, description } = props
  return (
    <Card maxW='5/6' p={14} m={20}>
      <CardHeader alignItems={'center'}>
        <Flex spacing='4' >
          <Center flex='1' gap='12' >
            <VStack alignItems={'center'}>
              <Avatar name={author} src='https://bit.ly/sage-adebayo' size={'xl'} />
              <Box alignSelf={'center'}>
                <Heading size='lg' autoCapitalize='true'>{author}</Heading>
                <Text>Creator</Text>
              </Box>
            </VStack>
          </Center>
          <IconButton
            variant='ghost'
            colorScheme='gray'
            size={'lg'}
            aria-label='See menu'
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Heading textAlign={'left'}>
          {title}
        </Heading>
        <Text textAlign={'left'}>
          {description}
        </Text>
      </CardBody>
      <Image
        objectFit='cover'
        src={images[0]}
        alt={title}
        rounded={'lg'}
      />
      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
          Comment
        </Button>
        <Button
          flex='1'
          color='white'
          bg={'purple'}
          fontSize='sm'
          fontWeight='500'
          borderRadius='70px'>
          Place Bid
        </Button>
      </CardFooter>
      <HStack>
        <Input placeholder='Write a comment' size='lg' borderColor={'gray.300'} />
        <IconButton>
          <AiOutlineSend size={'48'} />
        </IconButton>
      </HStack>
    </Card>
  )
}

function RenderNotFound() {
  return (
    <Center p={20}>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        variant='outline'
        rounded={'lg'}
      >
        <Stack align={'center'}>
          <CardBody>
            <Heading size='md'>Oops... Item not found</Heading>
            <Text py='2'>
              This item that you are searching for could not be available now, <br />
              please try again later or explore another content
            </Text>
            <Center>
              <Image
                objectFit='contain'
                mt={5}
                rounded={'md'}
                maxW={{ base: '100%', sm: '200px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Caffe Latte'
              />
            </Center>
          </CardBody>
          <CardFooter>
            <Link to={'/'}>
              <Button variant='solid' colorScheme='blue'>
                Go Home
              </Button>
            </Link>
          </CardFooter>
        </Stack>
      </Card>
    </Center>
  )
}
function NoMoreContentbyAuthor() {
  return (

    <Center textAlign="center" py={10} px={6} mx={20} m={12} bg={'white'} rounded={'lg'}>
      <VStack>
        <InfoIcon boxSize={'50px'} color={'blue.500'} />
        <Heading as="h2" size="lg" mt={6} mb={2}>
          There are no more content about this author
        </Heading>
      </VStack>
    </Center>
  )
}


function showContentCards(data) {
  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12} >
      {data.map((item, index) => {
        return (
          <SimpleProduct
            id={item.id}
            key={index}
            name={item.title}
            author={item.author}
            bidders={item.bidders}
            image={item.images[0]}
            price={item.price}
            download='#'
          />
        )
      })}
    </SimpleGrid>
  )
}

function CourseDetail() {
  const { id } = useParams()
  function getItem(id) {
    const res = data.filter(item => item.id == id)
    return res[0]
  }
  function getItemsByAuthor(author, currentId) {
    const authorContent = data.filter(item => item.author == author)
    const filteringCurrent = authorContent.filter(item => item.id != currentId)
    return filteringCurrent
  }
  function getRandomItemsExceptCurrent(currentId) {
    const items = data.filter(item => item => item.id != currentId)
    const randomItems = []
    const TAM = items.length
    while (randomItems.length < 4) {
      const randomIndex = getRandom()
      if (!checkNotRepeat(items[randomIndex], randomItems))
        randomItems.push(items[randomIndex])
    }
    function getRandom() {
      return Math.floor(Math.random() * TAM)
    }
    function checkNotRepeat(current, validNumbers) {
      return validNumbers.includes(current)
    }
    return randomItems
  }

  return (
    <>
      {getItem(id) ?
        <>
          <Image source={getItem(id).images[0]}></Image>
          <ContentCard props={getItem(id)} />
          <Heading>More content about {getItem(id).author}</Heading>
          {getItemsByAuthor(getItem(id).author, id) != 0 ? showContentCards(getItemsByAuthor(getItem(id).author, id)) : <NoMoreContentbyAuthor />}
          <Heading>Related content</Heading>
          {data ? showContentCards(getRandomItemsExceptCurrent(id))
            :
            <Heading as="h2" size="lg" mt={6} mb={2}>
              There are no content available
            </Heading>}
        </>
        : <RenderNotFound />}
    </>
  )
}

export default CourseDetail