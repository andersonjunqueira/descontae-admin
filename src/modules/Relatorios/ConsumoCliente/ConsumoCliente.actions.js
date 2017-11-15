import axios from "axios";

import { toaster } from '../../../components/Notification/Notification.actions';

export const [ CONSUMO_CLIENTE_PESSOA ] = [ "CONSUMO_CLIENTE_PESSOA" ];

export const getCliente = (idPessoa, start, pagesize) => {
    return dispatch => {

        axios.get('/clientes/pessoa')
            .then(function(response) {
                dispatch({type: CONSUMO_CLIENTE_PESSOA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-responsavel", error.response.data, [], {status: "error"}));
            });

    }
}

/*
export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/planos', { params: filtro })
            .then(function(response) {
                dispatch({type: PLANOS_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-planos", error.response.data, [], {status: "error"}));
            });

    }
}
*/
