import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import Keycloak from "keycloak-js";

import App from './app/App';
import reducers from './app/App.reducers';

import { login } from './app/App.actions';
import { initLanguage } from './components/Intl/Intl.actions';

import appData from './app.json';
import intlData from './intl.json';

// CRIAÇÃO DA REDUX STORE
const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

// INTERNACIONALIZAÇÃO
store.dispatch(initLanguage(intlData));

//KEYCLOAK CONFIG
let kc = Keycloak(appData.config.keycloak);
kc.init({onLoad: 'check-sso'}).success(authenticated => {
    if (authenticated) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + kc.token;
        store.dispatch(login(kc));
        ReactDOM.render(<App store={store}/>, document.getElementById('root'));
    } else {
        kc.login();
    }
});

// AXIOS CONFIG
axios.defaults.baseURL = appData.config.axiosBaseURL;

axios.interceptors.request.use(config => {
    if(kc.isTokenExpired()) {
        kc.updateToken(1000*60*25).error(() => kc.logout());
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + kc.token;
    }
    return config;
});
