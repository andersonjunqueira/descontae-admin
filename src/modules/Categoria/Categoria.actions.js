import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ CATEGORIAS_PESQUISA, CATEGORIA_EDICAO, CATEGORIAS_SETMODE, CATEGORIAS_SELECT ] = [ "CATEGORIAS_PESQUISA", "CATEGORIA_EDICAO", "CATEGORIAS_SETMODE", "CATEGORIAS_SELECT" ];

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: CATEGORIAS_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/categorias', { params: filtro })
            .then(function(response) {
                dispatch({type: CATEGORIAS_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-categorias", error.response.data, [], {status: "error"}));
            });

    }
}

export const salvar = (categoria, callback) => {
    return dispatch => {

        axios.put('/categorias', categoria)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "categoria-salva", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-salvar-categoria", error.response.data, [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/categorias/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "categoria-excluida", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-excluir-categoria", error.response.data, [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/categorias/' + id)
            .then(function(response) {
                dispatch({type: CATEGORIA_EDICAO, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-carga-categoria", error.response.data, [], {status: "error"}));
            });

    }
}

export const loadCategoriasForSelect = () => {
    return dispatch => {
        axios({ url: '/categorias?sort=nome,ASC&page=1000', method: 'get', responseType: 'json' })
        .then(function(response) {
            var ret = [];
            response.data.content.forEach((p) => ret.push({ value: p.id, text: p.nome }) );
            dispatch({type: CATEGORIAS_SELECT, payload: ret});
        }).catch(function(error){
            console.log(error);
            dispatch(toaster("erro-carga-categoria", error.response.data, [], {status: "error"}));
        });

    }
}
