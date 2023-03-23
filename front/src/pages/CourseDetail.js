import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import _uniqueId from 'lodash/uniqueId';
import { AiOutlineSend } from 'react-icons/ai'
import { useWeb3React } from '@web3-react/core'
import useCourses from '../hooks/useCourses';
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
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiChat, BiLike, BiShare } from 'react-icons/bi';
import { SimpleProduct } from './MarketPlace';
import { Polybase } from "@polybase/client";
import { useSelector } from 'react-redux';
import ContentCard from './CourseDetails.js/ContentCard';
import { guid } from '../utils';
import { db } from '../constants';






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
  const { active, account, activate } = useWeb3React()
  const coursesContract = useCourses()
  const [courseDetail, setCourseDetail] = useState([])
  const data = []
  const wallet = useSelector((state) => state.user.wallet)

  const getCourseDetail = useCallback(async () => {
    if (coursesContract) {
      const res = await coursesContract?.methods?.getCourseDetail(id).call()
      setCourseDetail(res)
      console.log(res)
    }
  }, [coursesContract])
  useEffect(() => {
    getCourseDetail()
  }, [active])

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
  const createNewComment = async comment => {

    const idComment = guid()
    const res = await db.collection("Comments").create([idComment, parseInt(id), wallet, comment])
    console.log(res)
  }


  return (
    <>
      {courseDetail ?
        <>
          <Image source={''}></Image>
          <ContentCard
            courseDetail={courseDetail}
            onCreateComment={comment => { createNewComment(comment) }}
          />

        </>
        : <RenderNotFound />}
    </>
  )
}

export default CourseDetail