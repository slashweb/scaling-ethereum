import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import { InfoIcon } from '@chakra-ui/icons';
import { SimpleProduct } from './MarketPlace';
import { useSelector } from 'react-redux';
import ContentCard from './CourseDetails.js/ContentCard';
import { getFileWithCid, guid } from '../utils';
import { db } from '../constants';
import Swal from 'sweetalert2';

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
      {data.data?.map((item, index) => {
        return (
          <SimpleProduct
            id={item.id}
            key={index}
            name={item.title}
            author={item.author}
            bidders={''}
            image={getFileWithCid(item.mainImage)}
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
  const coursesContract = useCourses()
  const [courseDetail, setCourseDetail] = useState([])
  const wallet = useSelector((state) => state.user.wallet)
  const [filteredContent, setFilteredContent] = useState([])
  const [storageComments, setStorageComments] = useState([])
  const [likeNumber, setLikeNumber] = useState(0)
  const [isAlreadyLiked, setIsAlreadyLiked] = useState(false)
  const [isLoadingCourseDetails, setIsLoadingCourseDetails] = useState(false)
  const [isLoadingVL, setIsLoadingVL] = useState(false)
  const [isLoadingGIBA, setIsLoadingGIBA] = useState(false)

  const getCourseDetail = useCallback(async () => {
    if (coursesContract) {
      try {
        setIsLoadingCourseDetails(true)
        let res = await
          coursesContract?.methods?.getCourseDetail(id).call()
        setCourseDetail(res)
        getItemsByAuthor(res.author)
        setIsLoadingCourseDetails(false)
      } catch (e) {
        setIsLoadingCourseDetails(false)
        Swal.fire({
          icon: 'error',
          title: `Error code: ${e.code}`,
          text: `${e.message}`,
        })
      }

    }
  }, [coursesContract])

  const getItemsByAuthor = useCallback(async (author) => {

    if (coursesContract) {
      try {
        setIsLoadingGIBA(true)
        let promises = []
        const res = await coursesContract?.methods?.getMyCourses().call({ from: author })
        promises = res.filter(item => { return item.id !== id.toString() })
        const filtered = await Promise.all(promises)
        setFilteredContent(filtered)
        setIsLoadingGIBA(false)
      } catch (e) {
        setIsLoadingGIBA(false)
        Swal.fire({
          icon: 'error',
          title: `Error code: ${e.code}`,
          text: `${e.message}`,
        })
      }
    }
  }, [coursesContract])

  const createNewComment = async comment => {
    const idComment = guid()
    try {
      await db.collection("Comments").create([idComment, parseInt(id), wallet, comment])
      showComments()
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: `Error code: ${e.code}`,
        text: `${e.message}`,
      })
    }
    Swal.fire({
      icon: 'success',
      title: 'Comment submitted',
    })
  }
  const setLikedPost = async () => {
    const idLike = guid()
    try {
      await db.collection("ContentLikes").create([idLike, wallet, parseInt(id)])
      verifyLiked()
      getLikes()
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: `Error code: ${e.code}`,
        text: `${e.message}`,
      })
    }
    Swal.fire({
      icon: 'success',
      title: 'Content saved to favorites!',
    })
  }

  const getLikes = async () => {
    try {
      const res = await db.collection("ContentLikes").where("liked_post_id", "==", parseInt(id)).get()
      return setLikeNumber(res.data.length)
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: `Error code: ${e.code}`,
        text: `${e.message}`,
      })
    }
  }

  const verifyLiked = async () => {
    setIsLoadingVL(true)
    const likes_by_user = await db.collection("ContentLikes")
      .where("user", "==", wallet)
      .get()
    const isLiked = likes_by_user.data.filter((entity) => entity.data.liked_post_id === parseInt(id))
    if (isLiked.length === 0) {
      setIsAlreadyLiked(false)
      setIsLoadingVL(false)
    } else {
      setIsAlreadyLiked(true)
      setIsLoadingVL(false)
    }
  }

  const showComments = async () => {
    try {
      const res = await db.collection("Comments").where("id_post", "==", parseInt(id)).get()
      return setStorageComments(res.data.reverse())
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: `Error code: ${e.code}`,
        text: `${e.message}`,
      })
    }
  }

  useEffect(() => {
    verifyLiked()
    getCourseDetail()
    showComments()
    getLikes()
  }, [])

  return (
    <>
      {isLoadingCourseDetails ? <Text>Loading course details...</Text> : courseDetail ?
        <>
          <ContentCard
            onSetLiked={() => setLikedPost()}
            likes={likeNumber}
            isAlreadyLiked={isAlreadyLiked}
            courseDetail={courseDetail}
            onCreateComment={comment => { createNewComment(comment) }}
            storageComments={storageComments}
            isLoadingVL={isLoadingVL}
          />
          <Heading>More content about {
            isLoadingGIBA ? <Text>Loading more content about this author ...</Text>
              : courseDetail.handle ?
                courseDetail.handle :
                courseDetail.author}
          </Heading>
          {filteredContent?.length !== 0 ?
            <ShowContentCards data={filteredContent} />
            : <NoMoreContentbyAuthor />}
        </>
        : <RenderNotFound />}
    </>
  )
}
export default CourseDetail