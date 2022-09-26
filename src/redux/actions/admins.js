import * as api from '../../api'
import {CREATE_ADMIN, UPDATE_ADMIN, DELETE_ADMIN, FETCH_ALL_ADMIN} from '../const/reducerConsts'

export const getAdmins = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAdmins();
        
        dispatch({type: FETCH_ALL_ADMIN, payload : data})
    }
    catch (error) {
        console.log(error.message)
    }
}

export const createAdmin = (admin) => async (dispatch) => {
    try {
        console.log(admin)
        const {data} = await api.createAdmins(admin)
        dispatch({type: CREATE_ADMIN, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const updateAdmin = (id, admin) => async (dispatch) => {
    try {
        const {data} = await api.updateAdmin(id, admin);

        dispatch({type: UPDATE_ADMIN, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteAdmin = (id) => async (dispatch) => {
    try {
        await api.deleteAdmin(id)

        dispatch({type: DELETE_ADMIN, payload : id})
    }
    catch(error) {
        console.log(error)
    }
}

