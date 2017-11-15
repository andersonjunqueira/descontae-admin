import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';

export const [ MARCA_SELECT ] = [ "MARCA_SELECT" ];

export const loadFranquiasForSelect = () => {
    return dispatch => {
        axios({ url: '/franquias?sort=nome,ASC&size=1000', method: 'get', responseType: 'json' })
        .then(function(response) {
            var ret = [];
            response.data.content.forEach((p) => ret.push({ value: p.id, text: p.nome }) );
            dispatch({type: MARCA_SELECT, payload: ret});
        }).catch(function(error){
            console.log(error);
            dispatch(toaster("erro-carga-marca", error.response.data, [], {status: "error"}));
        });

    }
}