import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ REVISTAS_PESQUISA, REVISTA_EDICAO, REVISTA_SETMODE ] = [ "REVISTAS_PESQUISA", "REVISTA_EDICAO", "REVISTA_SETMODE" ];

const converter = {
    toFrontend: (values) => {

        const data = Object.assign({}, values, {});
        return data;

    },

    toBackend: (values) => {

        const data = Object.assign({}, values, {});
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

            }).catch(function(response){
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

            }).catch(function(response){
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

            }).catch(function(response){
                dispatch(toaster("erro-excluir-revista", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/revistas/' + id)
            .then(function(response) {

                dispatch({type: REVISTA_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(response){
                dispatch(toaster("erro-carga-revista", [], {status: "error"}));
            });

    }
}

