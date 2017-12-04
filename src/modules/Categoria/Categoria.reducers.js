import { actionTypes } from './Categoria.actions';

const categoriasReducer = (state = {}, action) => {
    console.log(action);
    switch (action.type) {

        case actionTypes.FETCH_CATEGORIAS:
            return { list: action.payload };

        case actionTypes.FETCH_CATEGORIA:
            return { list: state.list, active: action.payload };

        default:
            return state;
    }
}

export default categoriasReducer;