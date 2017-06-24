import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategoriaForm from './CategoriaForm';
import Intl from '../../components/Intl';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST } from '../../app/App.actions';
import { loadCategorias } from './Categoria.actions';

class Categoria extends Component {

    constructor(props) {
        super(props);

        if(this.props.params) {

            if(this.props.params.idCategoria === 'novo') {
                this.props.state = {
                    initialized: false
                };
            } else {

            }

        } else {
            this.props.dispatch(this.props.list);
        }

    }

    doSubmit(values) {
    }

    render() {

        const { params } = this.props;

        return (
            <div>
                <h4><Intl str='categorias'></Intl></h4>

                {params && params.idCategoria && <span>{params.idCategoria}</span>}
                {!params || !params.idCategoria && <span>form</span>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.categoriaReducer
    }
};

Categoria = connect( 
    mapStateToProps,
    { list: loadCategorias }
)(Categoria);

export default Categoria;
