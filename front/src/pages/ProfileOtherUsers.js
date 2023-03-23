import { InfoIcon } from '@chakra-ui/icons'
import { Center, Heading, VStack } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../constants'
import useCourses from '../hooks/useCourses'
import { guid } from '../utils'
import ShowContentCards from './ProfileOther/ShowContentCards'
import SocialProfile from './ProfileOther/SocialProfile'
import UserStatistics from './ProfileOther/UserStatistics'

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

    const { active, account, activate } = useWeb3React()
    const coursesContract = useCourses()
    const [myCourses, setMyCourses] = useState([])
    const wallet = useSelector((state) => state.user.wallet)

    const newFavoriteUser = async () => {
        console.log('Llegando')
        const idFavorite = guid()
        const res = await db.collection("Favorites").create([idFavorite, wallet, user])
            .catch(e => alert(e))
        console.log(res)
    }

    const getItemsByAuthor = (async () => {
        // setIsLoading(true)
        if (coursesContract) {
            const res = await coursesContract?.methods?.getMyCourses().call({ from: user })
                .catch(e => alert(e))
            //setIsLoading(false)
            setMyCourses(res)
        }
        // setIsLoading(false)

    })
    useEffect(() => {
        if (user.toLowerCase() == wallet.toLowerCase()) {
            navigate('/profile')
        } else {
            console.log('false, wallet/user: ', wallet, user)
        }
        getItemsByAuthor()
    }, [active])

    return (
        <>
            <SocialProfile onNewFavorite={() => newFavoriteUser()} user={user}>
                
            </SocialProfile>
            {myCourses?.length > 0 ?
                <ShowContentCards courses={myCourses} />
                :
                <NoContentbyAuthor />}
        </>
    );
}
