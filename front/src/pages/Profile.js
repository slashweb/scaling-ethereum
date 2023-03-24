import { InfoIcon } from '@chakra-ui/icons';
import {
  Heading,
  Center,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import useCourses from '../hooks/useCourses';
import MyContent from "./Profile/MyContent";
import SocialProfile from './Profile/SocialProfile';
import UserStatistics from './Profile/UserStatistics';
import ShowContentCards from './Profile/ShowContentCards';
import { db } from '../constants';
import Swal from 'sweetalert2';

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
  const { active } = useWeb3React()
  const coursesContract = useCourses()
  const [myCourses, setMyCourses] = useState([])
  const wallet = useSelector((state) => state.user.wallet)
  const [followersNumber, setFollowersNumber] = useState(0)
  const [followingNumber, setFollowingNumber] = useState(0)
  const [followersData, setFollowersData] = useState(0)
  const [followingData, setFollowingData] = useState(0)

  const createNewCourse = async newCourse => {
    try {
      const res = await coursesContract?.methods?.createNewContent(newCourse.title, newCourse.description, newCourse.price, 'url')?.send({ from: wallet })
      console.log('res', res)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `Error code: ${err.code}`,
        text: `${err.message}`,
      })
    }
  }

  const getFollowersCount = async () => {
    const res = await db.collection("Favorites").where("following_user", "==", wallet).get()
    setFollowersNumber(res.data.length)
    setFollowersData(res.data)
  }
  const getFollowingCount = async () => {
    const res = await db.collection("Favorites").where("user", "==", wallet).get()
    setFollowingNumber(res.data.length)
    setFollowingData(res.data)
  }

  const getItemsByAuthor = (async () => {
    // setIsLoading(true)
    if (coursesContract) {
      try {
      const res = await coursesContract?.methods?.getMyCourses().call({ from: wallet })
        //setIsLoading(false)
        
      setMyCourses(res)
      }catch(e){
        Swal.fire({
          icon: 'error',
          title: `Error code: ${e.code}`,
          text: `${e.message}`,
        })
      }
    }
    // setIsLoading(false)

  })
  useEffect(() => {

    getItemsByAuthor()
    getFollowersCount()
    getFollowingCount()
  }, [active])

  return (
    <>
      <SocialProfile 
      followersNumber={followersNumber}
      followingNumber={followingNumber}
      />
      <MyContent
        onCreateCourse={(newCourse) => createNewCourse(newCourse)}
      />
      {myCourses?.length > 0 ?
        <ShowContentCards courses={myCourses} />
        :
        <NoContentbyAuthor />}
    </>
  );
}

