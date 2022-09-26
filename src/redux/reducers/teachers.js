import {FETCH_ALL_TEACHERS, CREATE_TEACHER, UPDATE_TEACHER, DELETE_TEACHER} from '../const/reducerConsts'

export default (teachers = [], action) => {
    switch (action.type) {
        case FETCH_ALL_TEACHERS:
            return action.payload
        case CREATE_TEACHER:
            return [...teachers, action.payload]
        case UPDATE_TEACHER:
            console.log('update')
            return teachers.map((teacher) => teacher._id === action.payload._id ? action.payload : teacher)
        case DELETE_TEACHER:
            return teachers.filter((teacher) => teacher._id !== action.payload)
        default:
            return teachers
    }
}