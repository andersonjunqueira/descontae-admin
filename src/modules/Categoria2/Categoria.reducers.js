import { actionTypes } from './Categoria.actions';

const categoriasReducer = (state = {}, action) => {
    switch (action.type) {

        case actionTypes.FETCH_CATEGORIAS:
            return Object.assign(state, { list: action.payload });

        case actionTypes.CREATE_CATEGORIA:
            return Object.assign(state, { active: action.payload });

/*
        case actionTypes.CATEGORIAS_SET_FILTER:
            return Object.assign(state, { filter: action.payload });

        case actionTypes.CATEGORIA_FETCH_ONE:
            return Object.assign(state, { active: action.payload });


        case actionTypes.CATEGORIA_SAVE:
        case actionTypes.CATEGORIA_DELETE:
        case actionTypes.CATEGORIA_CANCEL:
            return Object.assign(state, { active: undefined });
*/
        default:
            return state;
    }
}

export default categoriasReducer;