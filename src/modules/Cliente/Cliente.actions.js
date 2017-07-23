import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { numberFunctions } from '../../components/Number';
import { cnpjFunctions } from '../../components/CNPJ';
import { zipcodeFunctions } from '../../components/ZipCode';

export const [ CLIENTES_PESQUISA, CLIENTE_EDICAO, CLIENTE_SETMODE ] = [ "CLIENTES_PESQUISA", "CLIENTE_EDICAO", "CLIENTE_SETMODE" ];

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: CLIENTE_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/clientes', { params: filtro })
            .then(function(response) {
                console.log(response.data);
                dispatch({type: CLIENTES_PESQUISA, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-consulta-clientes", [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {

    return dispatch => {

        const data = {
            id: values.id,
            pessoa: { 
                id: values.idPessoa
            },
            nome: values.nome,
            nomeFantasia: values.nomeFantasia,
            email: values.email,
            cnpj: numberFunctions.applyMask(values.cnpj),
            endereco: {
                id: values.idEndereco,
                cep: numberFunctions.applyMask(values.cep),
                logradouro: values.logradouro,
                complemento: values.complemento,
                numero: values.numero,
                bairro: values.bairro,
                cidade: { 
                    id: values.idCidade,
                    nome: values.cidade,
                    estado: {
                        sigla: values.uf
                    }
                }
            },
            telefones: [],
            dataCadastro: values.dataCadastro
        };

        axios.post('/clientes', data)
            .then(function(response) {
                callback();
                dispatch(toaster("cliente-salvo", [], {status: "success"}));

            }).catch(function(response){
                dispatch(toaster("erro-salvar-cliente", [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/clientes/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster("cliente-excluido", [], {status: "success"}));

            }).catch(function(response){
                dispatch(toaster("erro-excluir-cliente", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/clientes/' + id)
            .then(function(response) {

                const values = response.data;
                const data = {
                    id: values.id,
                    idPessoa: values.pessoa.id,
                    nome: values.nome,
                    nomeFantasia: values.nomeFantasia,
                    email: values.email,
                    cnpj: cnpjFunctions.applyMask(values.cnpj),
                    idEndereco: values.endereco ? values.endereco.id : undefined,
                    cep: values.endereco ? zipcodeFunctions.applyMask(values.endereco.cep) : undefined,
                    logradouro: values.endereco ? values.endereco.logradouro : undefined,
                    complemento: values.endereco ? values.endereco.complemento : undefined,
                    numero: values.endereco ? values.endereco.numero : undefined,
                    bairro: values.endereco ? values.endereco.bairro : undefined,
                    idCidade: values.endereco && values.endereco.cidade ? values.endereco.cidade.id : undefined,
                    cidade: values.endereco && values.endereco.cidade ? values.endereco.cidade.nome : undefined,
                    uf: values.endereco && values.endereco.cidade && values.endereco.cidade.estado ? values.endereco.cidade.estado.sigla : undefined,
                    dataCadastro: values.dataCadastro,
                    telefones: values.telefones
                };

                dispatch({type: CLIENTE_EDICAO, payload: data});

            }).catch(function(response){
                dispatch(toaster("erro-carga-cliente", [], {status: "error"}));
            });

    }
}

