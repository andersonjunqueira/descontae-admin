import axios from "axios";

import * as alerts from '../../components/Notification/Notification.actions';
import { formatQs } from '../../app/App.utils';
import { fileFunctions } from "../../components/File";

export const actionTypes = {
    FETCH_ALL: 'FETCH_MARCAS',
    FETCH_ONE: 'FETCH_MARCA'
};

const BASE_URL = "/franquias";
const MODULE_CONSTANT = "marca";

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
                if(error.response.status === 404) {
                    dispatch(alerts.notifyWarning("registro-nao-encontrado"));
                    notfoundCallback();
                } else {
                    dispatch(alerts.notifyError(`erro-carga-${MODULE_CONSTANT}`, null, error));
                }
            });
    };
};

export const processImages = (obj, callback) => {
    return (dispatch) => {

        const data = Object.assign({}, obj); 
        
        let plogo = fileFunctions.getPromise(obj.logomarca).then(response => {
            if(response) {
                data.logomarca = response;
            }
        });

        let pthumb = fileFunctions.getPromise(obj.imagemThumbnail).then(response => {
            if(response) {
                data.imagemThumbnail = response;
            }
        });

        let pfundo = fileFunctions.getPromise(obj.imagemFundoApp).then(response => {
            if(response) {
                data.imagemFundoApp = response;
            }
        });

        Promise.all([plogo, pthumb, pfundo]).then(values => { 
            callback(data);
        }, reason => {
            dispatch(alerts.notifyError(`erro-salvar-${MODULE_CONSTANT}`, null, reason));
        });
    };
}; 