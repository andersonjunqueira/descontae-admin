import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ CLIENTES_PESQUISA, CLIENTE_EDICAO, CLIENTE_SETMODE ] = [ "CLIENTES_PESQUISA", "CLIENTE_EDICAO", "CLIENTE_SETMODE" ];

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: CLIENTE_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/clientes', { params: filtro })
            .then(function(response) {
                dispatch({type: CLIENTES_PESQUISA, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-consulta-clientes", [], {status: "error"}));
            });

    }
}

export const salvar = (marca, callback) => {

    return dispatch => {

        axios.post('/clientes', marca)
            .then(function(response) {
                callback();
                dispatch(toaster("cliente-salvo", [], {status: "success"}));

            }).catch(function(response){
                dispatch(toaster("erro-salvar-cliente", [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/clientes/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster("cliente-excluida", [], {status: "success"}));

            }).catch(function(response){
                dispatch(toaster("erro-excluir-cliente", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/clientes/' + id)
            .then(function(response) {
                dispatch({type: CLIENTE_EDICAO, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-carga-cliente", [], {status: "error"}));
            });

    }
}

