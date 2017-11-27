import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import Keycloak from "keycloak-js";
import axios from "axios";

import App from './app/App';
import reducers from './app/App.reducers';
import { init, login } from './app/App.actions';

import appData from './app.json';

// CRIAÇÃO DA REDUX STORE
const store = createStore(reducers, applyMiddleware(thunk));

init(store.dispatch);

//KEYCLOAK CONFIG
let kc = Keycloak(appData.config.keycloak);
kc.init({onLoad: 'check-sso'}).success(authenticated => {
    if (authenticated) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + kc.token;
        store.dispatch(login(kc));
        ReactDOM.render(
            <Provider store={store}><App/></Provider>, 
            document.getElementById('root'));
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
