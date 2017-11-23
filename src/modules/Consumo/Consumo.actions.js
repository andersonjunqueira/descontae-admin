import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ CONSUMOS_PESQUISA, CONSUMO_EDICAO, CONSUMO_SETMODE ] = [ "CONSUMOS_PESQUISA", "CONSUMO_EDICAO", "CONSUMO_SETMODE" ];

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/consumos', { params: filtro })
            .then(function(response) {
                dispatch({type: CONSUMOS_PESQUISA, payload: response.data});

            }).catch(function(error){
                dispatch(toaster("erro-consulta-consumos", error.response.data, [], {status: "error"}));
            });

    }
}
