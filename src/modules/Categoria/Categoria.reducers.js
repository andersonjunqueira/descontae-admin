import { actionTypes } from './Categoria.actions';

export const pesquisaCategoriaReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.CATEGORIAS_SEARCH:
            return action.payload;
        default:
            return state;
    }
}

export const categoriaReducer = (state = null, action) => {
    switch (action.type) {
        case actionTypes.CATEGORIA_LOAD:
        case actionTypes.CATEGORIA_NEW:
            return action.payload;

        case actionTypes.CATEGORIA_SAVE:
        case actionTypes.CATEGORIA_DELETE:
        case actionTypes.CATEGORIA_CANCEL:
            return null;

        default:
            return state;
    }
}

