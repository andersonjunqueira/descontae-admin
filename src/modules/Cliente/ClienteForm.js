import React, { Component } from 'react';
import { FieldArray, reduxForm, change } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';

import Text from '../../components/Text';
import CNPJ from '../../components/CNPJ';
import Email from '../../components/Email';
import Phone from '../../components/Phone';
import Endereco from '../../components/Endereco';
import Intl from '../../components/Intl';
import Card, { CardHeader, CardBody } from '../../components/Card';

import { toaster } from '../../components/Notification/Notification.actions';

class renderPhones extends Component {
    render() {
        const { fields, meta } = this.props; 
        return (
            <Card>
                <CardHeader>
                    <Intl str='telefones'></Intl> 
                    <Button type="button" color="secondary" className="pull-right" size="sm" onClick={() => fields.push()}>
                        <Intl str='adicionar-telefone'></Intl>
                    </Button>
                </CardHeader>
                <CardBody>
                    {(!fields || fields.length === 0) && <Intl str='nenhum-registro-encontrado'></Intl>}
                    {fields.map((field, index) => {
                        return (
                            <Row key={index}>
                                <Col xs={6} md={4}>
                                    <Phone name={`${field}.numero`} label={<Intl str='telefone'></Intl>} maxLength={15}/>
                                </Col>
                                <Col xs={2} md={1}>
                                    <a className="btn btn-danger fields-remove-button" onClick={() => { fields.remove(index); } }>
                                      <i className="fa fa-trash"></i>
                                    </a>
                                </Col>
                            </Row>
                        );
                    })}
                    {meta.error && <span className="fields-error">{meta.error}</span>}
                </CardBody>
            </Card>
        );
    }
}

class ClienteForm extends Component {

    constructor(props) {
        super(props);
        this.cancelar = this.cancelar.bind(this);
        this.atualizaEndereco = this.atualizaEndereco.bind(this);

        this.state = {
            id: undefined
        }
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

    atualizaEndereco(address) { 
        if(address) {
            this.props.dispatch(change(this.props.form, 'logradouro', address.logradouro));
            this.props.dispatch(change(this.props.form, 'bairro', address.bairro));
            this.props.dispatch(change(this.props.form, 'cidade', address.cidade));
            this.props.dispatch(change(this.props.form, 'uf', address.uf));
        } else {
            this.props.dispatch(toaster("cep-nao-encontrado", [], {status: "warning"}));
        }
    }

    render() {
        const { handleSubmit, doSubmit, pristine, reset, submitting, invalid } = this.props;
        return (
            <Form onSubmit={handleSubmit(doSubmit)}>

                <h4><Intl str='cliente'></Intl></h4>

                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100} required={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nomeFantasia" label={<Intl str='nome-fantasia'></Intl>} maxLength={100} required={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <CNPJ name="cnpj" label={<Intl str='cnpj'></Intl>} required={true}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <Email name="email" label={<Intl str='email'></Intl>} required={true}/>
                    </Col>
                </Row>

                <FieldArray name="telefones" component={renderPhones} />

                <Card>
                    <CardHeader><Intl str='endereco'></Intl></CardHeader>
                    <CardBody>
                        <Endereco zipcodeParams={{ form: "ClienteForm", callback: this.atualizaEndereco }}/>
                    </CardBody>
                </Card>

                <Button type="submit" color="primary" disabled={invalid || submitting}>
                    <Intl str='salvar'></Intl>
                </Button>

                <Button type="button" disabled={pristine || submitting} onClick={() => this.props.dispatch(reset)} className="espacamento">
                    <Intl str='limpar'></Intl>
                </Button>

                <Button type="button" onClick={() => this.cancelar()} className="btn btn-secondary">
                    <Intl str='cancelar'></Intl>
                </Button>

            </Form>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

ClienteForm = reduxForm({ 
    form: "ClienteForm", 
    validate 
})(ClienteForm);

export default ClienteForm;
