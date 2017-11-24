import axios from "axios";


import * as alerts from '../../components/Notification/Notification.actions';

export const actionTypes = {
    CATEGORIAS_SEARCH: 'CATEGORIAS_SEARCH',
    CATEGORIA_LOAD: 'CATEGORIAS_LOAD', 
    CATEGORIA_NEW: 'CATEGORIAS_NEW', 
    CATEGORIA_SAVE: 'CATEGORIAS_SAVE', 
    CATEGORIA_DELETE: 'CATEGORIAS_DELETE',
    CATEGORIA_CANCEL: 'CATEGORIA_CANCEL'
}

const actions = {
    fetchAll: (filtro, startPage, pagesize) => (dispatch) => {
        filtro = filtro ? filtro : {};
        filtro.sort = "nome,ASC";
        filtro.start = startPage;
        filtro.size = pagesize;
        axios.get('/categorias', { params: filtro })
            .then(function(response) {
                dispatch({type: actionTypes.CATEGORIAS_SEARCH, payload: response.data});
            }).catch(function(error){
                alerts.notifyError("erro-consulta-categorias", null, error, dispatch);
            });
    }, 

    fetchOne: (id) => (dispatch) => {
        axios.get('/categorias/' + id)
            .then(function(response) {
                dispatch({type: actionTypes.CATEGORIA_LOAD, payload: response.data});
            }).catch(function(error){
                alerts.notifyError("erro-carga-categoria", null, error, dispatch);
            });
    }, 

    add: () => (dispatch) => {
        dispatch({type: actionTypes.CATEGORIA_NEW, payload: {excluido: 'N'}});
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