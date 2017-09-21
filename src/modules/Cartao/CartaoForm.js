import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Number from '../../components/Number';
import Intl from '../../components/Intl';
import PesquisaPessoa from '../PesquisaPessoa';

class CartaoForm extends Component {

    constructor(props) {
        super(props);
        this.cancelar = this.cancelar.bind(this);
        this.toggle = this.toggle.bind(this);
        this.selecionarPessoa = this.selecionarPessoa.bind(this);
 
        this.state = {
            id: undefined,
            modalOpen: false
        };
    }

    toggle() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    componentDidUpdate() {
        if(this.props.data) {
            if(this.state.id !== this.props.data.id) {
                this.props.dispatch(this.props.initialize(this.props.data));
                this.setState(Object.assign(this.state, { id: this.props.data.id }));
            }
        }
    }

    cancelar() {
        this.props.doConsultar();
        this.setState(Object.assign(this.state, { id: undefined }));
    }

    selecionarPessoa(value) {
        console.log(value);
        this.toggle();
    }

    render() {
        const { handleSubmit, doSubmit, pristine, reset, submitting, invalid } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit(doSubmit)}>

                    <h4><Intl str='cartao'></Intl></h4>

                    <Row>
                        <Col xs={12} md={2}>
                            <Number name="codigo" label={<Intl str='codigo'></Intl>} maxLength={50} required={true}/>
                        </Col>
                    </Row>

                    <Button type="submit" color="primary" disabled={invalid || submitting}>
                        <Intl str='salvar'></Intl>
                    </Button>

                    <Button type="button" disabled={pristine || submitting} onClick={() => this.props.dispatch(reset)} className="espacamento">
                        <Intl str='limpar'></Intl>
                    </Button>

                    <Button type="button" onClick={() => this.cancelar()} className="btn btn-secondary">
                        <Intl str='cancelar'></Intl>
                    </Button>

                    <Button type="button" onClick={() => this.toggle()} className="btn btn-secondary">
                        <Intl str='open'></Intl>
                    </Button>

                </Form>

                <Modal isOpen={this.state.modalOpen} toggle={this.toggle} size="lg">
                    <ModalHeader toggle={this.toggle}><Intl str="pesquisa-pessoas"></Intl></ModalHeader>
                    <ModalBody>
                        <PesquisaPessoa doSelecionar={this.selecionarPessoa}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

CartaoForm = reduxForm({ 
    form: "CartaoForm", 
    validate 
})(CartaoForm);

export default CartaoForm;
