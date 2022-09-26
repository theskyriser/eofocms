import * as api from '../../api'
import {CREATE_GRADE, DELETE_GRADES, FETCH_ALL_GRADES, UPDATE_GRADES, FETCH_GRADES_BY_STUDENT} from '../const/reducerConsts'

export const getGrades = () => async (dispatch) => {
    try {
        const { data } = await api.fetchGrades();
 
        dispatch({type: FETCH_ALL_GRADES, payload : data})
    }
    catch (error) {
        console.log(error.message)
    }
}

export const getGradesByStudent = (studentId) => async (dispatch) => {
    try {
        
        const { data } = await api.fetchGradesByStudent(studentId);
        
        
        dispatch({type: FETCH_GRADES_BY_STUDENT, payload : data})
    }
    catch (error) {
        console.log(error.message)
    }
}


export const createGrades = (grades, selectedStudent) => async (dispatch) => {
    try {
        console.log('h')
        const {data} = await api.createGrades(grades, selectedStudent)
        dispatch({type: CREATE_GRADE, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const updateGrades = (id, grades) => async (dispatch) => {
    try {
        const {data} = await api.updateGrades(id, grades);

        dispatch({type: UPDATE_GRADES, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteGrades = (id) => async (dispatch) => {
    try {
        await api.deleteGrades(id)
        console.log('delete')
        dispatch({type: DELETE_GRADES, payload : id})
    }
    catch(error) {
        console.log(error)
    }
}

