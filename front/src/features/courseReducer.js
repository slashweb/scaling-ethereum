import { createSlice } from '@reduxjs/toolkit'

export const courseReducer = createSlice({

    name: 'course',
    initialState: {
        title: '',
        description: '',
        author: '',
        preview: '',
        price: '',
        bidders: [],
        videoURL: '',
        id: 0
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        setAuthor: (state, action) => {
            state.author = action.payload
        },
        setPreview: (state, action) => {
            state.preview = action.payload
        }
    }
})

export const { setTitle, setDescription, setAuthor, setPreview } = courseReducer.actions

export default courseReducer.reducer