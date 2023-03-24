import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { getStEthUsdValue, getUsdEthValue } from "../utils/conversion-coins";
function Conversion() {
    let quantity = 9
    const [stacked, setStacked] = useState()
    const [conversion, setConversion] = useState()
    async function getStacked(balance) {
        const result = await getStEthUsdValue(balance)
        setStacked(result)
    }
    async function setDolarEthConversion() {
        const res = await getUsdEthValue(quantity)
        setConversion(res)
    }

    function getEths(eth_in_usd,quantity){
        return quantity/eth_in_usd

    }

    useEffect(() => {
        setDolarEthConversion()
    }, [])

    return (
        <>
            <div>Conversion</div>
            <Text>{quantity} dolares a eth</Text>
            {
                quantity
                    ?<> <Text fontSize={'xs'}> 1 Eth {(quantity / conversion).toFixed(2)} USD</Text>
                    <Text>{getEths((quantity / conversion).toFixed(2),quantity)} ETH</Text>
                    </>
                    : null
            }
        </>
    )
}

export default Conversion