import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import PlanoForm from './PlanoForm';
import { save, processImages } from './Plano.actions';

class PlanoNew extends Component {

    salvar(values) {
        this.props.processImages(values, (data) => {
            this.props.save(data, () => {
                this.props.history.push('/planos');
            });
        });
    }

    render() {
        return (
            <PlanoForm 
                doSubmit={this.salvar.bind(this)}
            />
        );
    }
    
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({ save, processImages }, dispatch);
};

export default connect(null, mapDispatch)(PlanoNew);
