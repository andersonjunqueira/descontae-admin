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

export const notify = (labelKey, msgKey, status, dispatch, error) => {
    dispatch(toaster(labelKey, msgKey, [], {status}, error));
}

export const notifySuccess = (labelKey, msgKey, dispatch) => {
    notify(null, msgKey, "success", dispatch);
}

export const notifyError = (labelKey, msgKey, error, dispatch) => {
    notify(null, msgKey, "error", dispatch, error);
}
