import { CATEGORIAS_LOADED } from './Categoria.actions';

const categoriaReducer = (state = {}, action) => {

    switch (action.type) {

        case CATEGORIAS_LOADED:
            return action.payload;

        default:
            return state;

    }

}

export default categoriaReducer;