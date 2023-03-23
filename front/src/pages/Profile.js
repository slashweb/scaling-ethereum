import {InfoIcon} from '@chakra-ui/icons';
import {
    Heading,
    Center,
    VStack,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useWeb3React} from '@web3-react/core';
import useCourses from '../hooks/useCourses';
import MyContent from "./Profile/MyContent";
import SocialProfile from './Profile/SocialProfile';
import UserStatistics from './Profile/UserStatistics';
import ShowContentCards from './Profile/ShowContentCards';

function NoContentbyAuthor() {
    return (
        <Center textAlign="center" py={10} px={6} mx={20} m={12} bg={'white'} rounded={'lg'}>
            <VStack>
                <InfoIcon boxSize={'50px'} color={'blue.500'}/>
                <Heading as="h2" size="lg" mt={6} mb={2}>
                    Your profile is empty. Share something to the world!
                </Heading>
            </VStack>
        </Center>
    )
}

export default function Profile() {
    const {active} = useWeb3React()
    const coursesContract = useCourses()
    const [myCourses, setMyCourses] = useState([])
    const wallet = useSelector((state) => state.user.wallet)

    const createNewCourse = async newCourse => {
        try {
            const res = await coursesContract?.methods?.createNewContent(newCourse.title, newCourse.description, newCourse.price, 'url')?.send({from: wallet})
            console.log('res', res)
        } catch (err) {
            alert(err)
        }
    }

    const getItemsByAuthor = (async () => {
        // setIsLoading(true)
        if (coursesContract) {
            const res = await coursesContract?.methods?.getMyCourses().call({from: wallet})
                //setIsLoading(false)
                .catch(e => alert(e))
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
                <UserStatistics/>
            </SocialProfile>
            <MyContent
                onCreateCourse={(newCourse) => createNewCourse(newCourse)}
            />
            {myCourses?.length > 0 ?
                <ShowContentCards courses={myCourses}/>
                :
                <NoContentbyAuthor/>}
        </>
    );
}

