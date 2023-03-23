
import {
  Box,
  Flex,
  SimpleGrid,
  useColorModeValue,
  StatLabel,
  StatNumber,
  Stat,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';


const userExample = {
    handle: 'John Doe',
    wallet: '0x3..bb3',
    subscribers: 8,
    following: 3,
    numberOfItems: 2,
    userType: 'creator',
    description: 'NFT creator',
    avatarURL: 'https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png',
    balance: '5 ETH',
    statistics: {
        likes: 54,
        sales: 3,
        inbox: 6,
    }
  }
  
  
  function StatsCard({ title, stat, icon }) {
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
 export default function UserStatistics() {
    return (
      <Box mx={'auto'} pt={5} px={20}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'likes'}
            stat={userExample.statistics.likes}
            icon={<BsPerson size={'3em'} />}
          />
          <StatsCard
            title={'sales'}
            stat={userExample.statistics.sales}
            icon={<FiServer size={'3em'} />}
          />
          <StatsCard
            title={'inbox'}
            stat={userExample.statistics.inbox}
            icon={<FiServer size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    )
  }