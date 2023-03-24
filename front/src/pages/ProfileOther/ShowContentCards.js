import { SimpleGrid } from "@chakra-ui/react"
import { SimpleProduct } from "../MarketPlace"

import { getFileWithCid } from "../../utils";

export default function ShowContentCards({courses}) {
    return (
      <SimpleGrid columns={{ base: 1, md: 4 }} gap='20px' m={12}>
        {courses.map((item, index) => {
          return (
            <SimpleProduct
              key={index}
              name={item['title']}
              author={item['author']}
              bidders={''}
              image={getFileWithCid(item.mainImage)}
              price={item['price']}
              download='#'
              id={item['id']}
            />
          )
        })}
      </SimpleGrid>
    )
  }