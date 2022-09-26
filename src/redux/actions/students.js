import * as api from '../../api'
import {CREATE_STUDENT, DELETE_STUDENT, FETCH_ALL_STUDENT, UPDATE_STUDENT, FETCH_ALL_STUDENT_BY_TEACHER} from '../const/reducerConsts'

export const getStudents = () => async (dispatch) => {
    try {
        const { data } = await api.fetchStudents();
        
        
        dispatch({type: FETCH_ALL_STUDENT, payload : data})
    }
    catch (error) {
        console.log(error.message)
    }
}

export const getStudentsByTeacher = (teacherId) => async (dispatch) => {
    try {
        const { data } = await api.fetchStudentsByTeacher(teacherId);
        console.log(data)
        
        dispatch({type: FETCH_ALL_STUDENT_BY_TEACHER, payload : data})
    }
    catch (error) {
        console.log(error.message)
    }
}

export const createStudent = (student) => async (dispatch) => {
    try {
        const {data} = await api.createStudent(student)

        dispatch({type: CREATE_STUDENT , payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const updateStudent = (id, student) => async (dispatch) => {
    try {
        const {data} = await api.updateStudent(id, student);

        dispatch({type: UPDATE_STUDENT, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteStudent = (id) => async (dispatch) => {
    try {
        await api.deleteStudent(id)

        dispatch({type: DELETE_STUDENT, payload : id})
    }
    catch(error) {
        console.log(error)
    }
}

