import { MARCAS_PESQUISA, MARCA_EDICAO, MARCA_SETMODE, MARCA_UPDATEIMAGE } from './Marca.actions';

const marcaReducer = (state = {}, action) => {

    switch (action.type) {

        case MARCA_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case MARCAS_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        case MARCA_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        case MARCA_UPDATEIMAGE:
            const nobj = Object.assign({}, state.obj, {});
            nobj[action.payload.name] = action.payload.data;
            return Object.assign({}, state, { obj: nobj });

        default:
            return state;

    }

}

export default marcaReducer;