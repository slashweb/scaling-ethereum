
import { SET_COURSES, ERROR_FETCHING_COURSES, FETCHING_COURSES } from "../types/courses"


export const getCourses = courses => dispatch => {
    dispatch({
        type: SET_COURSES,
        payload: courses
    })
}
