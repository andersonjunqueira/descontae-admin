import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';

import Text from '../../components/Text';
import Number from '../../components/Number';

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
                        <Number name="number" label="NUMBER"/>
                        <Number name="number1" label="NUMBER" min={10}/>
                        <Number name="number2" label="NUMBER" max={99}/>
                        <Number name="number3" label="NUMBER" min={10} max={99}/>
                        <Number name="number4" label="NUMBER" precision={2}/>
                        <Number name="number5" label="NUMBER" precision={2} step={0.1}/>
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
