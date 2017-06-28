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
        this.checkMode = this.checkMode.bind(this);
        this.consultar = this.consultar.bind(this);
        this.limpar = this.limpar.bind(this);
        this.novo = this.novo.bind(this);

        this.carregar = this.carregar.bind(this);
        this.salvar = this.salvar.bind(this);
        this.excluir = this.excluir.bind(this);

        this.state = {
            mode: this.checkMode()
        };

    }

    checkMode() {
        if(this.props.params.id) {
            if(this.props.params.id == 0) {
                return MODE_INSERT;
            } else {
                return MODE_UPDATE;
            }
        } else {
            return MODE_LIST;
        }
    }

    componentDidMount() {
        switch(this.state.mode) {
            case MODE_INSERT:
                break;

            case MODE_UPDATE:
                this.carregar(this.props.params.id);
                break;

            default:
                this.consultar();
                break;
        }
    }

    consultar(values) {
        this.setState(Object.assign(this.state, { mode: MODE_LIST }));
        this.props.actions.consultar(values);
    }

    limpar() {
        this.setState(Object.assign(this.state, { mode: MODE_LIST }));
        this.props.actions.consultar();
    }

    novo() {
        this.setState(Object.assign(this.state, { mode: MODE_INSERT }));
    }

    salvar(values) {
        this.props.actions.salvar(values);
    }

    carregar(id) {
        this.setState(Object.assign(this.state, { mode: MODE_UPDATE }));
        this.props.actions.carregar(id);
    }

    excluir(values) {
        console.log("excluir", values);
    }

    render() {

        const { mode } = this.state;
        const { params, data } = this.props;
        const obj = {};

        return (
            <div>
                {mode === MODE_LIST && <CategoriaList data={data.registros} 
                    doSubmit={this.consultar} doLimpar={this.limpar} doNovo={this.novo} doCarregar={this.carregar}></CategoriaList>}

                {mode === MODE_INSERT && <CategoriaForm 
                    data={obj} doSubmit={this.salvar} doConsultar={this.consultar}></CategoriaForm>}

                {mode === MODE_UPDATE && <CategoriaForm 
                    data={data} doSubmit={this.salvar} doConsultar={this.consultar}></CategoriaForm>}
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
