import { CATEGORIAS_PESQUISA, CATEGORIA_EDICAO } from './Categoria.actions';

const categoriaReducer = (state = {}, action) => {

    switch (action.type) {

        case CATEGORIAS_PESQUISA:
            return Object.assign({}, state, { registros: action.payload });

        case CATEGORIA_EDICAO:
            return Object.assign({}, state, { registro: action.payload });

        default:
            return state;

    }

}

export default categoriaReducer;