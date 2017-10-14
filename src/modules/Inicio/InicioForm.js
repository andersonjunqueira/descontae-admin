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
import Phone from '../../components/Phone';
import ZipCode from '../../components/ZipCode';
import Date from '../../components/Date';
import Time from '../../components/Time';
import Mask from '../../components/Mask';
import Select from '../../components/Select';
import UF from '../../components/UF';
import File from '../../components/File';
import PlainText from '../../components/PlainText';

class InicioForm extends Component {

    render() {
        const { handleSubmit, doSubmit } = this.props;
        const situacaoTypes = [
            {value: "A", text: "ATIVO"},
            {value: "I", text: "INATIVO"}
        ];
        return (
            <Form onSubmit={handleSubmit(doSubmit)}>
                <Row>
                    <Col md={4}>
                        <Text name="text" label="TEXT"/>
                    </Col>
                    <Col md={4}>
                        <Number name="number5" label="NUMBER" precision={2} step={0.1}/>
                    </Col>
                    <Col md={4}>
                        <Password name="password" label="PASSWORD"/>
                    </Col>
                </Row>                
                <Row>                    
                    <Col md={4}>
                        <Email name="email" label="EMAIL"/>
                    </Col>
                    <Col md={4}>
                        <CPF name="cpf" label="CPF"/>
                    </Col>
                    <Col md={4}>
                        <CNPJ name="cnpj" label="CNPJ"/>
                    </Col>
                </Row>                
                <Row>                    
                    <Col md={4}>
                        <Phone name="phone" label="TELEFONE"/>
                    </Col>
                    <Col md={4}>
                        <ZipCode name="zip" label="CEP"/>
                    </Col>
                    <Col md={4}>
                        <Date name="date" label="DATA"/>
                    </Col>
                </Row>                
                <Row>                    
                    <Col md={4}>
                        <Time name="time" label="HORA"/>
                    </Col>
                    <Col md={4}>
                        <Mask name="mask" label="MASCARA" mask="111.111"/>
                    </Col>
                    <Col md={4}>
                        <Select name="select" label="SELECT" options={situacaoTypes} />
                    </Col>
                </Row>
                <Row>                    
                    <Col md={4}>
                        <UF name="uf" label="UF"/>
                    </Col>
                    <Col md={4}>
                        <PlainText name="text" label="PLAIN" />
                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>                   
                <Row>                    
                    <Col md={4}>
                        <TextArea name="textarea" label="TEXTAREA" rows={10}/>
                    </Col>
                    <Col md={4}>
                        <File name="file" label="FILE"/>
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
