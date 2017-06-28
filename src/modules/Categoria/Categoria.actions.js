import axios from "axios";

import { toaster } from "../../app/Notification.actions";

export const [ CATEGORIAS_PESQUISA, CATEGORIA_EDICAO ] = [ "CATEGORIAS_PESQUISA", "CATEGORIA_EDICAO" ];

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

