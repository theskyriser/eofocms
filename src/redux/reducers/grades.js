import {FETCH_ALL_GRADES, CREATE_GRADE, UPDATE_GRADES, DELETE_GRADES, FETCH_GRADES_BY_STUDENT,} from '../const/reducerConsts'

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_GRADES:
            return {...state, grades: action.payload}
        case FETCH_GRADES_BY_STUDENT:
            return action.payload;
        case CREATE_GRADE:
            return [...state, action.payload]
        case UPDATE_GRADES:
            return {...state, grades: state.grades.map((grade) => grade._id === action.payload._id ? action.payload : grade)}
        case DELETE_GRADES:
            return state.grades.filter((grade) => grade._id !== action.payload)
        default:
            return state
    }
}