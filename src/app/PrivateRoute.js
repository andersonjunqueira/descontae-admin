import React, { Component } from "react";
import { Route } from "react-router";
import { connect } from 'react-redux';
import Keycloak from "keycloak-js";
import axios from "axios";

import { login } from './App.actions';
import { DEFAULT_LANGUAGE } from '../components/Intl/Intl.actions';
import appData from '../app.json';

class PrivateRoute extends Component {

    render() {

        if (!this.props.isLoggedIn) {

            let kc = Keycloak(appData.config.keycloakConfigFile);
            kc.init({onLoad: 'check-sso'}).success(authenticated => {
                if (authenticated) {
                    this.props.dispatch(login(kc, DEFAULT_LANGUAGE));
                } else {
                    kc.login();
                }
            });

            // AXIOS CONFIG
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

        }

        return <Route {...this.props} />

    }
}

const mapStateToProps = (state) => {
    return {
        data: state.appReducer
    }
};

PrivateRoute = connect( 
    mapStateToProps,
    {}
)(PrivateRoute);

export default PrivateRoute;

