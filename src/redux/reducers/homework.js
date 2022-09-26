import { CREATE_HOMEWORK, DELETE_HOMEWORK, FETCH_ALL_HOMEWORK, FETCH_HOMEWORK_BY_STUDENT, UPDATE_HOMEWORK } from '../const/reducerConsts'

export default (state = {homeworks: [], latestHomework: {}}, action) => {
    switch (action.type) {
        case FETCH_ALL_HOMEWORK:
            console.log('fetch')
            return {...state, homeworks: action.payload.homework, latestHomework: action.payload.latestHomework}
        case FETCH_HOMEWORK_BY_STUDENT:
            return action.payload;
        case CREATE_HOMEWORK:
            return {...state, homeworks: [...state.homeworks, action.payload]}
        case UPDATE_HOMEWORK:
            return {...state, homeworks: state.homeworks.map((homework) => homework._id === action.payload._id ? action.payload : homework)}
        case DELETE_HOMEWORK:
            return {...state, homeworks: state.homeworks.filter((homework) => homework._id !== action.payload)}
        default:
            return state
    }
}