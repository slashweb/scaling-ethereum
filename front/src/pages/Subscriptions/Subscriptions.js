import { InfoIcon } from '@chakra-ui/icons';
import { Box, Center, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../constants';
import { PriceWrapper } from './PriceWrapper';
import { ProfileCard } from './ProfileCard';
import Swal from 'sweetalert2'

const exampleSubscriptions = [
    {
        title: 'Basic',
        plan: 'basic',
        handle: 'John Doe',
        price: '0.0023 ETH',
        duration: 12,
        features: ['Access to all content']
    },
    {
        title: 'Pro',
        plan: 'pro',
        handle: 'John Doe',
        price: '0.0053 ETH',
        duration: 24,
        features: ['Access to all content', 'You can bid NFTS']
    },
    {
        title: 'Gold',
        plan: 'gold',
        handle: 'John Doe',
        price: '0.0093 ETH',
        duration: 36,
        features: ['Access to all content', 'You can bid NFTS', '5 paid content included']
    },
    {
        title: 'Basic',
        plan: 'basic',
        handle: 'James Hudson',
        price: '0.0010 ETH',
        duration: 12,
        features: ['Access to all content']
    },
    {
        title: 'Pro',
        plan: 'pro',
        handle: 'James Hudson',
        price: '0.0044 ETH',
        duration: 12,
        features: ['Access to all content', 'You can bid NFTS']
    },
    {
        title: 'Pro',
        plan: 'pro',
        handle: 'Richard Belmont',
        price: '0.0099 ETH',
        duration: 36,
        features: ['Access to all content', 'You can bid NFTS']
    },
]

function NoSubscriptions() {
    return (
        <Center textAlign="center" py={10} px={6} mx={20} m={12} bg={'white'} rounded={'lg'}>
            <VStack>
                <InfoIcon boxSize={'50px'} color={'blue.500'} />
                <Heading as="h2" size="lg" mt={6} mb={2}>
                    You haven't subscribed yet. Subscribe your favorite creators to enjoy their content
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

function Subscriptions() {
    const [results, setResults] = useState(exampleSubscriptions)
    const wallet = useSelector((state) => state.user.wallet)
    const [followingData, setFollowingData] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const getFollowing = async () => {
        try {
            setIsLoading(true)
            const res = await db.collection("Favorites").where("user", "==", wallet).get()
            setFollowingData(res.data)
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

    useEffect(() => {
        getFollowing()
    }, [])

    return (
        <>
        <Box>
            <Heading >My purchased courses</Heading>
            {followingData.length > 0 ?
                <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12}>
                    {isLoading?<Text>Loading content...</Text>:followingData.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <ProfileCard
                                    handle={''}
                                    wallet={item.data.following_user}
                                    userType={''}
                                    description={''}
                                    avatarURL={''}
                                    isLoading={false}
                                    plan={'No subscription'}
                                />
                            </React.Fragment>
                        )
                    })}
                </SimpleGrid>
                :
                <NoFollowing />}

            <Heading mt={10}>Subscriptions </Heading>
            {results.length > 0 ?
                <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12}>
                    {results.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <PriceWrapper
                                    title={item.title}
                                    plan={item.plan}
                                    handle={item.handle}
                                    price={item.price}
                                    duration={item.duration}
                                    features={item.features}
                                />
                            </React.Fragment>
                        )
                    })}
                </SimpleGrid>
                :
                <NoSubscriptions />}
                </Box>
        </>
    )
}

export default Subscriptions