export const [ LOADED_HEADER_MENU, LOADED_USER_MENU ] = [ "LOADED_HEADER_MENU", "LOADED_USER_MENU" ];

export const headerMenuLoad = (headerMenu) => {
    return dispatch => {
        dispatch({type: LOADED_HEADER_MENU, payload: headerMenu });
    }
}

export const userMenuLoad = (userMenu) => {
    return dispatch => {
        dispatch({type: LOADED_USER_MENU, payload: userMenu});
    }
}