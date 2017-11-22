import axios from "axios";

import * as alerts from '../../components/Notification/Notification.actions';

export const [ CATEGORIAS_SEARCH, CATEGORIA_LOAD ] = [ "CATEGORIAS_SEARCH", "CATEGORIA_LOAD" ];

const actions = {
    fetchAll: (filtro, start, pagesize) => (dispatch) => {
        filtro = filtro ? filtro : {};
        filtro.start = start;
        filtro.page = pagesize;

        axios.get('/categorias', { params: filtro })
            .then(function(response) {
                dispatch({type: CATEGORIAS_SEARCH, payload: response.data});
            }).catch(function(error){
                alerts.notifyError("erro-consulta-categorias", error.response.data, dispatch);
            });
    }, 

    fetchOne: (id) => (dispatch) => {
        axios.get('/categorias/' + id)
            .then(function(response) {
                dispatch({type: CATEGORIA_LOAD, payload: response.data});
            }).catch(function(error){
                alerts.notifyError("erro-carga-categoria", error.response.data, dispatch);
            });

    }, 

    add: () => (dispatch) => {
        dispatch({type: CATEGORIA_LOAD, payload: {}});
    }, 

    save: (categoria, callback) => (dispatch) => {
        axios.put('/categorias', categoria)
            .then(function(response) {
                callback();
                dispatch({type: CATEGORIA_LOAD, payload: null});
                alerts.notifySuccess("categoria-salva", null, dispatch);
            }).catch(function(error){
                alerts.notifyError("erro-salvar-categoria", error.response.data, dispatch);
            });
    }, 
    
    delete: (id, callback) => (dispatch) => {

        axios.delete('/categorias/' + id)
            .then(function(response) {
                dispatch({type: CATEGORIA_LOAD, payload: null});
                alerts.notifySuccess("categoria-excluida", null, dispatch);

            }).catch(function(error){
                alerts.notifyError("erro-excluir-categoria", error.response.data, dispatch);
            });

    }
};

export default actions;