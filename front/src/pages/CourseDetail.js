import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import useCourses from '../hooks/useCourses';
import {
  Heading,
  SimpleGrid,
  Text,
  Stack,
  VStack,
  Image,
  CardFooter,
  Button,
  CardBody,
  Card,
  Center,
} from '@chakra-ui/react';
import { CheckIcon, InfoIcon } from '@chakra-ui/icons';
import { SimpleProduct } from './MarketPlace';
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

function ShowContentCards(data) {
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
            image={''}
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
  const [filteredContent, setFilteredContent] = useState([])
  const [storageComments, setStorageComments] = useState([])

  const getCourseDetail = useCallback(async () => {
    if (coursesContract) {
      try {
      const res = await coursesContract?.methods?.getCourseDetail(id).call()
      setCourseDetail(res)
      } catch(e){
        alert(e)
      }
    }
  }, [coursesContract])

  const getItemsByAuthor = useCallback(async () => {
    // setIsLoading(true)
    if (coursesContract) {
      try {
      const res = await coursesContract?.methods?.getMyCourses().call({ from: courseDetail.author })
      //setIsLoading(false)
      const filteringCurrent = res.filter(item => item.id !== id)
      setFilteredContent(filteringCurrent)
      console.log('Informacion filtrada en getItemsByAuthor: ',filteringCurrent)
    }catch(e){
      alert(e)
    }
  }
    // setIsLoading(false)
  }, [coursesContract, active])

  useEffect(() => {
    getCourseDetail()
    showComments()
    getItemsByAuthor()
  }, [active])
  
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
    try{
    await db.collection("Comments").create([idComment, parseInt(id), wallet, comment])
    showComments()
    }catch(e){
      alert(e)
    }
  }
  const showComments = async () => {
    try{
    const res = await db.collection("Comments").where("id_post", "==", parseInt(id)).get()
    //const filteringCurrent = res.data.filter(item => item.data.id_post ==parseInt(id))
    //console.log('Filtering',filteringCurrent)
    return setStorageComments(res.data.reverse())
    }catch(e){
      alert(e)
    }
  }
  return (
    <>
      {courseDetail ?
        <>
          <Image source={''}></Image>
          <ContentCard
            courseDetail = {courseDetail}
            onCreateComment = {comment => { createNewComment(comment) }}
            storageComments = {storageComments}
          />
          <Heading>More content about {courseDetail.author}</Heading>
          {/*filteredContent?.length !== 0 ? <ShowContentCards data={filteredContent} /> : <NoMoreContentbyAuthor />*/}
          <Heading>Related content</Heading>
        </>
        : <RenderNotFound />}
    </>
  )
}
export default CourseDetail
// return (
//   <>
//     {getItem(id) ?
//       <>
//        <Image source={getItem(id).images[0]}></Image>
//         <ContentCard props={getItem(id)} />
//         <Heading>More content about {getItem(id).author}</Heading>
//         {getItemsByAuthor(getItem(id).author, id) != 0 ? showContentCards(getItemsByAuthor(getItem(id).author, id)) : <NoMoreContentbyAuthor />}
//         <Heading>Related content</Heading>
//         {data ? showContentCards(getRandomItemsExceptCurrent(id))
//           :
//           <Heading as="h2" size="lg" mt={6} mb={2}>
//             There are no content available
//           </Heading>}
//       </>
//       : <RenderNotFound />}
//   </>
// )