import { SET_WALLET, SET_HANDLE, SET_BALANCE, } from "../types/users"

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