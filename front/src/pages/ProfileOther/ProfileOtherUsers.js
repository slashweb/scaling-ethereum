import { InfoIcon } from '@chakra-ui/icons'
import { Center, Heading, VStack } from '@chakra-ui/react'
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

export default function ProfileOtherUsers() {
    const { user } = useParams()
    const navigate = useNavigate();

    const coursesContract = useCourses()
    const [myCourses, setMyCourses] = useState([])
    const wallet = useSelector((state) => state.user.wallet)
    const [followersNumber, setFollowersNumber] = useState(0)
    const [followingNumber, setFollowingNumber] = useState(0)
    const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false)

    const verifyFollowing = async () => {

        const following = await db.collection("Favorites")
            .where("following_user", "==", user)
            .get()


        const isFollowing = following.data.filter((entity) => entity.data.user === wallet)[0]
        if (isFollowing.length === 0) {
            setIsAlreadyFollowed(false)
        } else {
            setIsAlreadyFollowed(true)
        }

    }
    //no esta funcionando correctamente... 
    const newFavoriteUser = async () => {
        const idFavorite = guid()

        try {
            await db.collection("Favorites").create([idFavorite, wallet, user])
            Swal.fire('Success')
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
            const res = await db.collection("Favorites").where("following_user", "==", user).get()
            setFollowersNumber(res.data.length)
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: `Error code: ${e.code}`,
                text: `${e.message}`,
            })
        }
    }
    const getFollowingCount = async () => {
        try {
            const res = await db.collection("Favorites").where("user", "==", user).get()
            setFollowingNumber(res.data.length)
        } catch (e) {
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
                const res = await coursesContract?.methods?.getMyCourses().call({ from: user })
                //setIsLoading(false)
                setMyCourses(res)
            } catch (e) {
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
            <SocialProfile onNewFavorite={() => newFavoriteUser()} followers={followersNumber} following={followingNumber} isAlreadyFollowed={isAlreadyFollowed} />
            {myCourses?.length > 0 ?
                <ShowContentCards courses={myCourses} />
                :
                <NoContentbyAuthor />}
        </>
    );
}
