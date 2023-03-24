import { SET_BALANCE, SET_HANDLE, SET_WALLET} from "../types/users"


const initialState = {
    wallet: '',
    handle: '',
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WALLET:
            return { ...state, wallet: action.payload }
        case SET_HANDLE:
            return { ...state, handle: action.payload }
        case SET_BALANCE:
            return { ...state, balance: action.payload }
        default:
            return state
    }
}

// export const userReducer = createSlice({

//     name: 'user',
//     initialState: {
//         wallet: '',
//         handle: '',
//     },
//     reducers: {
//         setWallet: (state, action) => {
//             state.wallet = action.payload
//         },
//         setHandle: (state, action) => {
//             state.handle = action.payload
//         }
//     }
// })

// export const { setWallet, setHandle } = userReducer.actions
