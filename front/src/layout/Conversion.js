import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { getStEthUsdValue, getUsdEthValue } from "../utils/conversion-coins";
function Conversion() {
    let quantity = 1
    const [stacked, setStacked] = useState()
    const [conversion, setConversion] = useState()
    async function getStacked(balance) {
        const result = await getStEthUsdValue(balance)
        setStacked(result)
    }
    async function setDolarEthConversion() {
        const res = await getUsdEthValue(1)
        setConversion(res)
    }
    useEffect(() => {
        setDolarEthConversion()
    }, [])

    return (
        <>
            <div>Conversion</div>
            <Text>1 eth a dolares</Text>
            {
                quantity
                    ? <Text fontSize={'xs'}>Dolares {(quantity / conversion).toFixed(2)}</Text>
                    : null
            }
        </>

    )
}

export default Conversion