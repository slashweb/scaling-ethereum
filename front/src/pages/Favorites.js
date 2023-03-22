import { InfoIcon } from '@chakra-ui/icons'
import { Button, Center, Heading, HStack, Input, InputGroup, InputRightElement, Select, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import data from '../test/exampleTest'
import { SimpleProduct } from './MarketPlace'
function NoFavorites() {
  return (
    <Center textAlign="center" py={10} px={6} mx={20} m={12} bg={'white'} rounded={'lg'}>
      <VStack>
        <InfoIcon boxSize={'50px'} color={'blue.500'} />
        <Heading as="h2" size="lg" mt={6} mb={2}>
          You haven't liked any content yet.
        </Heading>
      </VStack>
    </Center>
  )
}
function NotFound(props) {
  const { search, criteria } = props
  return (
    <Center textAlign="center" py={10} px={6} mx={20} m={12} bg={'white'} rounded={'lg'}>
      <VStack>
        <InfoIcon boxSize={'50px'} color={'blue.500'} />
        <Heading as="h2" size="lg" mt={6} mb={2}>

          Content not found with '{search}' as a {criteria}. Check your spelling or use other terms
        </Heading>
      </VStack>
    </Center>
  )
}
function Favorites() {
  const [search, setSearch] = useState('')
  const [criteria, setCriteria] = useState('')
  const favoriteContent = data.filter((item) => item.liked === true)
  const [results, setResults] = useState(favoriteContent)

  const searchBar = (e) => {
    setSearch(e.target.value)
  }
  //funcion para filtrar
  function SearchFunction() {

    if (!search || !criteria || criteria === 'all') {
      setResults(favoriteContent)

    } else {
      setResults(favoriteContent.filter((dato) =>
        dato[criteria] === search))
    }
  }
  return (
    <>
      <HStack bg={'white'} p={5}>
        <Select w={'1/4'} value={criteria} placeholder='Choose one...' onChange={(e) => setCriteria(e.target.value)}>
          <option value='all'>Show All</option>
          <option value='author'>Author</option>
          <option value='title'>Title</option>
        </Select>
        <InputGroup>
          <Input type="text" disabled={!criteria || criteria === 'all'}
            value={search} onChange={searchBar}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                SearchFunction()
              }
            }}
            placeholder='Write a term for search' />
          <InputRightElement width='1/5'>
            <Button bg={'darkblue'} color={'white'} size='md' onClick={SearchFunction}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup></HStack>
      <Heading mt={10}>My favorite content</Heading>
      {results.length > 0 ?
        <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12}>
          {results.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <SimpleProduct
                  id={item.id}
                  key={index}
                  name={item.title}
                  author={item.author}
                  bidders={item.bidders}
                  image={item.images[0]}
                  price={item.price}
                  download='#'
                />
              </React.Fragment>
            )
          })}
        </SimpleGrid>
        : favoriteContent.length > 0 ?
          <NotFound search={search} criteria={criteria} />
          :
          <NoFavorites />}
    </>
  )
}

export default Favorites