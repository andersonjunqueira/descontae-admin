import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import { Form, Row, Col, Button } from 'reactstrap';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

class CategoriaForm extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(this.props.initialize(props.data));
    }

    render() {
        const { handleSubmit, doSubmit, pristine, reset, submitting, invalid } = this.props;
        return (
            <Form onSubmit={handleSubmit(doSubmit)}>
                <h4><Intl str='categoria'></Intl></h4>
                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100} required={true}/>
                    </Col>
                </Row>
                <Button type="submit" color="primary" disabled={invalid || submitting}>
                    <Intl str='salvar'></Intl>
                </Button>
                <Button type="button" disabled={pristine || submitting} onClick={() => this.props.dispatch(reset)} className="espacamento">
                    <Intl str='limpar'></Intl>
                </Button>
                <Button type="button" onClick={() => this.props.doCancel()} className="btn btn-secondary">
                    <Intl str='cancelar'></Intl>
                </Button>

            </Form>
        );
    }
}

CategoriaForm.propTypes = {
    data: PropTypes.object,
    doSubmit: PropTypes.func,
    doCancel: PropTypes.func
};

const validate = values => {
    const errors = {};
    return errors;
}

CategoriaForm = reduxForm({ 
    form: "CategoriaForm", 
    validate 
})(CategoriaForm);

export default CategoriaForm;
