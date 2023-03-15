import { VStack } from '@chakra-ui/react'
import React from 'react'
import YouTube from 'react-youtube'
import VideoInfo from './video/VideoInfo'
function VideoCourse({videoId='home'}) {
  return (
    <>
    <VStack alignItems={'flex-start'}
    >
    <YouTube
      width={1250}
      videoId={videoId}
    />
    <VideoInfo />
    </VStack>
    </>

  )
}

export default VideoCourse
//plantilla para imitar a youtube https://javascript.plainenglish.io/lets-build-a-youtube-clone-with-react-part-4-48dd9e9d8cef