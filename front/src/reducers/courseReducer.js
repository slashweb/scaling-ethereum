
/*export const courseReducer = createSlice({
    //https://www.youtube.com/watch?v=93CR_yURoII
    name: 'course',
    initialState: {
        data: [],
        status: '',
        error: null
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers(builder) {
    
    }
})
//https://rickandmortyapi.com/api/character/473
export const { setData } = courseReducer.actions

export default courseReducer.reducer
*/
import { ERROR_FETCHING_COURSES, FETCHING_COURSES, SET_COURSES } from "../types/courses"


const initialState = {
    courses: [],
    errorFetchingCourses: '',
    fetchingCourses: false
}

export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COURSES:
            return { ...state, courses: action.payload }
        case ERROR_FETCHING_COURSES:
            return { ...state, errorFetchingCourses: action.payload }
        case FETCHING_COURSES:
            return { ...state, fetchingCourses: true}
        default:
            return state
    }
}