import { Button, Heading, HStack, Input, InputGroup, InputRightElement, Select, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import data from '../test/exampleTest'
import { SimpleProduct } from './MarketPlace'

function Favorites() {
  const [search, setSearch] = useState('')
  const [criteria, setCriteria] = useState('')
  const favoriteContent=data.filter((item)=>item.liked===true)
  const [results, setResults] = useState(favoriteContent)

  const searchBar = (e) => {
      setSearch(e.target.value)
  }
  //funcion para filtrar
  function SearchFunction() {

      if (!search && !criteria) {
          setResults(favoriteContent)
      } else if(criteria==='all') {
        setResults(favoriteContent)
    }else {
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
                  <Input type="text" disabled={!criteria || criteria==='all'} 
                  value={search} onChange={searchBar} 
                  onKeyPress={e=> {
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
          <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12}>
              {results.length>0 ? results.map((item, index) => {
                  return (
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
                  )
              }) :<Text>No content available</Text>}
          </SimpleGrid>
      </>
  )
}

export default Favorites