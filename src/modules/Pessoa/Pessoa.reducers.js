import { PESSOAS_PESQUISA, PESSOA_EDICAO, PESSOA_SETMODE } from './Pessoa.actions';

const pessoaReducer = (state = {}, action) => {

    switch (action.type) {

        case PESSOA_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case PESSOAS_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        case PESSOA_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        default:
            return state;

    }

}

export default pessoaReducer;