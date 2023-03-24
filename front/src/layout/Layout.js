import { Box } from '@chakra-ui/react'
import React from 'react'
import Conversion from './Conversion'
import Footer from './Footer'
import Navbar from './Navbar'

export const Layout = (props) => {
    return (
        <>
            <Navbar />
            <Conversion />
            <Box bg={'gray.200'}>
            {props.children}
            </Box>
            <Footer />
        </>
    )
}
