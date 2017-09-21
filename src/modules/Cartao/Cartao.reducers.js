import { CARTOES_PESQUISA, CARTAO_EDICAO, CARTAO_SETMODE } from './Cartao.actions';

const cartaoReducer = (state = {}, action) => {

    switch (action.type) {

        case CARTAO_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case CARTOES_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        case CARTAO_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        default:
            return state;

    }

}

export default cartaoReducer;