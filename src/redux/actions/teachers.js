import * as api from '../../api'
import {CREATE_TEACHER, UPDATE_TEACHER, DELETE_TEACHER, FETCH_ALL_TEACHERS} from '../const/reducerConsts'

export const getTeachers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTeachers();
        
        dispatch({type: FETCH_ALL_TEACHERS, payload : data})
    }
    catch (error) {
        console.log(error.message)
    }
}

export const createTeacher = (teacher) => async (dispatch) => {
    try {
        const {data} = await api.createTeacher(teacher)
        dispatch({type: CREATE_TEACHER, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const updateTeacher = (id, teacher) => async (dispatch) => {
    try {
        console.log(teacher)
        const {data} = await api.updateTeacher(id, teacher);
        
        dispatch({type: UPDATE_TEACHER, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteTeacher = (id) => async (dispatch) => {
    try {
        await api.deleteTeacher(id)

        dispatch({type: DELETE_TEACHER, payload : id})
    }
    catch(error) {
        console.log(error)
    }
}

