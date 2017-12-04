import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'reactstrap';

import Text from '../../components/Text';
import Intl from '../../components/Intl';

class CategoriaForm extends Component {

    componentDidMount() {
        if(this.props.data) {
            this.props.dispatch(this.props.initialize(this.props.data));
        }
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
        return (
            <Form onSubmit={handleSubmit(this.props.doSubmit)}>
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
                <Link className="btn btn-secondary" to="/categorias">
                    <Intl str='cancelar'></Intl>
                </Link> 

            </Form>
        );

    }
}

const validate = values => {
    const errors = {};
    return errors;
}

CategoriaForm = reduxForm({ 
    form: "CategoriaForm", 
    validate 
})(CategoriaForm);
    
export default CategoriaForm;
