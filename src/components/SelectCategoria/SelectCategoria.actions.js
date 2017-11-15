import axios from "axios";

import { toaster } from '../Notification/Notification.actions';

export const [ CATEGORIAS_SELECT ] = [ "CATEGORIAS_SELECT" ];

export const loadCategoriasForSelect = () => {
    return dispatch => {
        axios({ url: '/categorias?sort=nome,ASC&size=1000', method: 'get', responseType: 'json' })
        .then(function(response) {
            var ret = [];
            response.data.content.forEach((p) => ret.push({ value: p.id, text: p.nome }) );
            dispatch({type: CATEGORIAS_SELECT, payload: ret});
        }).catch(function(error){
            console.log(error);
            dispatch(toaster("erro-carga-categoria", error.response.data, [], {status: "error"}));
        });

    }
}
