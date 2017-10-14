import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { numberFunctions } from '../../components/Number';
import { cnpjFunctions } from '../../components/CNPJ';
import { zipcodeFunctions } from '../../components/ZipCode';
import { phoneFunctions } from '../../components/Phone';

export const [ MODELOS_PESQUISA, MODELO_EDICAO, MODELO_SETMODE ] = [ "MODELOS_PESQUISA", "MODELO_EDICAO", "MODELO_SETMODE" ];

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
        dispatch({type: MODELO_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/modelos', { params: filtro })
            .then(function(response) {
                dispatch({type: MODELOS_PESQUISA, payload: response.data});

            }).catch(function(error){
                dispatch(toaster("erro-consulta-modelos", error.response.data, [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.put('/modelos', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster(null, "modelo-salvo", [], {status: "success"}));

            }).catch(function(error){
                dispatch(toaster("erro-salvar-modelo", error.response.data, [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/modelos/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "modelo-excluido", [], {status: "success"}));

            }).catch(function(error){
                dispatch(toaster("erro-excluir-modelo", error.response.data, [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/modelos/' + id)
            .then(function(response) {

                dispatch({type: MODELO_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(error){
                dispatch(toaster("erro-carga-modelo", error.response.data, [], {status: "error"}));
            });

    }
}

