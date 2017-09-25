import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ CARTOES_PESQUISA, CARTAO_EDICAO, CARTAO_SETMODE ] = [ "CARTOES_PESQUISA", "CARTAO_EDICAO", "CARTAO_SETMODE" ];

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
        dispatch({type: CARTAO_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/cartoes', { params: filtro })
            .then(function(response) {
                dispatch({type: CARTOES_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-cartoes", error.response.data, [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.put('/cartoes', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster(null, "cartao-salvo", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-salvar-cartao", error.response.data, [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/cartoes/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "cartao-excluido", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-excluir-cartao", error.response.data, [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/cartoes/' + id)
            .then(function(response) {

                dispatch({type: CARTAO_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-carga-cartao", error.response.data, [], {status: "error"}));
            });

    }
}

