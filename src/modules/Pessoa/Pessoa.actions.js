import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import { dateFunctions } from '../../components/Date';
import  { numberFunctions } from '../../components/Number';
import { zipcodeFunctions } from '../../components/ZipCode';
import { phoneFunctions } from '../../components/Phone';

export const [ PESSOAS_PESQUISA, PESSOA_EDICAO, PESSOA_SETMODE ] = [ "PESSOAS_PESQUISA", "PESSOA_EDICAO", "PESSOA_SETMODE" ];

const converter = {
    toFrontend: (values) => {

        const data = JSON.parse(JSON.stringify(values));
        data.dataNascimento = dateFunctions.toFrontend(data.dataNascimento);
        data.dataCadastro = dateFunctions.toFrontend(data.dataCadastro);
        data.dataAlteracao = dateFunctions.toFrontend(data.dataAlteracao);
        data.tipoPessoa = data.tipoPessoa.id;

        if(data.endereco) {
            data.endereco.cep = zipcodeFunctions.applyMask(data.endereco.cep);
            data.endereco.idUf = data.endereco.cidade.estado.id;
            data.endereco.uf = data.endereco.cidade.estado.sigla;
            data.endereco.idCidade = data.endereco.cidade.id;
            data.endereco.cidade = data.endereco.cidade.nome;
        }

        if(data.telefones && data.telefones.length > 0) {
            for(let i = 0; i < data.telefones.length; i++) {
                data.telefones[i].numero = phoneFunctions.applyMask(data.telefones[i].numero);
            };
        }
        
        return data;

    },

    toBackend: (values) => {

        const data = JSON.parse(JSON.stringify(values));
        data.cpf = numberFunctions.applyMask(data.cpf);
        data.dataNascimento = dateFunctions.toBackend(data.dataNascimento);
        data.dataCadastro = dateFunctions.toBackend(data.dataCadastro);
        data.dataAlteracao = dateFunctions.toBackend(data.dataAlteracao);
        data.tipoPessoa = { id: data.tipoPessoa };

        if(data.endereco) {
            data.endereco = {
                cep: numberFunctions.applyMask(data.endereco.cep),
                logradouro: data.endereco.logradouro,
                complemento: data.endereco.complemento,
                numero: data.endereco.numero,
                bairro: data.endereco.bairro,
                cidade: {
                    id: data.endereco.idCidade,
                    nome: data.endereco.cidade,
                    estado: {
                        id: data.endereco.idUf,
                        sigla: data.endereco.uf
                    }
                }
            };
        }

        if(data.telefones && data.telefones.length > 0) {
            for(let i = 0; i < data.telefones.length; i++) {
                data.telefones[i].numero = numberFunctions.applyMask(data.telefones[i].numero);
            };
        }

        return data;
    }
}

export const setMode = (mode) => {
    return dispatch => {
        dispatch({type: PESSOA_SETMODE, payload: mode});
    }
}

export const consultar = (filtro, start, pagesize) => {
    filtro = filtro ? filtro : {};
    filtro.start = start;
    filtro.page = pagesize;

    return dispatch => {

        axios.get('/pessoas', { params: filtro })
            .then(function(response) {
                dispatch({type: PESSOAS_PESQUISA, payload: response.data});

            }).catch(function(error){
                dispatch(toaster("erro-consulta-pessoas", error.response.data, [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.put('/pessoas', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster(null, "pessoa-salva", [], {status: "success"}));

            }).catch(function(error){
                dispatch(toaster("erro-salvar-pessoa", error.response.data, [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/pessoas/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "pessoa-excluida", [], {status: "success"}));

            }).catch(function(error){
                dispatch(toaster("erro-excluir-pessoa", error.response.data, [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/pessoas/' + id)
            .then(function(response) {

                dispatch({type: PESSOA_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(error){
                dispatch(toaster("erro-carga-pessoa", error.response.data, [], {status: "error"}));
            });

    }
}

