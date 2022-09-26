import * as api from '../../api'
import { CREATE_HOMEWORK, DELETE_HOMEWORK, FETCH_ALL_HOMEWORK, FETCH_HOMEWORK_BY_STUDENT, UPDATE_HOMEWORK } from '../const/reducerConsts'

export const getHomework = () => async (dispatch) => {
    try {
        const { data } = await api.fetchHomework();

        dispatch({type: FETCH_ALL_HOMEWORK, payload: data})
    }
    catch (error) {
        console.log(error.message)
    }
}

export const getHomeworkByStudent = (studentId) => async (dispatch) => {
    try {
        
        const { data } = await api.fetchHomeworkByStudent(studentId);
        
        dispatch({type: FETCH_HOMEWORK_BY_STUDENT, payload : data})
    }
    catch (error) {
        console.log(error.message)
    }
}


export const createHomework = (homework) => async (dispatch) => {
    try {
        const {data} = await api.createHomework(homework)
        dispatch({type: CREATE_HOMEWORK, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const updateHomework = (id, grades) => async (dispatch) => {
    try {
        const {data} = await api.updateHomework(id, grades);

        dispatch({type: UPDATE_HOMEWORK, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteHomework = (id) => async (dispatch) => {
    try {
        await api.deleteHomework(id)
        console.log('delete')
        dispatch({type: DELETE_HOMEWORK, payload : id})
    }
    catch(error) {
        console.log(error)
    }
}

