import { Box, Button, HStack, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa';

export function PriceWrapper(props) {
    const { title, plan, handle, price, duration, features } = props
    return (

        <Box
            mb={4}
            shadow="md"
            borderWidth="1px"
            bg={plan === 'basic' ? 'blue.50' : plan === 'pro' ? 'yellow.50' : plan === 'gold' ? 'orange.100' : 'white'}
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={'gray.200'}
            borderRadius={'xl'}>
            <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                    {title}
                </Text>

                <Text fontWeight="300" fontSize="lg">
                    {handle}
                </Text>
                <Text fontWeight="100" fontSize="sm">
                    Plan {plan}
                </Text>
                <HStack justifyContent="center">
                    <Text fontSize="5xl" fontWeight="900">
                        {price}
                    </Text>

                </HStack>
                <Text fontSize="3xl" color="gray.500">
                    for {duration} months
                </Text>
            </Box>
            <VStack
                bg={'gray.50'}
                py={4}
                borderBottomRadius={'xl'}>
                <List spacing={3} textAlign="start" px={12}>
                    {features.map((item, index) => {
                        return (
                            <ListItem key={index}>
                                <ListIcon as={FaCheckCircle} color="green.500" />
                                {item}
                            </ListItem>
                        )
                    })
                    }
                </List>
                <Box w="80%" pt={7}>
                    <Button w="full" colorScheme="red" variant="outline">
                        Subscribe
                    </Button>
                </Box>
            </VStack>
        </Box>

    );
}