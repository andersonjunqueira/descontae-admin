import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ OFERTAS_PESQUISA, OFERTA_EDICAO, OFERTA_SETMODE, OFERTA_EDICAO_UNIDADES ] = [ "OFERTAS_PESQUISA", "OFERTA_EDICAO", "OFERTA_SETMODE", "OFERTA_EDICAO_UNIDADES" ];

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
        dispatch({type: OFERTA_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/ofertas/simples', { params: filtro })
            .then(function(response) {
                dispatch({type: OFERTAS_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-ofertas", error.response.data, [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.put('/ofertas/dto', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster(null, "oferta-salva", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-salvar-oferta", error.response.data, [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/ofertas/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "oferta-excluida", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-excluir-oferta", error.response.data, [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/ofertas/' + id + '/dto')
            .then(function(response) {

                dispatch({type: OFERTA_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-carga-oferta", error.response.data, [], {status: "error"}));
            });

    }
}

export const carregarUnidades = (marcaId, callback) => {
    return dispatch => {

        axios.get('/unidades/marca/' + marcaId + '/dto')
            .then(function(response) {

                callback(response.data);

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-carga-unidades", error.response.data, [], {status: "error"}));
            });

    }
}

