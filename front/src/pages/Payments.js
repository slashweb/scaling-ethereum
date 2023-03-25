import { Button, Container, Heading } from '@chakra-ui/react'
import React from 'react'
import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react";
function CardPayments() {
    return (
        <Box bg={'white'} rounded={'md'} p={5} >
            <Flex justifyContent="space-between" alignItems="center">
                <chakra.span
                    fontSize="sm"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                >
                    Mar 10, 2019
                </chakra.span>
            </Flex>
            <Box mt={2}>
                <Link
                    fontSize="2xl"
                    color="gray.700"
                    _dark={{ color: "white" }}
                    fontWeight="700"
                    _hover={{
                        color: "gray.600",
                        _dark: {
                            color: "gray.200",
                        },
                        textDecor: "underline",
                    }}
                >
                    Accessibility tools for designers and developers
                </Link>
                <chakra.p mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
                    expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
                    enim reprehenderit nisi, accusamus delectus nihil quis facere in
                    modi ratione libero!
                </chakra.p>
            </Box>
        </Box>
    );
}

function Payments() {
    return (
        <Container>
            <Heading>My Payments</Heading>
            <Button variant={'solid'}>Get funds</Button>
            <CardPayments />
        </Container>
    )
}

export default Payments