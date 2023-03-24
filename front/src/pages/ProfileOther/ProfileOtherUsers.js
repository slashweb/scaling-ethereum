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
import UserStatistics from './UserStatistics'

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

    const { active } = useWeb3React()
    const coursesContract = useCourses()
    const [myCourses, setMyCourses] = useState([])
    const wallet = useSelector((state) => state.user.wallet)
    const [followersNumber, setFollowersNumber] = useState(0)
    const [followingNumber, setFollowingNumber] = useState(0)
    const [isAlreadyFollowed, setIsAlreadyFollowed] = useState(false)

    const verifyFollowing = async () => {
        try{
        const res = await db.collection("Favorites")
            .where("following_user", "==", user)
            .where("user", "==", wallet).get()
        console.log(res)
        if (res.data.length !== 0) {
            setIsAlreadyFollowed(true)
            return true
        } else {
            setIsAlreadyFollowed(false)
            return false
        }
    }catch(e){
        alert(e)
    }
    }

    const newFavoriteUser = async () => {
        const idFavorite = guid()
        verifyFollowing()
        if (!isAlreadyFollowed) {
            try {
                await db.collection("Favorites").create([idFavorite, wallet, user])
            } catch (e) {
                alert(e)
            }
        }
        else {
            alert('This user is already followed by you')
        }
    }
    const getFollowersCount = async () => {
        try {
            const res = await db.collection("Favorites").where("following_user", "==", user).get()
            setFollowersNumber(res.data.length)
        } catch (e) {
            alert(e)
        }
    }
    const getFollowingCount = async () => {
        try {
            const res = await db.collection("Favorites").where("user", "==", user).get()
            setFollowingNumber(res.data.length)
        } catch (e) {
            alert(e)
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
                alert(e)
            }
        }
        // setIsLoading(false)
    })
    useEffect(() => {
        if (user.toLowerCase() === wallet.toLowerCase()) {
            navigate('/profile')
        } else {
            console.log('false, wallet/user: ', wallet, user)
        }
        getItemsByAuthor()
        getFollowersCount()
        getFollowingCount()
    }, [active])

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
