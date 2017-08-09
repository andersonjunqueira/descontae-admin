import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { numberFunctions } from '../../components/Number';
import { cnpjFunctions } from '../../components/CNPJ';
import { zipcodeFunctions } from '../../components/ZipCode';
import { phoneFunctions } from '../../components/Phone';

export const [ PARCEIROS_PESQUISA, PARCEIRO_EDICAO, PARCEIRO_SETMODE ] = [ "PARCEIROS_PESQUISA", "PARCEIRO_EDICAO", "PARCEIRO_SETMODE" ];

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

        const data = Object.assign({}, values, {});
        data.cnpj = numberFunctions.applyMask(data.cnpj);
        if(data.telefones && data.telefones.length > 0) {
            for(let i = 0; i < data.telefones.length; i++) {
                data.telefones[i].numero = numberFunctions.applyMask(data.telefones[i].numero);
            };
        }

        if(data.unidades && data.unidades.length > 0) {
            for(let i = 0; i < data.unidades.length; i++) {

                data.unidades[i].endereco.cep = numberFunctions.applyMask(data.unidades[i].endereco.cep);
                if(data.unidades[i].telefones && data.unidades[i].telefones.length > 0) {
                    for(let j = 0; j < data.unidades[i].telefones.length; j++) {
                        data.unidades[i].telefones[j].numero = numberFunctions.applyMask(data.unidades[i].telefones[j].numero);
                    };
                }

            };
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

            }).catch(function(response){
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

            }).catch(function(response){
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

            }).catch(function(response){
                dispatch(toaster("erro-excluir-parceiro", [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/parceiros/' + id)
            .then(function(response) {

                dispatch({type: PARCEIRO_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(response){
                dispatch(toaster("erro-carga-parceiro", [], {status: "error"}));
            });

    }
}

