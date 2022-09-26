import * as api from '../../api'
import {FETCH_ALL_CLASS, FETCH_ALL_CLASS_BY_SEARCH, CREATE_CLASS, DELETE_CLASS, UPDATE_CLASS} from '../const/reducerConsts'

export const getClasses = () => async (dispatch) => {
    try {
        const { data } = await api.fetchClasses();
 
        dispatch({type: FETCH_ALL_CLASS, payload : data})
    }
    catch (error) {
        console.log(error.message)
    }
}

export const getClassesBySearch = (url) => async (dispatch) => {
    try {
        const { data: data } = await api.fetchClassesBySearch(url);

        

        dispatch({type: FETCH_ALL_CLASS_BY_SEARCH, payload : data.data})
    }
    catch (error) {
        console.log(error.message)
    }
}

export const createClass = (classes) => async (dispatch) => {
    try {
        console.log('at action')
        const {data} = await api.createClass(classes)
        dispatch({type: CREATE_CLASS, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const updateClass = (id, classes) => async (dispatch) => {
    try {
        const {data} = await api.updateClass(id, classes);

        dispatch({type: UPDATE_CLASS, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteClass = (id) => async (dispatch) => {
    try {
        await api.deleteClass(id)

        dispatch({type: DELETE_CLASS, payload : id})
    }
    catch(error) {
        console.log(error)
    }
}

