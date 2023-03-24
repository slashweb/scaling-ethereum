import { InfoIcon } from '@chakra-ui/icons';
import { Center, Heading, SimpleGrid, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../constants';
import { NoSubscribers } from '../Subscribers';
import { useWeb3React } from '@web3-react/core';
import { PriceWrapper } from './PriceWrapper';
import { ProfileCard } from './ProfileCard';

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
    const { active } = useWeb3React()
    const [followingData, setFollowingData] = useState(0)

    const getFollowing = async () => {
        try{
        const res = await db.collection("Favorites").where("user", "==", wallet).get()
        setFollowingData(res.data)
        }catch(e){
            alert(e)
        }
    }

    useEffect(() => {
        getFollowing()
    }, [active])

    return (
        <>
            <Heading m={10}>Following users</Heading>
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

            <Heading m={10}>Subscriptions </Heading>
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
        </>
    )
}

export default Subscriptions