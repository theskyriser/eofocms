import {FETCH_PAYROLL_BY_SEARCH} from '../const/reducerConsts'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PAYROLL_BY_SEARCH:
            return action.payload
        default:
            return state
    }
}