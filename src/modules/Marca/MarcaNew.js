import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import MarcaForm from './MarcaForm';
import { save, processImages } from './Marca.actions';

class MarcaNew extends Component {

    salvar(values) {
        this.props.processImages(values, () => {
            this.props.save(values, () => {
                this.props.history.push('/marcas');
            });
        });
    }

    render() {
        return (
            <MarcaForm 
                doSubmit={this.salvar.bind(this)}
            />
        );
    }
    
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({ save, processImages }, dispatch);
};

export default connect(null, mapDispatch)(MarcaNew);
