import { addNotification } from 'reapop';

import { translate } from "../Intl/Intl.actions";

export const toaster = (title, msg, params = [], configuration) => {

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

    // console.log({ status: configuration.status, title, msg });
    return addNotification(config);
}

export const notify = (labelKey, msgKey, status, dispatch) => {
    dispatch(toaster(labelKey, msgKey, [], {status}));
}

export const notifySuccess = (labelKey, msgKey, dispatch) => {
    notify(null, msgKey, "success", dispatch);
}

export const notifyError = (labelKey, msgKey, dispatch) => {
    notify(null, msgKey, "error", dispatch);
}
