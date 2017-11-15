import { PLANOS_PESQUISA, PLANO_EDICAO, PLANO_SETMODE } from './Plano.actions';

const planoReducer = (state = {}, action) => {

    switch (action.type) {

        case PLANO_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case PLANOS_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        case PLANO_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        default:
            return state;

    }

}

export default planoReducer;