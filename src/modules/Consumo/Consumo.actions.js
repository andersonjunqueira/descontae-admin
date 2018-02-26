import axios from "axios";

import { dateFunctions } from '../../components/Date';
import { toaster } from '../../components/Notification/Notification.actions';
import { translate } from '../../components/Intl/Intl.actions';

export const [ CONSUMOS_PESQUISA, CONSUMO_EDICAO, CONSUMO_SETMODE ] = [ "CONSUMOS_PESQUISA", "CONSUMO_EDICAO", "CONSUMO_SETMODE" ];

export const consultar = (filtro, start, pagesize) => {

    let qs = '';
    if(filtro.cliente) {
        qs += `cliente=${filtro.cliente}`;
    }

    if(filtro.cidade && filtro.cidade !== translate('selecione')) {
        qs += `${qs.length > 0 ? '&' : ''}cidade=${filtro.cidade}`;
    }

    if(filtro.dataInicio) {
        qs += `${qs.length > 0 ? '&' : ''}dataInicio=${dateFunctions.toBackend(filtro.dataInicio)}`;
    }

    if(filtro.dataFim) {
        qs += `${qs.length > 0 ? '&' : ''}dataFim=${dateFunctions.toBackend(filtro.dataFim)}`;
    }

    return dispatch => {

        axios.get(`/consumos${qs.length > 0 ? '?' : ''}${qs}`)
            .then(function(response) {
                dispatch({type: CONSUMOS_PESQUISA, payload: response.data});

            }).catch(function(error){
                dispatch(toaster("erro-consulta-consumos", error.response.data, [], {status: "error"}));
            });

    }
}
