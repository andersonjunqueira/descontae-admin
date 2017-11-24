export const [ LOADED_SIDEBAR_MENU ] = [ "LOADED_SIDEBAR_MENU" ];

export const sidebarMenuLoad = (menuData) => {
    return dispatch => {
        dispatch({type: LOADED_SIDEBAR_MENU, payload: menuData});
    }
}