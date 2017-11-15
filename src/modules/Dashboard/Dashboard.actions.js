import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import { dateFunctions } from '../../components/Date';

export const [ DASHBOARD_LOADED ] = [ "DASHBOARD_LOADED" ];

export const getDashboard = (idCliente, idCidade, dataInicio, dataFim) => {
    return dispatch => {

        let qs = '';
        if(idCliente) {
            qs += `idCliente=${idCliente}`;
        }

        if(idCidade) {
            qs += `${qs.length > 0 ? '&' : ''}idCidade=${idCidade}`;
        }

        if(dataInicio) {
            qs += `${qs.length > 0 ? '&' : ''}inicio=${dateFunctions.toBackend(dataInicio)}`;
        }

        if(dataFim) {
            qs += `${qs.length > 0 ? '&' : ''}inicio=${dateFunctions.toBackend(dataFim)}`;
        }

        axios.get(`/consumos/dashboard${qs.length > 0 ? '?' : ''}${qs}`)
            .then(function(response) {
                dispatch({type: DASHBOARD_LOADED, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-responsavel", error.response.data, [], {status: "error"}));
            });

    }
}
