import {AUTH, LOGOUT, CHECKRESET, CHECKPASSWORD, UPDATE_TEACHER_CREDS} from '../const/reducerConsts'

const authReducer = (state = {authData: null, authLogin: false}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data, authLogin: true, passwordCheck: 'AUTH'}
        case CHECKRESET:
            return {...state, authData: action?.data, authLogin: true, passwordCheck: ''}
        case CHECKPASSWORD:
            return {...state, authData: action?.data?.data, authLogin: true, passwordCheck: action?.data?.passwordCheck}
        
            
        case LOGOUT:
            localStorage.clear()
            return {...state, authData: null, authLogin: false};

        default:
            return state;
        }
}

export default authReducer