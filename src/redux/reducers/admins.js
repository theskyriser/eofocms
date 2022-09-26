import {FETCH_ALL_ADMIN, CREATE_ADMIN, UPDATE_ADMIN, DELETE_ADMIN} from '../const/reducerConsts'

export default (admins = [], action) => {
    switch (action.type) {
        case FETCH_ALL_ADMIN:
            return action.payload
        case CREATE_ADMIN:
            return [...admins, action.payload]
        case UPDATE_ADMIN:
            return admins.map((admin) => admin._id === action.payload._id ? action.payload : admin)
        case DELETE_ADMIN:
            return admins.filter((admin) => admin._id !== action.payload)
        default:
            return admins
    }
}