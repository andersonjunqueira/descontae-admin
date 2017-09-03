import { OFERTAS_PESQUISA, OFERTA_EDICAO, OFERTA_SETMODE, OFERTA_EDICAO_UNIDADES } from './Oferta.actions';

const ofertaReducer = (state = {}, action) => {

    switch (action.type) {

        case OFERTA_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case OFERTAS_PESQUISA:
            return Object.assign({}, state, { registros: action.payload, obj: undefined });

        case OFERTA_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        case OFERTA_EDICAO_UNIDADES:
            return Object.assign({}, state, { unidades: action.payload });

        default:
            return state;

    }

}

export default ofertaReducer;