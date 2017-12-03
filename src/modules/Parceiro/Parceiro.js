import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import ParceiroForm from './ParceiroForm';
import ParceiroList from './ParceiroList';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST, PAGELIMIT_DEFAULT } from '../../app/App.actions';
import * as parceiroActions from './Parceiro.actions';
import { fileFunctions } from "../../components/File";

class Parceiro extends Component {

    constructor(props) {
        super(props);
        this.consultar = this.consultar.bind(this);
        this.pesquisar = this.pesquisar.bind(this);
        this.limpar = this.limpar.bind(this);
        this.novo = this.novo.bind(this);
        this.carregar = this.carregar.bind(this);
        this.salvar = this.salvar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.setPage = this.setPage.bind(this);

        this.state = {
            lastFilter: ""
        };
    }

    componentDidMount() {
        this.consultar();
    }

    pesquisar(values) {
        this.consultar(values);
    }

    consultar(values, page = 0, pagesize = PAGELIMIT_DEFAULT) {
        let filter = Object.assign({}, values);
        filter.sort = "nome,ASC";
        if(filter && filter.nome) {
            filter.nome += "*";
        }

        this.setState(Object.assign({}, this.state, { lastFilter: filter }));
        this.props.actions.setMode(MODE_LIST);
        this.props.actions.consultar(filter, page, pagesize);
    }

    limpar() {
        this.consultar();
    }

    novo() {
        this.props.actions.setMode(MODE_INSERT);
    }

    salvar(values) {
        const data = Object.assign({}, values, {});

        const imagens = {};
        if(data.unidades && data.unidades.length > 0) {
            for(let i = 0; i < data.unidades.length; i++) {
                let unidade = data.unidades[i];
                if(unidade.imagens && unidade.imagens.length > 0) {
                    for(let j = 0; j < unidade.imagens.length; j++) {
                        imagens["u" + i + "i" + j] = unidade.imagens[j].imagem;
                    }
                }
            };
        }

        let allPromisses = [];
        Object.keys(imagens).forEach(function(key) {

            allPromisses.push(fileFunctions.getPromise(imagens[key]).then(response => {
                if(response) {
                    data.unidades[key.charAt(1)].imagens[key.charAt(3)].imagem = response;
                }
            }));

        });

        Promise.all(allPromisses).then(values => { 
            this.props.actions.salvar(data, this.consultar);
        }, reason => {
            console.log(reason);
        });

    }

    carregar(id) {
        this.props.actions.carregar(id);
        this.props.actions.setMode(MODE_UPDATE);
    }

    excluir(id) {
        this.props.actions.excluir(id, this.consultar);
    }

    setPage(page) {
        this.consultar(this.state.lastFilter, page);
    }

    render() {

        const { data } = this.props;
        const obj = {};

        return (
            <div>
                {data.mode === MODE_LIST && <ParceiroList data={data.registros} 
                    doSubmit={this.pesquisar} doLimpar={this.limpar} doNovo={this.novo} doCarregar={this.carregar} 
                    doExcluir={this.excluir} doSetPage={this.setPage}></ParceiroList>}

                {data.mode === MODE_INSERT && <ParceiroForm 
                    data={obj} doSubmit={this.salvar} doConsultar={this.consultar}></ParceiroForm>}

                {data.mode === MODE_UPDATE && <ParceiroForm 
                    data={data.obj} doSubmit={this.salvar} doConsultar={this.consultar}></ParceiroForm>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.parceiroReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(parceiroActions, dispatch)
    };
};

Parceiro = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Parceiro);

export default Parceiro;
