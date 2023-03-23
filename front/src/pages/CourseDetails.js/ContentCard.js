import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Image,
  CardFooter,
  Button,
  CardBody,
  IconButton,
  CardHeader,
  Card,
  Flex,
  Avatar,
  Center,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BiChat, BiLike } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';


export default function ContentCard({ courseDetail, onCreateComment }) {
  const { author, title, description } = courseDetail
  const [comment, setComment] = useState('')
  return (
    <Container maxW='4/6' p={14}>
      <Card p={14} m={20}>
        <CardHeader alignItems={'center'}>
          <Flex spacing='4' >
            <Center flex='1' gap='12' >
              <VStack alignItems={'center'}>
                <Avatar name={author} src='https://bit.ly/sage-adebayo' size={'xl'} />
                <Box alignSelf={'center'}>
                  <Heading size='lg' autoCapitalize='true'>{author}</Heading>
                  <Text>Creator</Text>
                </Box>
              </VStack>
            </Center>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              size={'lg'}
              aria-label='See menu'
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Heading textAlign={'left'}>
            {title}
          </Heading>
          <Text textAlign={'left'}>
            {description}
          </Text>
        </CardBody>
        <Image
          objectFit='cover'
          src={''}
          alt={title}
          rounded={'lg'}
        />
        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
            Like
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
            Comment
          </Button>
          <Button
            flex='1'
            color='white'
            bg={'purple'}
            fontSize='sm'
            fontWeight='500'
            borderRadius='70px'>
            Place Bid
          </Button>
        </CardFooter>
        <HStack>
          <Input value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Write a comment' size='lg' borderColor={'gray.300'} />
          <IconButton onClick={() => {
            onCreateComment(comment)
          }}>
            <AiOutlineSend size={'48'} />
          </IconButton>
        </HStack>
      </Card>
    </Container>
  )
}

