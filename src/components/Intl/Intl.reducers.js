import { LANGUAGE_CHANGED, LANGUAGE_INIT } from './Intl.actions';

const intlReducer = (state = {}, action) => {

    switch (action.type) {

        case LANGUAGE_CHANGED:
            return Object.assign({}, state, {
                ...action.payload
            });

        case LANGUAGE_INIT:
            return Object.assign({}, state, {
                ...action.payload
            });

        default:
            return state;

    }

}

export default intlReducer;