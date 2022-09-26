import {FETCH_FINANCIALS_BY_DATA, FETCH_ADMIN_TODAY_OVERVIEW, FETCH_TEACHER_TODAY_OVERVIEW} from '../const/reducerConsts'

export default (state = {financials: {}, overview: {}}, action) => {
    switch (action.type) {
        case FETCH_FINANCIALS_BY_DATA:
            return {...state, financials: action.payload}
        case FETCH_ADMIN_TODAY_OVERVIEW:
            return {...state, overview: action.payload}
        case FETCH_TEACHER_TODAY_OVERVIEW:
            return {...state, overview: action.payload}
        default:
            return state
    }
}