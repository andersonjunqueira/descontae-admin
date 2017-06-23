import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change, FieldArray } from 'redux-form';

import { Form, Row, Col, Button } from 'reactstrap';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

import { toaster } from "../../app/Notification.actions";
import { translate } from "../../components/Intl/Intl.actions";

class CategoriaList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialized: false
        }
    }

    render() {
        const { handleSubmit, doSubmit, pristine, reset, submitting, invalid } = this.props;
        return (
            <Form onSubmit={handleSubmit(doSubmit)}>

                <h4><Intl str='categorias'></Intl></h4>

                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100} required={true}/>
                    </Col>
                </Row>

                <Button type="submit" color="primary" disabled={invalid || submitting}><Intl str='salvar'></Intl></Button>
                <Button type="button" disabled={pristine || submitting} onClick={() => this.props.dispatch(reset)}><Intl str='limpar'></Intl></Button>

            </Form>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

CategoriaList = reduxForm({ 
    form: "CategoriaList", 
    validate 
})(CategoriaList);

export default CategoriaList;
