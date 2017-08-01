import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ MARCAS_PESQUISA, MARCA_EDICAO, MARCA_SETMODE, MARCA_SELECT ] = [ "MARCAS_PESQUISA", "MARCA_EDICAO", "MARCA_SETMODE", "MARCA_SELECT" ];

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: MARCA_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/franquias', { params: filtro })
            .then(function(response) {
                dispatch({type: MARCAS_PESQUISA, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-consulta-marcas", [], {status: "error"}));
            });

    }
}

export const salvar = (marca, callback) => {
    return dispatch => {

        axios.post('/franquias', marca)
            .then(function(response) {
                callback();
                dispatch(toaster("marca-salva", [], {status: "success"}));

            }).catch(function(response){
                dispatch(toaster("erro-salvar-marca", [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/franquias/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster("marca-excluida", [], {status: "success"}));

            }).catch(function(response){
                dispatch(toaster("erro-excluir-marca", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/franquias/' + id)
            .then(function(response) {
                dispatch({type: MARCA_EDICAO, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-carga-marca", [], {status: "error"}));
            });

    }
}

export const loadFranquiasForSelect = () => {
    return dispatch => {
        axios({ url: '/franquias?sort=nome,ASC&page=1000', method: 'get', responseType: 'json' })
        .then(function(response) {
            var ret = [];
            response.data.content.forEach((p) => ret.push({ value: p.id, text: p.nome }) );
            dispatch({type: MARCA_SELECT, payload: ret});
        }).catch(function(response){
        });

    }
}