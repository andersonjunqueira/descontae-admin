import React, { Component } from 'react';
import { FieldArray, reduxForm, change } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';

import Card, { CardHeader, CardBody } from '../../components/Card';
import Text from '../../components/Text';
import CNPJ from '../../components/CNPJ';
import Email from '../../components/Email';
import Phone from '../../components/Phone';
import Endereco from '../../components/Endereco';
import SelectCategoria from '../Categoria/SelectCategoria';
import SelectMarca from '../Marca/SelectMarca';
import Intl from '../../components/Intl';

import { toaster } from '../../components/Notification/Notification.actions';

class renderUnidades extends Component {
    render() {
        const { fields, meta } = this.props; 
        return (
            <Card>
                <CardHeader>
                    <Intl str='unidades'></Intl> 
                    <Button type="button" color="secondary" className="pull-right" size="sm" onClick={() => fields.push()}>
                        <Intl str='adicionar-unidade'></Intl>
                    </Button>
                </CardHeader>
                <CardBody>
                    {(!fields || fields.length === 0) && <Intl str='nenhum-registro-encontrado'></Intl>}
                    {fields.map((field, index) => {
                        return (
                            <div key={index}>
                                <Row>
                                    <Col xs={6} md={12}>
                                        <Text name={`${field}.nome`} label={<Intl str='nome'></Intl>} maxLength={50}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} md={12}>
                                        <Endereco/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={12} className="text-right">
                                        <a className="btn btn-danger fields-remove-button" onClick={() => { fields.remove(index); } }>
                                          <i className="fa fa-trash"></i>
                                        </a>
                                    </Col>
                                </Row>
                            </div>
                        );
                    })}
                    {meta.error && <span className="fields-error">{meta.error}</span>}
                </CardBody>
            </Card>
        );
    }
}

class ParceiroForm extends Component {

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

                <h4><Intl str='parceiro'></Intl></h4>

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
                    <Col xs={12} md={4}>
                        <CNPJ name="cnpj" label={<Intl str='cnpj'></Intl>} required={true}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <SelectCategoria name="categoria" label={<Intl str='categoria'></Intl>} required={true}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <SelectMarca name="marca" label={<Intl str='marca'></Intl>} required={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Email name="email" label={<Intl str='email-responsavel'></Intl>} required={true} maxLength={100}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <Phone name="telefone" label={<Intl str='telefone'></Intl>} maxLength={15}/>
                    </Col>
                </Row>

                <FieldArray name="unidades" component={renderUnidades} />

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

ParceiroForm = reduxForm({ 
    form: "ParceiroForm", 
    validate 
})(ParceiroForm);

export default ParceiroForm;
