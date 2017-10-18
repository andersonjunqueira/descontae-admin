import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { numberFunctions } from '../../components/Number';
import { cnpjFunctions } from '../../components/CNPJ';
import { zipcodeFunctions } from '../../components/ZipCode';
import { phoneFunctions } from '../../components/Phone';

export const [ PESSOAS_PESQUISA, PESSOA_EDICAO, PESSOA_SETMODE ] = [ "PESSOAS_PESQUISA", "PESSOA_EDICAO", "PESSOA_SETMODE" ];

const converter = {
    toFrontend: (values) => {

        const data = JSON.parse(JSON.stringify(values));
        return data;

    },

    toBackend: (values) => {

        const data = JSON.parse(JSON.stringify(values));
        return data;

    }
}

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: PESSOA_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/pessoas', { params: filtro })
            .then(function(response) {
                dispatch({type: PESSOAS_PESQUISA, payload: response.data});

            }).catch(function(error){
                dispatch(toaster("erro-consulta-pessoas", error.response.data, [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.put('/pessoas', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster(null, "pessoa-salva", [], {status: "success"}));

            }).catch(function(error){
                dispatch(toaster("erro-salvar-pessoa", error.response.data, [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/pessoas/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "pessoa-excluida", [], {status: "success"}));

            }).catch(function(error){
                dispatch(toaster("erro-excluir-pessoa", error.response.data, [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/pessoas/' + id)
            .then(function(response) {

                dispatch({type: PESSOA_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(error){
                dispatch(toaster("erro-carga-pessoa", error.response.data, [], {status: "error"}));
            });

    }
}

