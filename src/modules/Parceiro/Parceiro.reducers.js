import { PARCEIROS_PESQUISA, PARCEIRO_EDICAO, PARCEIRO_SETMODE } from './Parceiro.actions';

const parceiroReducer = (state = {}, action) => {

    switch (action.type) {

        case PARCEIRO_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case PARCEIROS_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        case PARCEIRO_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        default:
            return state;

    }

}

export default parceiroReducer;