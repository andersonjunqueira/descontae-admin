import axios from "axios";

import { toaster } from '../Notification/Notification.actions';

export const [ PLANO_SELECT ] = [ "PLANO_SELECT" ];

export const loadPlanosForSelect = () => {
    return dispatch => {
        axios({ url: '/planos?sort=titulo,ASC&page=1000', method: 'get', responseType: 'json' })
        .then(function(response) {
            var ret = [];
            response.data.content.forEach((p) => ret.push({ value: p.id, text: p.titulo }) );
            dispatch({type: PLANO_SELECT, payload: ret});
        }).catch(function(error){
            console.log(error);
            dispatch(toaster("erro-carga-plano", error.response.data, [], {status: "error"}));
        });

    }
}