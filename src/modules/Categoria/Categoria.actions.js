import axios from "axios";

import { toaster } from "../../app/Notification.actions";

export const [ CATEGORIAS_PESQUISA ] = [ "CATEGORIAS_PESQUISA", "CATEGORIAS_" ];

export const consultar = (filtro) => {
    return dispatch => {

        axios.get('/categorias', { params: filtro })
            .then(function(response) {
                dispatch({type: CATEGORIAS_LOADED, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-carga-categorias", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/categorias', { params: {id: id} })
            .then(function(response) {
                dispatch({type: CATEGORIAS_LOADED, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-carga-categorias", [], {status: "error"}));
            });

    }
}

