const initialState = {
    isClicked: {
    chat:false,
    cart: false,
    userProfile: false,
    notification: false,
    },
    activeMenu: true,
    screenSize: null,
    currentColor: '#03C9D7',
    currentMode: 'Light',
    themeSettings: false
}

const appStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ISCLICKED': 
        return {...state, isClicked: action.payload}
        case 'ACTIVEMENU':
        return {...state, activeMenu: action.payload}
        case 'SCREENSIZE':
        return {...state, screenSize: action.payload}
        case 'SETCOLOR':
            return {...state, currentColor: action.payload}
        case 'SETMODE':
            return {...state, currentMode: action.payload}
        case 'SETTHEMESETTINGS':
            (action.payload)
            return {...state, themeSettings: action.payload}
        default: 
        return {...state}
    }
}



export default appStateReducer;