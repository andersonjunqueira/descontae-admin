import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { numberFunctions } from '../../components/Number';
import { cnpjFunctions } from '../../components/CNPJ';
import { zipcodeFunctions } from '../../components/ZipCode';
import { phoneFunctions } from '../../components/Phone';

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
                dispatch(toaster("erro-consulta-pessoas", [], {status: "error"}));
            });

    }
}


