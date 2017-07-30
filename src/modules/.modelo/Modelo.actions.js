import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { numberFunctions } from '../../components/Number';
import { cnpjFunctions } from '../../components/CNPJ';
import { zipcodeFunctions } from '../../components/ZipCode';
import { phoneFunctions } from '../../components/Phone';

export const [ MDOELOS_PESQUISA, MDOELO_EDICAO, MDOELO_SETMODE ] = [ "MDOELOS_PESQUISA", "MDOELO_EDICAO", "MDOELO_SETMODE" ];

const converter = {
    toFrontend: (values) => {

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

        if(data.telefones && data.telefones.length > 0) {
            for(let i = 0; i < data.telefones.length; i++) {
                data.telefones[i].numero = phoneFunctions.applyMask(values.telefones[i].numero);
            };
        }

        return data;

    },

    toBackend: (values) => {

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

        data.telefones = Object.assign(values.telefones);
        if(data.telefones && data.telefones.length > 0) {
            for(let i = 0; i < data.telefones.length; i++) {
                data.telefones[i].numero = numberFunctions.applyMask(values.telefones[i].numero);
            };
        }

        return data;
    }
}

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: MDOELO_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/modelos', { params: filtro })
            .then(function(response) {
                dispatch({type: MDOELOS_PESQUISA, payload: response.data});

            }).catch(function(response){
                dispatch(toaster("erro-consulta-modelos", [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.post('/modelos', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster("modelo-salvo", [], {status: "success"}));

            }).catch(function(response){
                dispatch(toaster("erro-salvar-modelo", [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/modelos/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster("modelo-excluido", [], {status: "success"}));

            }).catch(function(response){
                dispatch(toaster("erro-excluir-modelo", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/modelos/' + id)
            .then(function(response) {

                dispatch({type: MDOELO_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(response){
                dispatch(toaster("erro-carga-modelo", [], {status: "error"}));
            });

    }
}

