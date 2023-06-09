import { InfoIcon } from '@chakra-ui/icons';
import {
    Heading,
    Center,
    VStack,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useCourses from '../hooks/useCourses';
import MyContent from "./Profile/MyContent";
import SocialProfile from './Profile/SocialProfile';
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
    const coursesContract = useCourses()
    const [myCourses, setMyCourses] = useState([])
    const wallet = useSelector((state) => state.user.wallet)
    const [followersNumber, setFollowersNumber] = useState(0)
    const [followingNumber, setFollowingNumber] = useState(0)
    const [followersData, setFollowersData] = useState(0)
    const [followingData, setFollowingData] = useState(0)
    const [courseCreated, setCourseCreated] = useState(null)
    const [profile, setProfile] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingC, setIsLoadingC] = useState(false)

    const createNewCourse = async newCourse => {
        try {
            setIsLoadingC(true)
            const res = await coursesContract?.methods?.createNewContent(
                newCourse.title,
                newCourse.description,
                newCourse.price,
                newCourse.video,
                newCourse.mainImage
            )?.send({ from: wallet })
            setCourseCreated(res)
            setIsLoadingC(false)
            getItemsByAuthor()
            Swal.fire({
                icon: 'success',
                title: `Succes`,
                text: `Course created successfully`,
            })
        } catch (err) {
            setIsLoadingC(false)
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
        if (coursesContract) {
            try {
                setIsLoading(true)
                const res = await coursesContract?.methods?.getMyCourses().call({ from: wallet })
                setMyCourses(res)
                setIsLoading(false)
            } catch (e) {
                setIsLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: `Error code: ${e.code}`,
                    text: `${e.message}`,
                })
            }
        }
    })

    useEffect(() => {
        getItemsByAuthor()
        getFollowersCount()
        getFollowingCount()
    }, [])

    return (
        <>
            <SocialProfile
                followersNumber={followersNumber}
                followingNumber={followingNumber}
            >
                <MyContent
                    onCreateCourse={(newCourse) => createNewCourse(newCourse)}
                    courseCreated={courseCreated}
                    isLoading={isLoadingC}
                />
            </SocialProfile>


            <Heading>My Content</Heading>
            {isLoading?<Text>Loading my content...</Text>:myCourses?.length > 0 ?
                <ShowContentCards courses={myCourses} />
                :
                <NoContentbyAuthor />}
        </>
    );
}

