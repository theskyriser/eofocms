import * as api from '../../api'
import {FETCH_PAYROLL_BY_SEARCH} from '../const/reducerConsts'

export const getPayrollBySearch = (url) => async (dispatch) => {
    try {
        const { data } = await api.fetchPayrollBySearch(url);
      
 
        dispatch({type: FETCH_PAYROLL_BY_SEARCH, payload : data})
    }
    catch (error) {
        console.log(error.message)
    }
}