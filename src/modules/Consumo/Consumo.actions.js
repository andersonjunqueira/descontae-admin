import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { numberFunctions } from '../../components/Number';
import { cnpjFunctions } from '../../components/CNPJ';
import { zipcodeFunctions } from '../../components/ZipCode';
import { phoneFunctions } from '../../components/Phone';

export const [ CONSUMOS_PESQUISA, CONSUMO_EDICAO, CONSUMO_SETMODE ] = [ "CONSUMOS_PESQUISA", "CONSUMO_EDICAO", "CONSUMO_SETMODE" ];

const converter = {
    toFrontend: (values) => {
        const data = JSON.parse(JSON.stringify(values));
        return data;
    },

    toBackend: (values) => {
        const data = JSON.parse(JSON.stringify(values));
        return data;
    }
}

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: CONSUMO_SETMODE, payload: mode});
    }
}

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
