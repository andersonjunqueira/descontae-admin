import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import Keycloak from "keycloak-js";

import App from './app/App';
import { login } from './app/App.actions';
import reducers from './app/App.reducers';

import { changeLanguage, DEFAULT_LANGUAGE } from './components/Intl/Intl.actions';

import appData from './app.json';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

// INTERNACIONALIZAÇÃO
store.dispatch(changeLanguage(DEFAULT_LANGUAGE, true));

if(location.hostname === "localhost") {
    appData.config.keycloakConfigFile = "/keycloak-dev.json";
    appData.config.axiosBaseURL = "http://localhost:8000/descontae-backend/api"
}

//KEYCLOAK CONFIG
let kc = Keycloak(appData.config.keycloakConfigFile);
kc.init({onLoad: 'check-sso'}).success(authenticated => {
    if (authenticated) {
        store.dispatch(login(kc, DEFAULT_LANGUAGE));
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
    }

    config.headers = {...config.headers, ...{
        Accept: 'application/json',
        Authorization: 'Bearer ' + kc.token
    }};
    return config;
});
