import { addNotification as notify } from 'reapop';

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
    const formatted = translate(msg, params);
    const config = Object.assign(defaultConfig, {
        message: formatted,
        title: formattedTitle,
        ...configuration
    });

    return notify(config);
}
