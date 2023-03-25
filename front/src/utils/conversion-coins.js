import axios from 'axios'

const CONVERSOR_API = 'https://api.coingecko.com/api/v3'
const COIN_ENDPOINT = '/coins'


export const getEth = () => {
    return new Promise((resolve, reject) => {
        axios.get(CONVERSOR_API + COIN_ENDPOINT + '/ethereum')
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}
export const getWei = async quantity => {
    return quantity * Math.pow(10, 18)
}
export const getUsdEthValue = async quantity => {
    const eth = await getEth()
    const price = eth.market_data.current_price.usd
    return quantity / price
}
export const getUsdEthValueForContract = async quantity => {
    const eth = await getEth()
    const price = eth.market_data.current_price.usd
    return (quantity / 1000) / price
}