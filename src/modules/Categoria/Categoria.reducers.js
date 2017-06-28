import { CATEGORIAS_PESQUISA, CATEGORIA_EDICAO, CATEGORIAS_SETMODE } from './Categoria.actions';

const categoriaReducer = (state = {}, action) => {

    switch (action.type) {

        case CATEGORIAS_SETMODE:
            return Object.assign({}, state, { mode: action.payload });

        case CATEGORIAS_PESQUISA:
            return Object.assign({}, state, { registros: action.payload });

        case CATEGORIA_EDICAO:
            return Object.assign({}, state, { obj: action.payload });

        default:
            return state;

    }

}

export default categoriaReducer;