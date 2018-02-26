import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import PlanoForm from './PlanoForm';
import { save, fetchOne, processImages } from './Plano.actions';

class PlanoEdit extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchOne(id, () => {
            this.props.history.push('/planos');
        });
    }

    salvar(values) {
        this.props.processImages(values, (data) => {
            this.props.save(data, () => {
                this.props.history.push('/planos');
            });
        });
    }

    render() {
        if(this.props.data) {
            return (
                <PlanoForm 
                    data={this.props.data}    
                    doSubmit={this.salvar.bind(this)}
                />
            );
        } else {
            return <span></span>;
        }
    }
    
}

const mapState = (state) => {
    return {
        data: state.planos.active
    };
};

const mapDispatch = (dispatch) => {
    return bindActionCreators({ save, fetchOne, processImages }, dispatch);
};

export default connect(mapState, mapDispatch)(PlanoEdit);
