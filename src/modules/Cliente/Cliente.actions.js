import axios from "axios";

import { toaster } from '../../components/Notification/Notification.actions';
import  { numberFunctions } from '../../components/Number';
import { zipcodeFunctions } from '../../components/ZipCode';
import { phoneFunctions } from '../../components/Phone';

export const [ CLIENTES_PESQUISA, CLIENTE_EDICAO, CLIENTE_SETMODE ] = [ "CLIENTES_PESQUISA", "CLIENTE_EDICAO", "CLIENTE_SETMODE" ];

const converter = {
    toFrontend: (values) => {

        const data = JSON.parse(JSON.stringify(values));

        data.endereco.cep = zipcodeFunctions.applyMask(values.endereco.cep);
        data.endereco.idUf = values.endereco.cidade.estado.id;
        data.endereco.uf = values.endereco.cidade.estado.sigla;
        data.endereco.idCidade = values.endereco.cidade.id;
        data.endereco.cidade = values.endereco.cidade.nome;

        if(data.telefones && data.telefones.length > 0) {
            for(let i = 0; i < data.telefones.length; i++) {
                data.telefones[i].numero = phoneFunctions.applyMask(values.telefones[i].numero);
            };
        }

        return data;

    },

    toBackend: (values) => {

        const data = JSON.parse(JSON.stringify(values));

        data.cnpj = numberFunctions.applyMask(values.cnpj);
        data.endereco = {
            cep: numberFunctions.applyMask(values.endereco.cep),
            logradouro: values.endereco.logradouro,
            complemento: values.endereco.complemento,
            numero: values.endereco.numero,
            bairro: values.endereco.bairro,
            cidade: {
                id: values.endereco.idCidade,
                nome: values.endereco.cidade,
                estado: {
                    id: values.endereco.idUf,
                    sigla: values.endereco.uf
                }
            }
        };

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
                dispatch({type: CLIENTES_PESQUISA, payload: response.data});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-consulta-clientes", error.response.data, [], {status: "error"}));
            });

    }
}

export const salvar = (values, callback) => {
    return dispatch => {

        axios.put('/clientes', converter.toBackend(values) )
            .then(function(response) {
                callback();
                dispatch(toaster(null, "cliente-salvo", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-salvar-cliente", error.response.data, [], {status: "error"}));
            });

    }
}

export const excluir = (id, callback) => {
    return dispatch => {

        axios.delete('/clientes/' + id)
            .then(function(response) {
                callback();
                dispatch(toaster(null, "cliente-excluido", [], {status: "success"}));

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-excluir-cliente", error.response.data, [], {status: "error"}));
            });

    }
}

export const carregar = (id) => {
    return dispatch => {

        axios.get('/clientes/' + id)
            .then(function(response) {

                dispatch({type: CLIENTE_EDICAO, payload: converter.toFrontend(response.data)});

            }).catch(function(error){
                console.log(error);
                dispatch(toaster("erro-carga-cliente", error.response.data, [], {status: "error"}));
            });

    }
}

