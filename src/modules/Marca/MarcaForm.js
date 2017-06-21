import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change, FieldArray } from 'redux-form';

import { Form, Row, Col, Button } from 'reactstrap';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

import { toaster } from "../../app/Notification.actions";
import { translate } from "../../components/Intl/Intl.actions";

class MarcaForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialized: false
        }
    }

    componentDidUpdate() {
//        if(!this.state.initialized && Object.keys(this.props.data).length > 0) {
//            this.props.dispatch(this.props.initialize(this.props.data));
//            this.setState(Object.assign(this.state, { initialized: true }));
//        }
    }

    render() {
        const { handleSubmit, doSubmit, pristine, reset, submitting, invalid } = this.props;
        return (
            <Form onSubmit={handleSubmit(doSubmit)}>

                <h4><Intl str='marca-franquia'></Intl></h4>

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

MarcaForm = reduxForm({ 
    form: "MarcaForm", 
    validate 
})(MarcaForm);

export default MarcaForm;
