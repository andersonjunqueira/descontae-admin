import axios from "axios";

import { toaster } from "../../app/Notification.actions";

export const [ CATEGORIAS_PESQUISA, CATEGORIA_EDICAO, CATEGORIAS_SETMODE ] = [ "CATEGORIAS_PESQUISA", "CATEGORIA_EDICAO", "CATEGORIAS_SETMODE" ];

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: CATEGORIAS_SETMODE, payload: mode});
    }
}

export const consultar = (filtro) => {
    return dispatch => {

        axios.get('/categorias', { params: filtro })
            .then(function(response) {
                dispatch({type: CATEGORIAS_PESQUISA, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-carga-categorias", [], {status: "error"}));
            });

    }
}

export const salvar = (categoria) => {
    return dispatch => {

        axios.post('/categorias', categoria)
            .then(function(response) {
                dispatch(toaster("categoria-salva", [], {status: "success"}));

            }).catch(function(response){
                dispatch(toaster("erro-carga-categoria", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/categorias', { params: {id: id} })
            .then(function(response) {
                dispatch({type: CATEGORIA_EDICAO, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-carga-categoria", [], {status: "error"}));
            });

    }
}

