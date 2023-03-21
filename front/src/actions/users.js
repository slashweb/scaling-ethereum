import { SET_WALLET, SET_HANDLE, SET_BALANCE, SET_TYPE } from "../types/users"

export const setWallet = wallet => dispatch => {
    dispatch({
        type: SET_WALLET,
        payload: wallet
    })
}
export const setHandle = handle => dispatch => {
    dispatch({
        type: SET_HANDLE,
        payload: handle
    })
}
export const setBalance = balance => dispatch => {
    dispatch({
        type: SET_BALANCE,
        payload: balance
    })
}
export const setType = type => dispatch => {
    dispatch({
        type: SET_TYPE,
        payload: type
    })
}