import { InfoIcon } from '@chakra-ui/icons';
import {
  Heading,
  Center,
  VStack,

} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import data from '../test/exampleTest';
import { useWeb3React } from '@web3-react/core';
import useCourses from '../hooks/useCourses';
import { Auth } from "@polybase/auth";
import MyContent from "./Profile/MyContent";
import SocialProfile from './Profile/SocialProfile';
import UserStatistics from './Profile/UserStatistics';
import ShowContentCards from './Profile/ShowContentCards';

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
  const { active, account, activate } = useWeb3React()
  const coursesContract = useCourses()
  const [myCourses, setMyCourses] = useState([])
  const wallet = useSelector((state) => state.user.wallet)
  const createNewCourse = async newCourse => {
    const res = await coursesContract?.methods?.createNewContent(newCourse.title, newCourse.description, newCourse.price, 'url')?.send({ from: wallet })
    .catch(e=>alert(e))
    console.log('res', res)
  }

  const getItemsByAuthor = (async () => {
    // setIsLoading(true)
    if (coursesContract) {
      const res = await coursesContract?.methods?.getMyCourses().call({ from: wallet })
      //setIsLoading(false)
      .catch(e=>alert(e))
      setMyCourses(res)
    }
    // setIsLoading(false)

  })
  useEffect(() => {

    getItemsByAuthor()
  }, [active])

  return (
    <>
      <SocialProfile>
        <UserStatistics />
      </SocialProfile>
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

