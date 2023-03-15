
import { Avatar, Button, Heading, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsFillHandThumbsDownFill, BsFillShareFill, BsFillHandThumbsUpFill, BsFillSaveFill } from 'react-icons/bs';
const SideBarRow = ({selected, Icon, title}) => {
    return (
        <div className={`sidebarrow ${selected ? 'selected': ''}`}>
            <Icon className='sidebarrow__icon'/>
            <h2 className='sidebarrow__title'>{title}</h2>
        </div>
    )
}

const VideoInfo = ({title ='hola mundo', description='descripcion cualquiera', publishedDate='30/11/2022', channelTitle, channelImage, viewCount, likeCount, dislikeCount, subs}) => {
    return (
        <VStack>
            <Heading>{title}</Heading>

            <HStack>
                <p>{viewCount} views • {publishedDate}</p>
                <div className="videoinfo__likes">
                    <SideBarRow Icon={BsFillHandThumbsUpFill} title={likeCount} />
                    <SideBarRow Icon={BsFillHandThumbsDownFill} title={dislikeCount} />
                    <SideBarRow Icon={BsFillShareFill} title='SHARE' />
                    <SideBarRow Icon={BsFillSaveFill} title='SAVE' />
                </div>
                </HStack>
            <hr />
            <div className="videoinfo__channel">
                <div>
                    <Avatar 
                        className='videoinfo__avatar' 
                        alt={channelTitle} 
                        src={channelImage} 
                    />
                    <div className='videoinfo__channelinfo'>
                        <h3 className='videoinfo__channeltitle'>{channelTitle}</h3>
                        <p className='videoinfo__channelsubs'>{subs} subscribers</p>
                    </div>
                    
                </div>
                <div className='videoinfo__subscribe'>
                    <Button color='secondary' >SUBSCRIBE</Button>
                </div>
            </div>
            <div className='videoinfo__channeldesc'>
                <p>{description}</p>
            </div>
        </VStack>
    )
}

export default VideoInfo;