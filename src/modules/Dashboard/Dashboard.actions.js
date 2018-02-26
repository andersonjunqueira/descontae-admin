import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import { dateFunctions } from '../../components/Date';
import { translate } from '../../components/Intl/Intl.actions';

export const [ DASHBOARD_LOADED ] = [ "DASHBOARD_LOADED" ];

const converter = {
    toFrontend: (values) => {
        const data = JSON.parse(JSON.stringify(values));
        data.dataInicio = dateFunctions.toFrontend(data.dataInicio);
        data.dataFim = dateFunctions.toFrontend(data.dataFim);
        return data;
    }
}

export const loadDashboard = (idCliente, idCidade, dataInicio, dataFim) => {
    return dispatch => {

        let qs = '';
        if(idCliente) {
            qs += `idCliente=${idCliente}`;
        }

        if(idCidade && idCidade !== translate('selecione')) {
            qs += `${qs.length > 0 ? '&' : ''}idCidade=${idCidade}`;
        }

        if(dataInicio) {
            qs += `${qs.length > 0 ? '&' : ''}inicio=${dateFunctions.toBackend(dataInicio)}`;
        }

        if(dataFim) {
            qs += `${qs.length > 0 ? '&' : ''}inicio=${dateFunctions.toBackend(dataFim)}`;
        }

        return axios.get(`/consumos/dashboard${qs.length > 0 ? '?' : ''}${qs}`)
            .then(function(response) {
                dispatch({type: DASHBOARD_LOADED, payload: converter.toFrontend(response.data)});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-responsavel", error.response.data, [], {status: "error"}));
            });

    }
}
