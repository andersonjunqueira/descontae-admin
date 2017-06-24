import axios from "axios";

import { toaster } from "../../app/Notification.actions";

export const [ CATEGORIAS_LOADED ] = [ "CATEGORIAS_LOADED" ];

export const loadCategorias = () => {
    return dispatch => {

        axios.post('/categorias')
            .then(function(response) {
                dispatch({type: CATEGORIAS_LOADED, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-carga-categorias", [], {status: "error"}));
            });

    }
}

