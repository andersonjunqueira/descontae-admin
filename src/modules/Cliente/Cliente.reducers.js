import { CLIENTES_PESQUISA, CLIENTE_EDICAO, CLIENTE_SETMODE } from './Cliente.actions';

const clienteReducer = (state = {}, action) => {

    switch (action.type) {

        case CLIENTE_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case CLIENTES_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        case CLIENTE_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        default:
            return state;

    }

}

export default clienteReducer;