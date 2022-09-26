
import { FETCH_ALL_SESSIONS, DELETE_SESSION, UPDATE_SESSION, CREATE_SESSION, FETCH_SESSIONS_BY_PAGE, FETCHSESSIONS_BY_SEARCH, FETCH_SESSIONS_FOR_CALENDAR } from '../const/reducerConsts'

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_SESSIONS:
            return action.payload
        case FETCH_SESSIONS_BY_PAGE:
            return { ...state, 
            sessions: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages
            }
        case FETCHSESSIONS_BY_SEARCH: 
            return {
                ...state,
                sessions: action.payload
            }
        case FETCH_SESSIONS_FOR_CALENDAR: 
        return {
            ...state,
            sessions: action.payload.data,
            calendar: action.payload.sessionCalendarData
        }
        case CREATE_SESSION:
            return [...state, action.payload]
        case UPDATE_SESSION:
            return {...state, sessions: state.sessions.map((session) => session._id === action.payload._id ? action.payload : session)}
        case DELETE_SESSION:
            return state.sessions.filter((session) => session._id !== action.payload)
        default:
            return state
    }
}