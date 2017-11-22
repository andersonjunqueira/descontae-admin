import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import CategoriaForm from './CategoriaForm';
import CategoriaList from './CategoriaList';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST, PAGESIZE_DEFAULT } from '../../app/App.actions';
import actions from './Categoria.actions';

class Categoria extends Component {

    constructor(props) {
        super(props);
        this.fetchAll = this.fetchAll.bind(this);
        // this.consultar = this.consultar.bind(this);
        // this.limpar = this.limpar.bind(this);
        // this.novo = this.novo.bind(this);
        // this.carregar = this.carregar.bind(this);
        // this.salvar = this.salvar.bind(this);
        // this.excluir = this.excluir.bind(this);
        // this.setPage = this.setPage.bind(this);

        this.fetchAll();
    }

    fetchAll(values, page = 0, pagesize = PAGESIZE_DEFAULT) {
        this.props.actions.fetchAll(values, page, pagesize);
    }
/*

    consultar(values, page = 0, pagesize = PAGESIZE_DEFAULT) {
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
*/

    render() {
        const { list, obj } = this.props;
        if(!obj) {
            return (
                <CategoriaList data={list} 
                    doSubmit={this.fetchAll} 
                    doLimpar={this.fetchAll} 
                    doNovo={this.fetchAll} 
                    doCarregar={this.fetchAll}
                    doExcluir={this.fetchAll}/>
            );
        } else {
            return (
                <CategoriaForm data={obj} 
                    doSubmit={this.salvar} 
                    doConsultar={this.consultar}/>
            );
        };
    }

}

const mapStateToProps = (state) => {
    return {
        list: state.categorias,
        obj: state.categoria
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categoria);
