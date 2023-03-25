import {
  Box,
  Container,
  Heading,
  Text,
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
  useColorModeValue,
  chakra,
  AspectRatio
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getFileWithCid } from "../../utils";
import ReactPlayer from 'react-player'
import BuyModal from '../special/BuyModal';
import useCourses from '../../hooks/useCourses';


function CommentCard({ props }) {
  const { author, comment } = props;
  const time = new Date().toLocaleDateString()
  const avatar = ''
  return (
    <Flex
      boxShadow={'lg'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      mt={3}
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
      }}>
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        <HStack>
          <Text fontWeight={'bold'} fontSize={14}>
            {author} </Text>
          <chakra.span
            fontWeight={'medium'}
            color={'gray.500'}>
            {' '}
            - {time}
          </chakra.span>


        </HStack>
        <Text

          fontWeight={'medium'}
          fontSize={'15px'}
          pb={4}>
          {comment}
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

export default function ContentCard({ onSetLiked, likes, isAlreadyLiked, courseDetail, onCreateComment, storageComments, isLoadingVL }) {
  let { author, title, description, video, mainImage, price, id } = courseDetail
  const newPrice=parseInt(price)
  const [comment, setComment] = useState('')
  const coursesContract = useCourses()

  const [handleForm, setHandleForm] = useState()
  const [profilePic, setProfilePic] = useState()
  const [profile, setProfile] = useState()
  const [isLoading, setIsLoading] = useState()
  const [addr, setAddr] = useState()

  const getProfile = async () => {
      let res = await coursesContract?.methods?.getMyProfile().call({ from: author })
      if (res.length !== 0) {
          if (!profile) {
              setProfile(res)
              setProfilePic(res.profilePic)
              setHandleForm(res.handle)
              setAddr(res.addr)
          }
      }
  }
useEffect(()=>{
  getProfile()
}, [])

  return (
    <Container maxW={'1200'} p={14}>
      <Card p={10} m={20}>
        <CardHeader alignItems={'center'}>
          <Flex spacing='4'>
            <Center flex='1' gap='12'>
              <VStack alignItems={'center'}>
                <Link to={`/profile/${author}`}>
                  <Avatar name={author} src={getFileWithCid(profilePic)} size={'xl'} />
                </Link>
                <Box alignSelf={'center'}>
                  <Heading size='lg' autoCapitalize='true'>{handleForm}</Heading>
                  <Text fontWeight={'bold'} color={'gray.500'}>{author}</Text>
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
          src={getFileWithCid(mainImage)}
          alt={title}
          rounded={'lg'}
        />
        <CardFooter
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <Button
            variant='outline'
            flex='1'
            leftIcon={<BiLike />}
            isLoading={isLoadingVL}
            isDisabled={isAlreadyLiked}
            onClick={onSetLiked}
          >
            Like
          </Button>
          <BuyModal
            flex='1'
            title={title}
            price={newPrice}
            id={id}
          />
        </CardFooter>
        <Text>{likes} likes</Text>
        <HStack>
          {video ?
            <AspectRatio w='100%' ratio={1}>
              <ReactPlayer
                url={getFileWithCid(video)}
                width='100%'
                height='100%'
                controls={true}
              />
            </AspectRatio>
            : null
          }

        </HStack>
        <HStack marginTop={10}>
          <Input value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Write a comment' size='lg'
            onKeyPress={e => {
              if (e.key === 'Enter') {
                onCreateComment(comment)
                setComment('')
              }
            }}
            borderColor={'gray.300'} />
          <IconButton onClick={() => {
            onCreateComment(comment)
            setComment('')
          }}>
            <AiOutlineSend size={'48'} />
          </IconButton>
        </HStack>
        <Box mt={16}>
          {storageComments.length > 0 ? storageComments.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <CommentCard props={item.data} />
              </React.Fragment>
            )
          })
            : <Text>This content has no comments</Text>}
        </Box>
      </Card>
    </Container>
  )
}