import { MARCA_SELECT } from './SelectMarca.actions';

const selectMarcaReducer = (state = {}, action) => {

    switch (action.type) {

        case MARCA_SELECT:
            return Object.assign({}, state, { selectList: action.payload });

        default:
            return state;
    }
}

export default selectMarcaReducer;