import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import data from '../test/exampleTest'
//import axios from 'axios'
//const URL = 'http://jsonplaceholder.typicode.com/posts'
/*export const fetchCourses= createAsyncThunk('course/fetchCourses', async ()=>{
    try{
       // const res= await axios.get(URL)
       // return [...res.data]
       return await data
    }catch (err){
        return err.message
    }
})
*/
export const fetchCourses = createAsyncThunk('course/fetchCourses', async () => {
    const res = await new Promise((resolve, reject) => {

        resolve(console.log('success'))
    }).then(() => {
        // const res= await axios.get(URL)
        // return [...res.data]
        return data;
    }).catch(err => { return err.message })
    return res
})
//problema: no está recibiendo los parametros
export const getACourse = createAsyncThunk('course/getACourse', async ({ id }) => {
    const res = await new Promise((resolve, reject) => {
        resolve(console.log('success'))
    }).then(() => {
        //const res= await axios.get(URL)
        //return [...res.data]
        console.log('ID', id)
        return data.filter(item => item.id === id);
    }).catch(err => { return err.message })
    return res
})
export const courseReducer = createSlice({
    //https://www.youtube.com/watch?v=93CR_yURoII
    name: 'course',
    initialState: {
        data: [],
        singleItem: [],
        status:'',
        error: null
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    },
        extraReducers(builder) {
            builder
                .addCase(fetchCourses.pending, (state, action) => {
                    state.status = 'loading'
                })
                .addCase(fetchCourses.fulfilled, (state, action) => {
                    state.status = 'success'
                    state.data = action.payload
                })
                .addCase(fetchCourses.rejected, (state, action) => {
                    state.error = action.error.message
                    state.status='failed'
                })
            builder
                .addCase(getACourse.fulfilled, (state, action) => {
                    state.singleItem = action.payload
                })
        }
    })
//https://rickandmortyapi.com/api/character/473
export const { setData } = courseReducer.actions

export default courseReducer.reducer