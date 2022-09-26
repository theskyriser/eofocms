import * as api from '../../api'
import {FETCHSESSIONS_BY_SEARCH, FETCH_ALL_SESSIONS, FETCH_SESSIONS_BY_PAGE, UPDATE_SESSION, FETCH_SESSIONS_FOR_CALENDAR} from '../const/reducerConsts'

    export const getSessions = () => async (dispatch) => {
        try {
            const { data } = await api.fetchSessions();
    
            dispatch({type: FETCH_ALL_SESSIONS, payload : data})
        }
        catch (error) {
            console.log(error.message)
        }
    }

    export const getSessionsByPage = (page, acc) => async (dispatch) => {
        try {
                const { data, currentPage, numberOfPages } = await api.fetchSessionsByPage(page, acc);
                dispatch({type: FETCH_SESSIONS_BY_PAGE, payload : data})
            
        }
        catch (error) {
            console.log(error.message)
        }
    }

    export const getSessionsBySearch = (searchQuery) => async (dispatch) => {
        try {
            const {data: {data}} = await api.fetchSessionsBySearch(searchQuery)

            dispatch({type: FETCHSESSIONS_BY_SEARCH, payload: data})
        }
        catch(error) {
            console.log(error)
        }
    }

    export const getSessionsForCalendar = (searchQuery) => async (dispatch) => {
        try {
            const {data} = await api.fetchSessionsForCalendar(searchQuery)

            dispatch({type: FETCH_SESSIONS_FOR_CALENDAR, payload: data})
        }
        catch(error) {
            console.log(error)
        }
    }

    export const updateSession = (id, session) => async (dispatch) => {
        try {
            
            const {data} = await api.updateSession(id, session);
           
            dispatch({type: UPDATE_SESSION, payload: data})
        }
        catch (error) {
            console.log(error)
        }
    }


export const createSession = (classes) => async (dispatch) => {
    try {
        
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteSession = (id) => async (dispatch) => {
    try {
      
    }
    catch(error) {
        console.log(error)
    }
}

