import { CONSUMOS_PESQUISA, CONSUMO_EDICAO, CONSUMO_SETMODE } from './Consumo.actions';

const consumoReducer = (state = {}, action) => {

    switch (action.type) {

        case CONSUMO_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case CONSUMOS_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        case CONSUMO_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        default:
            return state;

    }

}

export default consumoReducer;