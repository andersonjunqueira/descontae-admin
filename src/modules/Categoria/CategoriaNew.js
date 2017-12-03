import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import CategoriaForm from './CategoriaForm';
import { save } from './Categoria.actions';

class CategoriaNew extends Component {

    salvar(values) {
        this.props.save(values, () => {
            this.props.history.push('/categorias');
        });
    }

    render() {
        return (
            <CategoriaForm 
                doSubmit={this.salvar.bind(this)}
            />
        );
    }
    
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({ save }, dispatch);
};

export default connect(null, mapDispatch)(CategoriaNew);
