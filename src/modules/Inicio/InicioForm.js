import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';

import Text from '../../components/Text';
import TextArea from '../../components/TextArea';
import Number from '../../components/Number';
import Password from '../../components/Password';
import Email from '../../components/Email';
import CPF from '../../components/CPF';
import CNPJ from '../../components/CNPJ';

class InicioForm extends Component {

    render() {
        const { handleSubmit, doSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit(doSubmit)}>
                <Row>
                    <Col md={6}>
                        <Text name="text" label="TEXT"/>
                    </Col>
                    <Col md={6}>
                        <Number name="number5" label="NUMBER" precision={2} step={0.1}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Password name="password" label="PASSWORD"/>
                    </Col>
                    <Col md={6}>
                        <Email name="email" label="EMAIL"/>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <CPF name="cpf" label="CPF"/>
                    </Col>
                    <Col md={6}>
                        <CNPJ name="cnpj" label="CNPJ"/>
                    </Col>
                </Row>
                <Row>                    
                    <Col md={6}>
                        <TextArea name="textarea" label="TEXTAREA" rows={10}/>
                    </Col>
                </Row>                
                <Button type="submit" color="primary">Enviar</Button>
            </Form>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

InicioForm = reduxForm({ 
    form: "InicioForm", 
    validate 
})(InicioForm);

export default InicioForm;
