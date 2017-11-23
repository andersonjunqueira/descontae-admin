import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import CategoriaForm from './CategoriaForm';
import CategoriaList from './CategoriaList';

import { PAGESIZE_DEFAULT } from '../../app/App.actions';
import actions from './Categoria.actions';

class Categoria extends Component {

    constructor(props) {
        super(props);
        this.fetchAll = this.fetchAll.bind(this);
        this.setPage = this.setPage.bind(this);
        console.log('CATEGORIA CONSTRUCTOR');
        // this.consultar = this.consultar.bind(this);
        // this.limpar = this.limpar.bind(this);
        // this.novo = this.novo.bind(this);
        // this.carregar = this.carregar.bind(this);
        // this.salvar = this.salvar.bind(this);
        // this.excluir = this.excluir.bind(this);
    }

    componentWillMount() {
        console.log('CATEGORIA WILLMOUNT');
        this.fetchAll();
    }

    fetchAll(values, page = 0, pagesize = PAGESIZE_DEFAULT) {
        this.props.actions.fetchAll(values, page, pagesize);
    }

    setPage(page) {
        this.fetchAll('', page);
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
*/

    render() {
        console.log('CATEGORIA RENDER');
        const { list, obj } = this.props;
        if(!obj) {
            return (
                <CategoriaList 
                    data={list} 
                    doSubmit={this.fetchAll}
                    doSetPage={this.setPage}/>
            );
        } else {
            return (
                <CategoriaForm data={obj} 
                    doSubmit={this.salvar} 
                    doConsultar={this.consultar}/>
            );
        }
    }

}

const mapStateToProps = (state) => {
    console.log('CATEGORIA LOADING STATE');
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
