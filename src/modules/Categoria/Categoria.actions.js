import axios from "axios";

import * as alerts from '../../components/Notification/Notification.actions';

export const actionTypes = {
    FETCH_CATEGORIAS: 'FETCH_CATEGORIAS',
    DELETE_CATEGORIAS: 'DELETE_CATEGORIAS'
};

const formatQs = (q) => {
    if(!q) {
        return '';
    }
    let qs = '';
    Object.keys(q).map( k => {

        if( k === 'sort' ) {
            q[k].forEach(item => {
                qs += `${qs.length > 0 ? '&' : ''}sort=${item}`;
            });
        } else if( k === 'dir' ) {
            q[k].forEach( (item, index) => {
                qs += `${qs.length > 0 ? '&' : ''}${q.sort[index]}.dir=${item}`;    
            });
        } else {
            if(q[k] != undefined) {
                qs += `${qs.length > 0 ? '&' : ''}${k}=${q[k]}`;
            }
        }

    });
    return `${qs.length > 0 ? '?' : ''}${qs}`;
}

export const fetchAll = (params) => {

    return (dispatch) => {
        axios.get(`/categorias${formatQs(params)}`)
            .then(function(response) {

                dispatch({type: actionTypes.FETCH_CATEGORIAS, payload: response.data});

            }).catch(function(error){
                dispatch(alerts.notifyError("erro-consulta-categorias", null, error));
            });
    };
};

export const remove = (id, callback) => {
    return (dispatch) => {
        axios.delete('/categorias/' + id)
            .then(function(response) {

                dispatch({type: actionTypes.DELETE_CATEGORIAS});
                callback();

                dispatch(alerts.notifySuccess("categoria-excluida", null, null));
            }).catch(function(error){
                dispatch(alerts.notifyError("erro-excluir-categoria", null, error));
            });
    };
};