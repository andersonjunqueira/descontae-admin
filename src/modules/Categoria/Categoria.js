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

        let mode = MODE_LIST;
        if(this.props.params.idCategoria) {
            if(this.props.params.idCategoria === 'novo') {
                mode = MODE_INSERT;
            } else {
                mode = MODE_UPDATE;
            }
        }

        this.state = {
            mode: mode
        };

        this.pesquisar = this.pesquisar.bind(this);
        this.limparPesquisa = this.limparPesquisa.bind(this);
    }

    componentDidMount() {
        if(this.state.mode === MODE_LIST ) {
            this.pesquisar();
        }
    }

    pesquisar(values) {
        this.props.actions.loadCategorias(values);
    }

    limparPesquisa() {
        this.props.actions.loadCategorias();
    }

    render() {

        const { mode } = this.state;
        const { params, data } = this.props;

        return (
            <div>
                {mode === MODE_LIST && <CategoriaList data={this.props.data} doSubmit={this.pesquisar} doLimpar={this.limparPesquisa}/>}
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
