import { CATEGORIAS_SELECT } from './SelectProfile.actions';

const categoriaReducer = (state = {}, action) => {

    switch (action.type) {

        case CATEGORIAS_SELECT:
            return Object.assign({}, state, { selectList: action.payload });

        default:
            return state;

    }

}

export default categoriaReducer;