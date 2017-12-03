import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import PessoaForm from './PessoaForm';
import PessoaList from './PessoaList';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST, PAGELIMIT_DEFAULT } from '../../app/App.actions';
import * as pessoaActions from './Pessoa.actions';

class PESSOA extends Component {

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
        this.props.actions.salvar(values, this.consultar);
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
                {data.mode === MODE_LIST && <PessoaList data={data.registros} 
                    doSubmit={this.pesquisar} doLimpar={this.limpar} doNovo={this.novo} doCarregar={this.carregar} 
                    doExcluir={this.excluir} doSetPage={this.setPage}></PessoaList>}

                {data.mode === MODE_INSERT && <PessoaForm 
                    data={obj} doSubmit={this.salvar} doConsultar={this.consultar}></PessoaForm>}

                {data.mode === MODE_UPDATE && <PessoaForm 
                    data={data.obj} doSubmit={this.salvar} doConsultar={this.consultar}></PessoaForm>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.pessoaReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(pessoaActions, dispatch)
    };
};

PESSOA = connect(
    mapStateToProps, 
    mapDispatchToProps
)(PESSOA);

export default PESSOA;
