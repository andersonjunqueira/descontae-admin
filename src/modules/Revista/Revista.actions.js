import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { dateFunctions } from '../../components/Date';

export const [ REVISTAS_PESQUISA, REVISTA_EDICAO, REVISTA_SETMODE ] = [ "REVISTAS_PESQUISA", "REVISTA_EDICAO", "REVISTA_SETMODE" ];

//TODO REMOVER ESSAS FUNÇÕES DE CONVERSÃO DE DATA
const converter = {
    toFrontend: (values) => {
        const data = Object.assign({}, values, {});
        data.inicioVigencia = dateFunctions.toFrontend(data.inicioVigencia);
        data.fimVigencia = dateFunctions.toFrontend(data.fimVigencia);
        return data;
    },

    ofertasToFrontend: (values) => {
        const data = Object.assign({}, values, {});
        let arr = Object.keys(data).map(function (key) { return data[key]; });
        return arr;
    }, 

    toBackend: (values) => {
        const data = Object.assign({}, values, {});
        data.inicioVigencia = dateFunctions.toBackend(data.inicioVigencia);
        data.fimVigencia = dateFunctions.toBackend(data.fimVigencia);
        return data;
    }
}

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: REVISTA_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/revistas', { params: filtro })
            .then(function(response) {
                dispatch({type: REVISTAS_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-revistas", [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.post('/revistas', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster("revista-salva", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-salvar-revista", [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/revistas/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster("revista-excluida", [], {status: "success"}));

            }).catch(function(error){
                dispatch(toaster("erro-excluir-revista", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/revistas/' + id)
            .then(function(responseR) {
                const payload = converter.toFrontend(responseR.data);

                axios.get('/revistas/' + id + "/ofertas")
                    .then(function(responseO) {

                        payload.ofertas = converter.ofertasToFrontend(responseO.data);
                        dispatch({type: REVISTA_EDICAO, payload: payload});

                    }).catch(function(error){
                        console.log(error);
                        dispatch(toaster("erro-carga-revista", [], {status: "error"}));
                    });

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-carga-revista", [], {status: "error"}));
            });

    }
}

