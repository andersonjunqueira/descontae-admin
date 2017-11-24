import { addNotification } from 'reapop';

import { translate } from "../Intl/Intl.actions";

export const toaster = (title, msg, params = [], configuration, error = undefined) => {

    const defaultConfig = {
        message: undefined,
        title: undefined,
        status: "info", 
        dismissible: true, 
        position: "tc", 
        dismissAfter: 3000
    };

    const formattedTitle = title ? translate(title) : "";
    const formatted = msg ? translate(msg, params) : "";
    const config = Object.assign(defaultConfig, {
        message: formatted,
        title: formattedTitle,
        ...configuration
    });

    if(error) {
        console.log(error);
    }

    return addNotification(config);
}

export const notify = (labelKey, msgKey, params, status, dispatch, error) => {
    dispatch(toaster(labelKey, msgKey, params, {status}, error));
}

export const notifySuccess = (labelKey, msgKey, params, dispatch) => {
    notify(labelKey, msgKey, "success", dispatch);
}

export const notifyError = (labelKey, msgKey, params, error, dispatch) => {
    notify(labelKey, msgKey, "error", dispatch, error);
}

export const notifyInfo = (labelKey, msgKey, params, dispatch) => {
    notify(labelKey, msgKey, params, "info", dispatch);
}
