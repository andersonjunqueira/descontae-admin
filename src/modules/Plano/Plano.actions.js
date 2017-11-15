import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ PLANOS_PESQUISA, PLANO_EDICAO, PLANO_SETMODE ] = [ "PLANOS_PESQUISA", "PLANO_EDICAO", "PLANO_SETMODE" ];

const converter = {
    toFrontend: (values) => {
        const data = values;
        return data;
    },

    toBackend: (values) => {
        const data = values;
        return data;
    }
}

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: PLANO_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/planos', { params: filtro })
            .then(function(response) {
                dispatch({type: PLANOS_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-planos", error.response.data, [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.put('/planos', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster(null, "plano-salvo", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-salvar-plano", error.response.data, [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/planos/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "plano-excluido", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-excluir-plano", error.response.data, [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/planos/' + id)
            .then(function(response) {
                dispatch({type: PLANO_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-carga-plano", error.response.data, [], {status: "error"}));
            });

    }
}
