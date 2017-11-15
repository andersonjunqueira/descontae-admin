import { CIDADES_SELECT } from './SelectCidade.actions';

const selectCidadeReducer = (state = {}, action) => {

    switch (action.type) {

        case CIDADES_SELECT:
            return Object.assign({}, state, { selectList: action.payload });

        default:
            return state;

    }

}

export default selectCidadeReducer;