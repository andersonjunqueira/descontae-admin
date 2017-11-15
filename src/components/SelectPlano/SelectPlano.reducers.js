import { PLANO_SELECT } from './SelectPlano.actions';

const planoReducer = (state = {}, action) => {

    switch (action.type) {

        case PLANO_SELECT:
            return Object.assign({}, state, { selectList: action.payload });

        default:
            return state;

    }

}

export default planoReducer;