import { CATEGORIAS_SEARCH, CATEGORIA_LOAD } from './Categoria.actions';

export const pesquisaCategoriaReducer = (state = [], action) => {
    switch (action.type) {
        case CATEGORIAS_SEARCH:
            return Object.assign({}, state, action.payload);
    }
    return state;
}

export const categoriaReducer = (state = null, action) => {
    switch (action.type) {
        case CATEGORIA_LOAD:
            return Object.assign({}, state, action.payload);
    }
    return state;
}

