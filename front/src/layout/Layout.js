import { Box } from '@chakra-ui/react'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

export const Layout = (props) => {
    return (
        <>
            <Navbar />
            <Box bg={'gray.200'}>
            {props.children}
            </Box>
            <Footer />
        </>
    )
}
