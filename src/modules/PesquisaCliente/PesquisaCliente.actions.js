import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ PESQUISACLIENTE_PESQUISA ] = [ "PESQUISACLIENTE_PESQUISA" ];

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/clientes', { params: filtro })
            .then(function(response) {
                dispatch({type: PESQUISACLIENTE_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-clientes", error.response.data, [], {status: "error"}));
            });

    }
}


