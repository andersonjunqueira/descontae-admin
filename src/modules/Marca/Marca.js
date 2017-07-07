import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import MarcaForm from './MarcaForm';
import MarcaList from './MarcaList';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST, PAGESIZE_DEFAULT } from '../../app/App.actions';
import * as marcaActions from './Marca.actions';

class Marca extends Component {

    constructor(props) {
        super(props);
        this.consultar = this.consultar.bind(this);
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

    consultar(values, start = 0, pagesize = PAGESIZE_DEFAULT) {
        this.setState(Object.assign({}, this.state, { lastState: values }));
        this.props.actions.setMode(MODE_LIST);
        this.props.actions.consultar(this.state.lastFilter, start, pagesize);
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
                {data.mode === MODE_LIST && <MarcaList data={data.registros} 
                    doSubmit={this.consultar} doLimpar={this.limpar} doNovo={this.novo} doCarregar={this.carregar} 
                    doExcluir={this.excluir} doSetPage={this.setPage}></MarcaList>}

                {data.mode === MODE_INSERT && <MarcaForm 
                    data={obj} doSubmit={this.salvar} doConsultar={this.consultar}></MarcaForm>}

                {data.mode === MODE_UPDATE && <MarcaForm 
                    data={data.obj} doSubmit={this.salvar} doConsultar={this.consultar}></MarcaForm>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.marcaReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(marcaActions, dispatch)
    };
};

Marca = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Marca);

export default Marca;
