import { actionTypes } from './Categoria.actions';

const categoriasReducer = (state = {}, action) => {
    switch (action.type) {

        case actionTypes.FETCH_CATEGORIAS:
            return { list: action.payload };

        default:
            return state;
    }
}

export default categoriasReducer;