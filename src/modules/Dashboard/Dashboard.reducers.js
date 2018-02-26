import { DASHBOARD_LOADED } from './Dashboard.actions';

const dashboardReducer = (state = {}, action) => {

    switch (action.type) {

        case DASHBOARD_LOADED:
            return Object.assign({}, state, action.payload);

        default:
            return state; 

    }

}

export default dashboardReducer;