import React, { Component } from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';

import Text from '../../components/Text';
import Select from '../../components/Select';
import Email from '../../components/Email';
import CPF from '../../components/CPF';
import Intl from '../../components/Intl';
import Date from '../../components/Date';
import Phones from '../Snippets/Phones';
import Endereco from '../../components/Endereco';
import Card, { CardHeader, CardBody } from '../../components/Card';
import { translate } from '../../components/Intl/Intl.actions';

class PessoaForm extends Component {

    constructor(props) {
        super(props);
        this.cancelar = this.cancelar.bind(this);
 
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

    render() {

        const { handleSubmit, doSubmit, pristine, reset, submitting, invalid } = this.props;
        const sexoTypes = [
            {value: "M", text: translate("masculino")},
            {value: "F", text: translate("feminino")}
        ];

        const tipoPessoaTypes = [
            {value: "1", text: translate("administrador")},
            {value: "4", text: translate("usuario")}
        ];

        if(this.state.id) {
            tipoPessoaTypes.push({value: "2", text: translate("parceiro")});
            tipoPessoaTypes.push({value: "3", text: translate("cliente")});
        }

        return (
            <Form onSubmit={handleSubmit(doSubmit)}>

                <h4><Intl str='pessoa'></Intl></h4>

                <Row>
                    <Col xs={12} md={6}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100} required={true}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <Email name="email" label={<Intl str='email'></Intl>} maxLength={100} required={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <CPF name="cpf" label={<Intl str='cpf'></Intl>} required={true}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Date name="dataNascimento" label={<Intl str='data-nascimento'></Intl>}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Select name="sexo" options={sexoTypes} label={<Intl str='sexo'></Intl>}/>
                    </Col>
                </Row>                
                <Row>
                    <Col xs={12} md={6}>
                        <Text name="facebook" label={<Intl str='facebook'></Intl>} maxLength={50}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <Text name="instagram" label={<Intl str='instagram'></Intl>} maxLength={50}/>
                    </Col>
                </Row>

                <FieldArray name="telefones" component={Phones} />

                <Card>
                    <CardHeader><Intl str='endereco'></Intl></CardHeader>
                    <CardBody>
                        <Endereco name="endereco" formName="PessoaForm"/>
                    </CardBody>
                </Card>

                <Row>
                    <Col xs={12} md={4}>
                        <Date name="dataCadastro" label={<Intl str='data-cadastro'></Intl>} disabled={true}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Date name="dataAlteracao" label={<Intl str='data-alteracao'></Intl>} disabled={true}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Select name="tipoPessoa" options={tipoPessoaTypes} label={<Intl str='tipo-pessoa'></Intl>} disabled={this.state.id} required={true}/>
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

            </Form>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

PessoaForm = reduxForm({ 
    form: "PessoaForm", 
    validate 
})(PessoaForm);

export default PessoaForm;
