import * as api from '../../api'
import {AUTH, CHECKRESET, CHECKPASSWORD,UPDATE_TEACHER, UPDATE_STUDENT, UPDATE_ADMIN} from '../const/reducerConsts'

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        
        const {data} = await api.signIn(formData)

        dispatch({type: AUTH, data})

        navigate("/main")
    }
    catch (error) {
        console.log(error)
    }
}

export const resetPasswordCheck = () => async (dispatch) => {
    try {
        console.log('RESET')
        dispatch({type: CHECKRESET, payload: ''})
    }
    catch (error) {
        console.log(error)
    }
}

export const checkPassword = (formData) => async (dispatch) => {
    try {
        
        const {data} = await api.checkPassword(formData)
       
        dispatch({type: CHECKPASSWORD, data})
    }
    catch (error) {
        console.log(error)
    }

}

export const updateCredentials = (update) => async (dispatch) => {
    
    try {
        const {data} = await api.updateCredentials(update)
        
        switch(data.type) { 
            case 'TEACHER':
                dispatch({type: UPDATE_TEACHER, payload: data.data})
                break;
            case 'STUDENT':
                dispatch({type: UPDATE_STUDENT, payload: data.data})
                break;
            case 'ADMIN':
                dispatch({type: UPDATE_ADMIN, payload: data.data})
                break;
        }
    }
    catch (error) {
        console.log(error)
    }
}