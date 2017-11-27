import axios from "axios";

import * as alerts from '../../components/Notification/Notification.actions';
import { PAGESIZE_DEFAULT } from '../../app/App.actions';

export const actionTypes = {
    FETCH_CATEGORIAS: 'FETCH_CATEGORIAS',
    CREATE_CATEGORIA: 'CREATE_CATEGORIA'
//    CATEGORIA_FETCH_ONE: 'CATEGORIAS_FETCHONE', 
//    CATEGORIA_SAVE: 'CATEGORIAS_SAVE', 
//    CATEGORIA_DELETE: 'CATEGORIAS_DELETE',
//    CATEGORIA_CANCEL: 'CATEGORIA_CANCEL'
}

export const fetchAll = (params) => {
    const filtro = params ? params : {};
    filtro.start = 0;
    filtro.size = PAGESIZE_DEFAULT;

    return (dispatch) => {
        axios.get('/categorias', { params: filtro })
            .then(function(response) {
                dispatch({type: actionTypes.FETCH_CATEGORIAS, payload: response.data});
            }).catch(function(error){
                alerts.notifyError("erro-consulta-categorias", null, error, dispatch);
            });
    };
}

export const create = (values) => { 
    return (dispatch) => {
        axios.post('/categorias', values)
            .then(function(response) {
                dispatch({type: actionTypes.CREATE_CATEGORIA, payload: null});
                alerts.notifySuccess("categoria-salva", null, dispatch);
            }).catch(function(error){
                alerts.notifyError("erro-salvar-categoria", null, error, dispatch);
            });
    };
}

/*


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
    }
*/

