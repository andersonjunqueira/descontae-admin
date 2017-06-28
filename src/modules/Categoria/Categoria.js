import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import Intl from '../../components/Intl';

import CategoriaForm from './CategoriaForm';
import CategoriaList from './CategoriaList';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST } from '../../app/App.actions';
import * as categoriaActions from './Categoria.actions';

class Categoria extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: MODE_LIST
        };

        this.carregar = this.carregar.bind(this);
        this.consultar = this.consultar.bind(this);
        this.limpar = this.limpar.bind(this);
        this.salvar = this.salvar.bind(this);
        this.excluir = this.excluir.bind(this);
    }

    componentDidMount() {

        let mode = this.state.mode;
        if(this.props.params.id) {
            if(this.props.params.id === 'novo') {
                mode = MODE_INSERT;
            } else {
                mode = MODE_UPDATE;
                this.carregar();
            }
        } else {
            mode = MODE_LIST;
            this.consultar();
        }

        this.setState(Object.assign(this.state, { mode: mode }));

    }

    carregar(id) {
        this.props.actions.carregar(id);
    }

    consultar(values) {
        this.props.actions.consultar(values);
    }

    limpar() {
        this.props.actions.consultar();
    }

    salvar(values) {
        console.log("salvar");
    }

    excluir(values) {
        console.log("excluir");
    }

    render() {

        const { params, data } = this.props;
        let  { mode } = this.state;
        const obj = {};

        return (
            <div>
                {mode === MODE_LIST && <CategoriaList data={data.registros} doSubmit={this.consultar} doLimpar={this.limpar}/>}
                {mode === MODE_INSERT && <CategoriaForm data={obj} doSubmit={this.salvar} />}
                {mode === MODE_UPDATE && <CategoriaForm data={data} doSubmit={this.salvar} />}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.categoriaReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(categoriaActions, dispatch)
    };
};

Categoria = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Categoria);

export default Categoria;
