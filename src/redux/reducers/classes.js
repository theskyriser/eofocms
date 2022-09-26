
import {FETCH_ALL_CLASS, FETCH_ALL_CLASS_BY_SEARCH, CREATE_CLASS, UPDATE_CLASS, DELETE_CLASS,} from '../const/reducerConsts'

export default (classes = [], action) => {
    switch (action.type) {
        case FETCH_ALL_CLASS:
            return action.payload
        case FETCH_ALL_CLASS_BY_SEARCH:
            return action.payload;
        case CREATE_CLASS:
            return [...classes, action.payload]
        case UPDATE_CLASS:
            return classes.map((classes) => classes._id === action.payload._id ? action.payload : classes)
        case DELETE_CLASS:
            return classes.filter((classes) => classes._id !== action.payload)
        default:
            return classes
    }
}