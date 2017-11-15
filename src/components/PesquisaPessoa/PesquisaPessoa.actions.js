import axios from "axios";

import { toaster } from '../Notification/Notification.actions';

export const [ PESQUISAPESSOA_PESQUISA ] = [ "PESQUISAPESSOA_PESQUISA" ];

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/pessoas', { params: filtro })
            .then(function(response) {
                dispatch({type: PESQUISAPESSOA_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-pessoas", error.response.data, [], {status: "error"}));
            });

    }
}


