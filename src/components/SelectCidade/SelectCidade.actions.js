import axios from "axios";

import { toaster } from '../Notification/Notification.actions';

export const [ CIDADES_SELECT ] = [ "CIDADES_SELECT" ];

export const loadCidadesForSelect = () => {
    return dispatch => {
        axios({ url: '/cidades?sort=nome,ASC&size=1000', method: 'get', responseType: 'json' })
        .then(function(response) {
            var ret = [];
            response.data.content.forEach((p) => ret.push({ value: p.id, text: p.nome }) );
            dispatch({type: CIDADES_SELECT, payload: ret});
        }).catch(function(error){
            console.log(error);
            dispatch(toaster("erro-carga-cidades", error.response.data, [], {status: "error"}));
        });

    }
}
