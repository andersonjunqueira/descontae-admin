import { actionTypes } from './Marca.actions';

export const reducer = (state = {}, action) => {

    switch (action.type) {

        case actionTypes.FETCH_ALL:
            return { list: action.payload };

        case actionTypes.FETCH_ONE:
            return { list: state.list, active: action.payload };

        default:
            return state;
    }
}
