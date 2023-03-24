import { InfoIcon } from '@chakra-ui/icons'
import { Button, Center, Heading, HStack, Input, InputGroup, InputRightElement, Select, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../constants'
import data from '../test/exampleTest'
import { guid } from '../utils'
import { SimpleProduct } from './MarketPlace'
import { useWeb3React } from '@web3-react/core';
import { ProfileCard } from './Subscriptions/ProfileCard'
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
  const { active } = useWeb3React()
  const [followingData, setFollowingData] = useState(0)
  const wallet = useSelector((state) => state.user.wallet)

  const getFollowing = async () => {
    try {
      const res = await db.collection("Favorites").where("user", "==", wallet).get()
      setFollowingData(res.data)
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    getFollowing()
  }, [active])

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
      {results.length > 0 ?
        <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12}>
          {results.map((item, index) => {
            return (
              <React.Fragment key={index}>
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