import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import ClienteForm from './ClienteForm';
import ClienteList from './ClienteList';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST, PAGESIZE_DEFAULT } from '../../app/App.actions';
import * as clienteActions from './Cliente.actions';

class Cliente extends Component {

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

    consultar(values, page = 0, pagesize = PAGESIZE_DEFAULT) {
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
        this.props.actions.consultar("");
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
                {data.mode === MODE_LIST && <ClienteList data={data.registros} 
                    doSubmit={this.pesquisar} doLimpar={this.limpar} doNovo={this.novo} doCarregar={this.carregar} 
                    doExcluir={this.excluir} doSetPage={this.setPage}></ClienteList>}

                {data.mode === MODE_INSERT && <ClienteForm 
                    data={obj} doSubmit={this.salvar} doConsultar={this.consultar}></ClienteForm>}

                {data.mode === MODE_UPDATE && <ClienteForm 
                    data={data.obj} doSubmit={this.salvar} doConsultar={this.consultar}></ClienteForm>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.clienteReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(clienteActions, dispatch)
    };
};

Cliente = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Cliente);

export default Cliente;
