import { Box, Button, Flex, Heading, HStack, Img, Text } from '@chakra-ui/react';
import React from 'react'
import { BsFillTrashFill, BsPlayBtnFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import data from '../test/exampleTest';

function CourseItem({content}){
    return (
        <Box py={6} px={6}>
          <Box
            w="xs"
            rounded={'md'}
            my={5}
            mx={[0, 5]}
            overflow={'hidden'}
            bg="white"
          >
            <Box h={'200px'} borderBottom={'1px'} borderColor="black">
              <Img
                src={content.preview}
                roundedTop={'sm'}
                objectFit="cover"
                h="full"
                w="full"
                alt={'Blog Image'}
              />
            </Box>
            <Box p={4}>
              <Box
                bg="#f9b233"
                display={'inline-block'}
                px={2}
                py={1}
                color="white"
                rounded={'md'}
                mb={2}>
                <Text fontSize={'xs'} fontWeight="medium">
                  {content.price}
                </Text>
              </Box>
              <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
                {content.title}
              </Heading>
              <Text color={'gray.500'} noOfLines={2}>
                {content.description}
              </Text>
            </Box>
            <HStack>
                <Link to={`/courses/${content.id}`}>
              <Flex
                py={2}
                px={4}
                bg={'#406782'}
                
                justifyContent={'space-between'}
                rounded={'lg'}
                cursor={'pointer'}
              >
                <Text fontSize={'md'} color={'white'} fontWeight={'semibold'}>
                  More info
                </Text>
    
              </Flex>
              </Link>
              <Flex
                p={4}
                
                justifyContent={'space-between'}
                roundedBottom={'sm'}
    
                cursor="pointer">
                
                <Button onClick={()=>console.log('click')}><BsFillTrashFill fontSize={'24px'} /></Button>
              </Flex>
              <Link to={`/courses/play/${content.id}`}>
              <Flex
                p={4}
                
                justifyContent={'space-between'}
                roundedBottom={'sm'}
    
                cursor="pointer">
                
 
                <Button bg={'#406782'} onClick={()=>console.log('click')}><BsPlayBtnFill fontSize={'24px'} color={'white'} /></Button>
              </Flex>
              </Link>
            </HStack>
          </Box>
        </Box>
      );
}

function CourseList() {
  return (
    <>
    <HStack>
    {data.map((item,index)=>{
        return(
         <CourseItem key={index} content={item} />
        )
    })}
   </HStack>
    </>
  )
}

export default CourseList