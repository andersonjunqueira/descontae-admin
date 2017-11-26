import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as notificationsReducer} from 'reapop';

import headerReducer from '../layout/Header/Header.reducers';
import sidebarReducer from '../layout/Sidebar/Sidebar.reducers';
import categoriasReducer from '../modules/Categoria/Categoria.reducers';

import selectMarcaReducer from '../components/SelectMarca/SelectMarca.reducers';
import selectCategoriaReducer from '../components/SelectCategoria/SelectCategoria.reducers';
import selectPlanoReducer from '../components/SelectPlano/SelectPlano.reducers';
import selectCidadeReducer from '../components/SelectCidade/SelectCidade.reducers';
import pesquisaPessoaReducer from '../components/PesquisaPessoa/PesquisaPessoa.reducers';
import pesquisaClienteReducer from '../components/PesquisaCliente/PesquisaCliente.reducers';

import intlReducer from '../components/Intl/Intl.reducers';
import ufReducer from '../components/UF/UF.reducers';
import marcaReducer from '../modules/Marca/Marca.reducers';
import clienteReducer from '../modules/Cliente/Cliente.reducers';
import planoReducer from '../modules/Plano/Plano.reducers';
import parceiroReducer from '../modules/Parceiro/Parceiro.reducers';
import ofertaReducer from '../modules/Oferta/Oferta.reducers';
import cartaoReducer from '../modules/Cartao/Cartao.reducers';
import pessoaReducer from '../modules/Pessoa/Pessoa.reducers';
import dashboardReducer from '../modules/Dashboard/Dashboard.reducers';
import consumoReducer from '../modules/Consumo/Consumo.reducers';

import profileReducer from '../modules/Profile/Profile.reducers';

import AppData from '../app.json';

import { PROCESS_LOGIN, LOADED_INTL } from './App.actions';

const initialState = {
    title: AppData.title, 
    subtitle: AppData.subtitle,
    language: "br"
}

const appReducer = (state = initialState, action) => {
    // console.log(action.type, action);
    switch (action.type) {
        case PROCESS_LOGIN:
            return  Object.assign({}, state, { auth: action.payload });

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
    form,
    notifications: notificationsReducer(),
    app: appReducer,
    intl: intlReducer,
    header: headerReducer,
    categorias: categoriasReducer,
    profile: profileReducer,
    sidebar: sidebarReducer,
    dashboard: dashboardReducer,
    
    consumos: consumoReducer,
    
    marcaReducer,
    clienteReducer,
    planoReducer,
    parceiroReducer,
    ofertaReducer,
    cartaoReducer,
    pesquisaPessoaReducer,
    pesquisaClienteReducer,
    pessoaReducer,
    selectMarcaReducer,
    selectCategoriaReducer,
    selectPlanoReducer,
    selectCidadeReducer,
    ufReducer
})

export default reducers;
