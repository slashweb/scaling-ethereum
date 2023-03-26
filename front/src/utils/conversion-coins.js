import axios from 'axios'

const CONVERSOR_API = 'https://api.coingecko.com/api/v3'
const COIN_ENDPOINT = '/coins'
const BigFloat32 = require('bigfloat').BigFloat32;


function etow(etowFull) {
    let result = (etowFull + "").padStart(19, "0")
    console.log('res', etowFull)
    result = result.slice(0, -18) + "." + result.slice(-18)
    return result
}
function wtoe(quantity) {
    const asText = quantity.toFixed(18)
    // remove dec point
    const decPointPos = asText.length - 19
    return asText.slice(0, decPointPos) + asText.slice(decPointPos + 1)
}

export const getEth = () => {
    return new Promise((resolve, reject) => {
        axios.get(CONVERSOR_API + COIN_ENDPOINT + '/ethereum')
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}
export const getWei = quantity => {
    return quantity * Math.pow(10, 18)
}
export const getUsdEthValue = async quantity => {
    const eth = await getEth()
    const price = eth.market_data.current_price.usd
    return quantity / price
}
export const getUsdEthValueForContract = async quantity => {
    const BigQuantity = new BigFloat32(quantity)
    const eth = await getEth()
    const price = eth.market_data.current_price.usd
    return (quantity) / price
}