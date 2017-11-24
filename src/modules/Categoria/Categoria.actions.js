import axios from "axios";

import * as alerts from '../../components/Notification/Notification.actions';

export const actionTypes = {
    CATEGORIAS_SET_FILTER: 'CATEGORIAS_SETFILTER',
    CATEGORIAS_FETCH_ALL: 'CATEGORIAS_FETCHALL',
    CATEGORIA_FETCH_ONE: 'CATEGORIAS_FETCHONE', 
    CATEGORIA_ADD: 'CATEGORIAS_ADD', 
    CATEGORIA_SAVE: 'CATEGORIAS_SAVE', 
    CATEGORIA_DELETE: 'CATEGORIAS_DELETE',
    CATEGORIA_CANCEL: 'CATEGORIA_CANCEL'
}

const actions = {

    setFilter: (searchArguments, orderByField, orderByDirection, startPage, pageSize) => (dispatch) => {
        dispatch({type: actionTypes.CATEGORIAS_SET_FILTER, payload: searchArguments});
    }, 

    fetchAll: (filtro, orderBy, startPage, pageSize) => (dispatch) => {
        
        filtro = filtro ? filtro : {};
        filtro.sort = orderBy;
        filtro.start = startPage;
        filtro.size = pageSize;
        console.log('fetch all');
        axios.get('/categorias', { params: filtro })
            .then(function(response) {
                dispatch({type: actionTypes.CATEGORIAS_FETCH_ALL, payload: response.data});
            }).catch(function(error){
                alerts.notifyError("erro-consulta-categorias", null, error, dispatch);
            });
    }, 

    fetchOne: (id) => (dispatch) => {
        axios.get('/categorias/' + id)
            .then(function(response) {
                dispatch({type: actionTypes.CATEGORIA_FETCH_ONE, payload: response.data});
            }).catch(function(error){
                alerts.notifyError("erro-carga-categoria", null, error, dispatch);
            });
    }, 

    add: () => (dispatch) => {
        dispatch({type: actionTypes.CATEGORIA_ADD, payload: {excluido: 'N'}});
    }, 

    save: (categoria) => (dispatch) => {
        axios.put('/categorias', categoria)
            .then(function(response) {
                dispatch({type: actionTypes.CATEGORIA_SAVE});
                dispatch(actions.fetchAll());
                alerts.notifySuccess("categoria-salva", null, dispatch);
            }).catch(function(error){
                alerts.notifyError("erro-salvar-categoria", null, error, dispatch);
            });
    }, 
    
    delete: (id) => (dispatch) => {
        axios.delete('/categorias/' + id)
            .then(function(response) {
                dispatch({type: actionTypes.CATEGORIA_DELETE});
                dispatch(actions.fetchAll());
                alerts.notifySuccess("categoria-excluida", null, dispatch);
            }).catch(function(error){
                alerts.notifyError("erro-excluir-categoria", null, error, dispatch);
            });
    },

    cancel: () => (dispatch) => {
        dispatch({type: actionTypes.CATEGORIA_CANCEL});
    }, 
};

export default actions;