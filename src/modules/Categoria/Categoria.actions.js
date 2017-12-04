import axios from "axios";

import * as alerts from '../../components/Notification/Notification.actions';

export const actionTypes = {
    FETCH_CATEGORIAS: 'FETCH_CATEGORIAS',
    FETCH_CATEGORIA: 'FETCH_CATEGORIA'
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
            if(q[k] !== undefined) {
                qs += `${qs.length > 0 ? '&' : ''}${k}=${q[k]}`;
            }
        }
        return null;
    });
    return `${qs.length > 0 ? '?' : ''}${qs}`;
}

export const fetchAll = (params) => {
    return (dispatch) => {
        axios.get(`/categorias${formatQs(params)}`)
            .then(function(response) {

                if(response.status === 204) {
                    dispatch(alerts.notifyWarning("nenhum-registro-encontrado"));
                }
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

                dispatch(alerts.notifySuccess("categoria-excluida"));
                if(callback) {
                    callback(); 
                }

            }).catch(function(error){
                dispatch(alerts.notifyError("erro-excluir-categoria", null, error));
            });
    };
};

export const save = (categoria, callback) => { 
    return (dispatch) => {
        axios.put('/categorias', categoria)
            .then(function(response) {

                dispatch(alerts.notifySuccess("categoria-salva"));
                if(callback) {
                    callback(); 
                }

            }).catch(function(error){
                dispatch(alerts.notifyError("erro-salvar-categoria", null, error));
            });
    };
};

export const fetchOne = (id, notfoundCallback) =>  {
    return (dispatch) => {
        axios.get('/categorias/' + id)
            .then(function(response) {

                dispatch({type: actionTypes.FETCH_CATEGORIA, payload: response.data});

            }).catch(function(error){
                if(error.response.status = 404) {
                    dispatch(alerts.notifyWarning("registro-nao-encontrado"));
                    notfoundCallback();
                } else {
                    dispatch(alerts.notifyError("erro-carga-categoria", null, error));
                }
            });
    };
};