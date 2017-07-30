import { MODELOS_PESQUISA, MODELO_EDICAO, MODELO_SETMODE } from './Modelo.actions';

const modeloReducer = (state = {}, action) => {

    switch (action.type) {

        case MODELO_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case MODELOS_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        case MODELO_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        default:
            return state;

    }

}

export default modeloReducer;