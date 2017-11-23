import { CATEGORIAS_SEARCH, CATEGORIA_LOAD } from './Categoria.actions';

export const pesquisaCategoriaReducer = (state = {}, action) => {
    console.log(action.type)
    switch (action.type) {
        // case CATEGORIAS_SEARCH:
        //     return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

export const categoriaReducer = (state = null, action) => {
    switch (action.type) {
        case CATEGORIA_LOAD:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

