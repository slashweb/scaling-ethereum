import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({

    name: 'user',
    initialState: {
        wallet: '',
        handle: '',
    },
    reducers: {
        setWallet: (state, action) => {
            state.wallet = action.payload
        },
        setHandle: (state, action) => {
            state.handle = action.payload
        }
    }
})

export const { setWallet, setHandle } = userReducer.actions

export default userReducer.reducer