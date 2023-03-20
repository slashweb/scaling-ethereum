import React, { Fragment } from 'react'
import {
    Avatar,
    Box,
    chakra,
    Flex,
    Heading,
    HStack,
    Icon,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { BsDot } from 'react-icons/bs';
import { ContentNotification, NotificationBackgrounds } from '../test/notifications/exampleNotifications';

function TestimonialCard({ props, index }) {
    const { name, time, content,unread, avatar } = props;
    return (
        <Flex
            boxShadow={'lg'}
            maxW={'640px'}
            direction={{ base: 'column-reverse', md: 'row' }}
            width={'full'}
            rounded={'xl'}
            p={10}
            justifyContent={'space-between'}
            position={'relative'}
            bg={useColorModeValue('white', 'gray.800')}
            _before={{
                content: '""',
                position: 'absolute',
                zIndex: '-1',
                height: 'full',
                maxW: '640px',
                width: 'full',
                filter: 'blur(40px)',
                transform: 'scale(0.98)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                top: 0,
                left: 0,
                backgroundImage: NotificationBackgrounds[index % 4],
            }}>
            <Flex
                direction={'column'}
                textAlign={'left'}
                justifyContent={'space-between'}>
                    <HStack>
                <Text fontWeight={'bold'} fontSize={14}>
                    {name} </Text>
                    <chakra.span
                        fontWeight={'medium'}
                        color={'gray.500'}>
                        {' '}
                        - {time}
                    </chakra.span>
                    
                        {unread?<BsDot size={'36'} color={'blue'}/>:null}
                
                </HStack>
                <Text

                    fontWeight={'medium'}
                    fontSize={'15px'}
                    pb={4}>
                    {content}
                </Text>

            </Flex>
            <Avatar
                src={avatar}
                height={'80px'}
                width={'80px'}
                alignSelf={'center'}
                m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
            />
        </Flex>
    );
}

function Notifications() {
    return (
        <Flex
            textAlign={'center'}
            pt={10}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}
            overflow={'hidden'}>
            <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
                <Heading
                    py={5}
                    fontSize={48}
                    fontWeight={'bold'}
                    color={useColorModeValue('gray.700', 'gray.50')}>
                    Last notifications and news
                </Heading>
            </Box>
            <VStack
                spacing={'5'}
                mt={3}
                mb={3}
                mx={'auto'}>
                {ContentNotification.map((cardInfo, index) => (
                    <Fragment key={index}>
                        <TestimonialCard props={cardInfo} index={index} />
                    </Fragment>
                ))}
            </VStack>
        </Flex>
    )
}

export default Notifications