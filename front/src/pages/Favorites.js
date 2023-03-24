import { InfoIcon } from '@chakra-ui/icons'
import { Center, Heading, SimpleGrid, VStack } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../constants'
import data from '../test/exampleTest'
import { getFileWithCid } from '../utils'
import { SimpleProduct } from './MarketPlace'
import { ProfileCard } from './Subscriptions/ProfileCard'
import Swal from 'sweetalert2';
import useCourses from '../hooks/useCourses'

function NoFavorites() {
  return (
    <Center textAlign="center" py={10} px={6} mx={20} m={12} bg={'white'} rounded={'lg'}>
      <VStack>
        <InfoIcon boxSize={'50px'} color={'blue.500'} />
        <Heading as="h2" size="lg" mt={6} mb={2}>
          You haven't liked any content yet.
        </Heading>
      </VStack>
    </Center>
  )
}

function NoFollowing() {
  return (
    <Center textAlign="center" py={10} px={10} mx={20} m={12} bg={'white'} rounded={'lg'}>
      <VStack>
        <InfoIcon boxSize={'50px'} color={'blue.500'} />
        <Heading as="h2" size="lg" mt={6} mb={2}>
          You aren't following users. Follow your favorite creators to get notifications about their activities.
        </Heading>
      </VStack>
    </Center>
  )
}

function Favorites() {
  const favoriteContent = data.filter((item) => item.liked === true)
  const [results, setResults] = useState(favoriteContent)
  const [followingData, setFollowingData] = useState(0)
  const [likedContent, setLikedContent] = useState([])
  const wallet = useSelector((state) => state.user.wallet)
  const coursesContract = useCourses()

  const getFollowing = async () => {
    try {
      const res = await db.collection("Favorites").where("user", "==", wallet).get()
      setFollowingData(res.data)
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: `Error code: ${e.code}`,
        text: `${e.message}`,
      })
    }
  }
  const getLikedContentByUser = async () => {
    try {
      const res = await db.collection("ContentLikes").where("user", "==", wallet).get()
      await setLikedContent(res.data)
      getFavoriteCourses(res.data.map(item => item.data.liked_post_id))
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: `Error code: ${e.code}`,
        text: `${e.message}`,
      })
    }
  }
  const getFavoriteCourses = useCallback(async (ids) => {
    if (coursesContract) {
      try {
        let promises = []
        promises = ids.map((id) => {
          return coursesContract?.methods?.getCourseDetail(id.toString()).call()
        })
        const res = await Promise.all(promises)
        setResults(res)

      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: `Error code: ${e.code}`,
          text: `${e.message}`,
        })
      }
    }
  }, [coursesContract])

  useEffect(() => {
    getLikedContentByUser()
    getFollowing()
  }, [])

  return (
    <>
      <Heading mt={10}>My favorite users</Heading>

      {followingData.length > 0 ?
        <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12}>
          {followingData.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ProfileCard
                  handle={''}
                  wallet={item.data.following_user}
                  userType={''}
                  description={''}
                  avatarURL={''}
                  plan={'No subscription'}
                />
              </React.Fragment>
            )
          })}
        </SimpleGrid>
        :
        <NoFollowing />}
      <Heading mt={10}>My favorite content</Heading>
      {likedContent?.length > 0 ?
        <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12}>
          {results?.map((item, index) => {
            // getCourseDetail(item.data.liked_post_id)
            return (
              <React.Fragment key={index}>
                <SimpleProduct
                  id={item.id}
                  key={index}
                  name={item.title}
                  author={item.author}
                  bidders={''}
                  image={getFileWithCid(item.mainImage)}
                  price={''}
                  download='#'
                />
              </React.Fragment>
            )
          })}
        </SimpleGrid>
        :
        <NoFavorites />}
    </>
  )
}

export default Favorites