import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { numberFunctions } from '../../components/Number';
import { cnpjFunctions } from '../../components/CNPJ';
import { zipcodeFunctions } from '../../components/ZipCode';
import { phoneFunctions } from '../../components/Phone';

export const [ PARCEIROS_PESQUISA, PARCEIRO_EDICAO, PARCEIRO_SETMODE ] = [ "PARCEIROS_PESQUISA", "PARCEIRO_EDICAO", "PARCEIRO_SETMODE" ];

const converter = {
    toFrontend: (values) => {

        const data = Object.assign({}, values, {});
        data.cnpj = cnpjFunctions.applyMask(data.cnpj);

        if(data.telefones) {
            data.telefones.forEach(telefone => {
                telefone.numero = phoneFunctions.applyMask(telefone.numero);
            });
        }

        if(data.unidades) {
            data.unidades.forEach(unidade => {
                unidade.endereco.cep = zipcodeFunctions.applyMask(unidade.endereco.cep);
                unidade.endereco.idUf = unidade.endereco.cidade.estado.id;
                unidade.endereco.uf = unidade.endereco.cidade.estado.sigla;
                unidade.endereco.idCidade = unidade.endereco.cidade.id;
                unidade.endereco.cidade = unidade.endereco.cidade.nome;

                if(unidade.telefones) {
                    unidade.telefones.forEach(telefone => {
                        telefone.numero = phoneFunctions.applyMask(telefone.numero);
                    });
                }

            });
        }

        return data;

    },

    toBackend: (values) => {

        const data = Object.assign({}, values, {});
        data.cnpj = numberFunctions.applyMask(data.cnpj);

        if(data.telefones) {
            data.telefones.forEach(telefone => {
                telefone.numero = numberFunctions.applyMask(telefone.numero);
            });
        }

        if(data.unidades) {
            data.unidades.forEach(unidade => {
                unidade.endereco.cep = numberFunctions.applyMask(unidade.endereco.cep);
                unidade.endereco.cidade = { id: unidade.endereco.idCidade, nome: unidade.endereco.cidade };
                unidade.endereco.cidade.estado = { id: unidade.endereco.idUf, sigla: unidade.endereco.uf };
                unidade.endereco.idCidade = undefined;
                unidade.endereco.idUf = undefined;
                unidade.endereco.uf = undefined;

                if(unidade.telefones) {
                    unidade.telefones.forEach(telefone => {
                        telefone.numero = numberFunctions.applyMask(telefone.numero);
                    });
                }

            });
        }

        return data;
    }
}

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: PARCEIRO_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/parceiros', { params: filtro })
            .then(function(response) {
                dispatch({type: PARCEIROS_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-parceiros", [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.post('/parceiros', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster("parceiro-salvo", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-salvar-parceiro", [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/parceiros/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster("parceiro-excluido", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-excluir-parceiro", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/parceiros/' + id)
            .then(function(response) {

                dispatch({type: PARCEIRO_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-carga-parceiro", [], {status: "error"}));
            });

    }
}

