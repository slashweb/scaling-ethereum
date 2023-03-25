import { InfoIcon } from '@chakra-ui/icons'
import { Center, Heading, Text, VStack } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../constants'
import useCourses from '../../hooks/useCourses'
import { guid } from '../../utils'
import ShowContentCards from './ShowContentCards'
import SocialProfile from './SocialProfile'
import Swal from 'sweetalert2';

function NoContentbyAuthor() {
    return (
        <Center textAlign="center" py={10} px={10} mx={20} m={12} bg={'white'} rounded={'lg'}>
            <VStack>
                <InfoIcon boxSize={'50px'} color={'blue.500'} />
                <Heading as="h2" size="md" mt={6} mb={2}>
                    This author has no activity yet
                </Heading>
            </VStack>
        </Center>
    )
}

export default function ProfileOtherUsers() {
    const { user } = useParams()
    const navigate = useNavigate();

    const coursesContract = useCourses()
    const [myCourses, setMyCourses] = useState([])
    const wallet = useSelector((state) => state.user.wallet)
    const [followersNumber, setFollowersNumber] = useState(0)
    const [followingNumber, setFollowingNumber] = useState(0)
    const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false)
    const [isLoadingVF, setIsLoadingVF] = useState(false)
    const [isLoadingFollowing, setIsLoadingFollowing] = useState(false)
    const [isLoadingCourses, setIsLoadingCourses] = useState(false)

    const verifyFollowing = async () => {
        setIsLoadingVF(true)
        const following = await db.collection("Favorites")
            .where("following_user", "==", user)
            .get()
        const isFollowing = following.data.filter((entity) => entity.data.user === wallet)[0]
        if (isFollowing.length === 0) {
            setIsAlreadyFollowed(false)
            setIsLoadingVF(false)
        } else {
            setIsAlreadyFollowed(true)
            setIsLoadingVF(false)
        }

    }
    const newFavoriteUser = async () => {
        const idFavorite = guid()

        try {
            await db.collection("Favorites").create([idFavorite, wallet, user])
            Swal.fire('You have a new favorite user')
            verifyFollowing()
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: `Error code: ${e.code}`,
                text: `${e.message}`,
            })
        }
    }
    const getFollowersCount = async () => {
        try {
            setIsLoadingFollowing(true)
            const res = await db.collection("Favorites").where("following_user", "==", user).get()
            setFollowersNumber(res.data.length)
            setIsLoadingFollowing(false)
        } catch (e) {
            setIsLoadingFollowing(false)
            Swal.fire({
                icon: 'error',
                title: `Error code: ${e.code} in get count of followers`,
                text: `${e.message}`,
            })
        }
    }
    const getFollowingCount = async () => {
        try {
            setIsLoadingFollowing(true)
            const res = await db.collection("Favorites").where("user", "==", user).get()
            setFollowingNumber(res.data.length)
            setIsLoadingFollowing(false)
        } catch (e) {
            setIsLoadingFollowing(false)
            Swal.fire({
                icon: 'error',
                title: `Error code: ${e.code}`,
                text: `${e.message}`,
            })
        }
    }

    const getItemsByAuthor = (async () => {
        // setIsLoading(true)
        if (coursesContract) {
            try {
                setIsLoadingCourses(true)
                const res = await coursesContract?.methods?.getMyCourses().call({ from: user })
                //setIsLoading(false)
                setMyCourses(res)
                setIsLoadingCourses(false)
            } catch (e) {
                setIsLoadingCourses(false)
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
        if (user.toLowerCase() === wallet.toLowerCase()) {
            navigate('/profile', { replace: true })
        } else {
            verifyFollowing()
            getItemsByAuthor()
            getFollowersCount()
            getFollowingCount()
        }
    }, [])

    return (
        <>
            <SocialProfile
                onNewFavorite={() => newFavoriteUser()}
                followers={followersNumber}
                following={followingNumber}
                isAlreadyFollowed={isAlreadyFollowed}
                isLoadingVF={isLoadingVF}
                isLoadingFollowing={isLoadingFollowing}
                user={user}
            />
            <Heading>About this user</Heading>
            {isLoadingCourses?<Text>Loading courses...</Text>: myCourses?.length > 0 ?
                <ShowContentCards courses={myCourses} />
                :
                <NoContentbyAuthor />}
        </>
    );
}
