import axios from "axios";

import * as alerts from '../../components/Notification/Notification.actions';

export const actionTypes = {
    FETCH_ALL: 'FETCH_CATEGORIAS',
    FETCH_ONE: 'FETCH_CATEGORIA'
};

const BASE_URL = "/categorias";
const MODULE_CONSTANT = "categoria";

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
        axios.get(`${BASE_URL}${formatQs(params)}`)
            .then(function(response) {

                if(response.status === 204) {
                    dispatch(alerts.notifyWarning("nenhum-registro-encontrado"));
                }
                dispatch({type: actionTypes.FETCH_ALL, payload: response.data});

            }).catch(function(error){
                dispatch(alerts.notifyError(`erro-consulta-${MODULE_CONSTANT}s`, null, error));
            });
    };
};

export const remove = (id, callback) => {
    return (dispatch) => {
        axios.delete(`${BASE_URL}/${id}`)
            .then(function(response) {

                dispatch(alerts.notifySuccess(`${MODULE_CONSTANT}-excluido`));
                if(callback) {
                    callback(); 
                }

            }).catch(function(error){
                dispatch(alerts.notifyError(`erro-excluir-${MODULE_CONSTANT}`, null, error));
            });
    };
};

export const save = (obj, callback) => { 
    return (dispatch) => {
        axios.put(`${BASE_URL}`, obj)
            .then(function(response) {

                dispatch(alerts.notifySuccess(`${MODULE_CONSTANT}-salvo`));
                if(callback) {
                    callback(); 
                }

            }).catch(function(error){
                dispatch(alerts.notifyError(`erro-salvar-${MODULE_CONSTANT}`, null, error));
            });
    };
};

export const fetchOne = (id, notfoundCallback) =>  {
    return (dispatch) => {
        axios.get(`${BASE_URL}/${id}`)
            .then(function(response) {

                dispatch({type: actionTypes.FETCH_ONE, payload: response.data});

            }).catch(function(error){
                if(error.response.status = 404) {
                    dispatch(alerts.notifyWarning("registro-nao-encontrado"));
                    notfoundCallback();
                } else {
                    dispatch(alerts.notifyError(`erro-carga-${MODULE_CONSTANT}`, null, error));
                }
            });
    };
};