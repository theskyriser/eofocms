import * as api from '../../api'
import {FETCH_FINANCIALS_BY_DATA, FETCH_ADMIN_TODAY_OVERVIEW, FETCH_TEACHER_TODAY_OVERVIEW} from '../const/reducerConsts'

export const getFinancialsByDate = (url) => async (dispatch) => {
    try {
        const { data } = await api.fetchFinancialsByDate(url);
      
        dispatch({type: FETCH_FINANCIALS_BY_DATA, payload : data})
    }
    catch (error) {
        console.log(error.message)
    }
}

export const getAdminTodayOverview = (url) => async (dispatch) => {
    try {
        const {data} = await api.fetchAdminTodayOverview(url)

        dispatch({type: FETCH_ADMIN_TODAY_OVERVIEW, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}


export const getTeacherTodayOverview = (url) => async (dispatch) => {
    try {
        const {data} = await api.fetchTeacherTodayOverview(url)

        dispatch({type: FETCH_TEACHER_TODAY_OVERVIEW, payload: data})
    }
    catch (error) {
        console.log(error)
    }
}