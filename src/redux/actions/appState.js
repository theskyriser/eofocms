import { ISCLICKED, ACTIVEMENU, SCREENSIZE, SETCOLOR, SETTHEMESETTINGS, SETMODE} from "../const/reducerConsts"

const initialState = {
    chat:false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const isClickedAction = (clicked) => (dispatch) => {
    dispatch({type: ISCLICKED, payload: {...initialState, [clicked]: true}})
}

export const activeMenuAction = (value) => (dispatch) => {
    dispatch({type: ACTIVEMENU, payload: value})
}

export const setScreenSizeAction = (value) => (dispatch) => {
    dispatch({type: SCREENSIZE, payload: value})
}

export const setCurrentColorAction = (color) => (dispatch) => {
    localStorage.setItem('colorMode', color)
    dispatch({type: SETCOLOR, payload: color})
    dispatch({type: SETTHEMESETTINGS, payload: false})
}

export const setCurrentModeAction = (e) => (dispatch) => {
    localStorage.setItem('themeMode', e.target.value)
    dispatch({type: SETMODE, payload: e.target.value})
    dispatch({type: SETTHEMESETTINGS, payload: false})
}

export const setThemeSettingsAction = (value) => (dispatch) => {
    dispatch({type: SETTHEMESETTINGS, payload: value})
}