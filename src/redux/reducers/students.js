import {FETCH_ALL_STUDENT, CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT, FETCH_ALL_STUDENT_BY_TEACHER} from '../const/reducerConsts'

export default (students = [], action) => {
    switch (action.type) {
        case FETCH_ALL_STUDENT:
            return action.payload
        case FETCH_ALL_STUDENT_BY_TEACHER:
            return action.payload
        case CREATE_STUDENT:
            return [...students, action.payload]
        case UPDATE_STUDENT:
            console.log(action.payload)
            return students.map((student) => student._id === action.payload._id ? action.payload : student)
        case DELETE_STUDENT:
            return students.filter((student) => student._id !== action.payload)
        default:
            return students
    }
}