import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import MarcaForm from './MarcaForm';
import { save, fetchOne, processImages } from './Marca.actions';

class MarcaEdit extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchOne(id, () => {
            this.props.history.push('/marcas');
        });
    }

    salvar(values) {
        this.props.processImages(values, (data) => {
            this.props.save(data, () => {
                this.props.history.push('/marcas');
            });
        });
    }

    render() {
        if(this.props.data) {
            return (
                <MarcaForm 
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
        data: state.marcas.active
    };
};

const mapDispatch = (dispatch) => {
    return bindActionCreators({ save, fetchOne, processImages }, dispatch);
};

export default connect(mapState, mapDispatch)(MarcaEdit);
