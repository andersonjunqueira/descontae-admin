import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { numberFunctions } from '../../components/Number';
import { cnpjFunctions } from '../../components/CNPJ';
import { zipcodeFunctions } from '../../components/ZipCode';
import { phoneFunctions } from '../../components/Phone';

export const [ MODELOS_PESQUISA, MODELO_EDICAO, MODELO_SETMODE ] = [ "MODELOS_PESQUISA", "MODELO_EDICAO", "MODELO_SETMODE" ];

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
                console.log(error);
                dispatch(toaster("erro-consulta-modelos", [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.put('/modelos', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster("modelo-salvo", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-salvar-modelo", [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/modelos/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster("modelo-excluido", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-excluir-modelo", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/modelos/' + id)
            .then(function(response) {

                dispatch({type: MODELO_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-carga-modelo", [], {status: "error"}));
            });

    }
}

