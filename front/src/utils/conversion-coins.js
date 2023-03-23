import axios from 'axios'

const CONVERSOR_API = 'https://api.coingecko.com/api/v3'
const COIN_ENDPOINT = '/coins'

export const getStNear = () => {
    return new Promise((resolve, reject) => {
        axios.get(CONVERSOR_API + COIN_ENDPOINT + '/staked-near')
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

export const getStNearUsdValue = async quantity => {
    quantity = yton(quantity)
    const stNear = await getStNear()
    const price = stNear.market_data.current_price.usd
    return quantity * price
}

export const getNear = () => {
    return new Promise((resolve, reject) => {
        axios.get(CONVERSOR_API + COIN_ENDPOINT + '/near')
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}

export const getNearUsdValue = async quantity => {
    quantity = yton(quantity)
    const near = await getNear()
    const price = near.market_data.current_price.usd
    return quantity * price
}

export const getUsdNeardValue = async quantity => {
    const near = await getNear()
    const price = near.market_data.current_price.usd
    return quantity / price
}

function yton(ytonFull) {
    let result = (ytonFull + "").padStart(25, "0")
    console.log('res',ytonFull)
    result = result.slice(0, -24) + "." + result.slice(-24)
    return result
}

function ntoy(quantity) {
    const asText = quantity.toFixed(24)
    // remove dec point
    const decPointPos = asText.length - 25
    return asText.slice(0, decPointPos) + asText.slice(decPointPos + 1)
}

export const getEth = () => {
    return new Promise((resolve, reject) => {
        axios.get(CONVERSOR_API + COIN_ENDPOINT + '/ethereum')
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}
export const getStEth = () => {
    return new Promise((resolve, reject) => {
        axios.get(CONVERSOR_API + COIN_ENDPOINT + '/liquid-staked-ethereum')
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
}
export const getStEthUsdValue = async quantity => {
    quantity = yton(quantity)
    const stEth = await getStEth()
    const price = stEth.market_data.current_price.usd
    return quantity * price
}
export const getUsdEthValue = async quantity => {
    const eth = await getEth()
    const price = eth.market_data.current_price.usd
    return quantity / price
}