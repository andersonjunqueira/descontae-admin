import { PESQUISAPESSOA_PESQUISA } from './PesquisaPessoa.actions';

const pesquisaPessoaReducer = (state = {}, action) => {

    switch (action.type) {

        case PESQUISAPESSOA_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        default:
            return state;

    }

}

export default pesquisaPessoaReducer;