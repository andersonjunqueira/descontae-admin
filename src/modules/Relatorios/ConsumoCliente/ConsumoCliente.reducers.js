import { CONSUMO_CLIENTE_PESSOA } from './ConsumoCliente.actions';

const consumoClienteReducer = (state = {}, action) => {

    switch (action.type) {

        case CONSUMO_CLIENTE_PESSOA:
            return Object.assign({}, state, { cliente: action.payload });

        default:
            return state;

    }

}

export default consumoClienteReducer;