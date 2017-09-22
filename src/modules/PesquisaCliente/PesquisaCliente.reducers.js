import { PESQUISACLIENTE_PESQUISA } from './PesquisaCliente.actions';

const pesquisaClienteReducer = (state = {}, action) => {

    switch (action.type) {

        case PESQUISACLIENTE_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        default:
            return state;

    }

}

export default pesquisaClienteReducer;