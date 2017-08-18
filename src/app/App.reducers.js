import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as notificationsReducer} from 'reapop';

import ufReducer from '../components/UF/UF.reducers';
import intlReducer from '../components/Intl/Intl.reducers';
import sidebarReducer from '../components/Sidebar/Sidebar.reducers';
import headerReducer from '../components/Header/Header.reducers';
import categoriaReducer from '../modules/Categoria/Categoria.reducers';
import marcaReducer from '../modules/Marca/Marca.reducers';
import clienteReducer from '../modules/Cliente/Cliente.reducers';
import planoReducer from '../modules/Plano/Plano.reducers';
import parceiroReducer from '../modules/Parceiro/Parceiro.reducers';
import revistaReducer from '../modules/Revista/Revista.reducers';

import profileReducer from '../modules/Profile/Profile.reducers';

import AppData from '../app.json';

import { PROCESS_LOGIN, LOADED_INTL } from './App.actions';

const initialState = {
    title: AppData.title, 
    subtitle: AppData.subtitle,
    language: "br"
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case PROCESS_LOGIN:
            return  Object.assign({}, state, {
                auth: action.payload
            });

        case LOADED_INTL:
            return  Object.assign({}, state, {
                intlStrings: action.payload,
                language: action.language
            });

        default:
            return state;
    }
}

const reducers = combineReducers({
    profileReducer,
    categoriaReducer,
    marcaReducer,
    clienteReducer,
    planoReducer,
    parceiroReducer,
    revistaReducer,

    ufReducer,
    intlReducer,
    sidebarReducer,
    headerReducer,
    appReducer,
    notifications: notificationsReducer(),
    form
})

export default reducers;
