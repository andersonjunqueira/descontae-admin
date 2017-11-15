import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { Form, Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST, PAGESIZE_DEFAULT } from '../../../app/App.actions';
import * as consumoActions from './ConsumoCliente.actions';

class ConsumoCliente extends Component {

    componentWillMount() {
        this.props.actions.getCliente();
    }

    render() {
        if(this.props.cliente) {
            return (
                <div>ok</div>
            );
        } else {
            return (<div></div>);
        }
    }

}

const mapStateToProps = (state) => {
    return {
        cliente: state.consumoClienteReducer.cliente
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(consumoActions, dispatch)
    };
};

ConsumoCliente = connect(
    mapStateToProps, 
    mapDispatchToProps
)(ConsumoCliente);

export default ConsumoCliente;
