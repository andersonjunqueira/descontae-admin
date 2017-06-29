import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { Form, Row, Col, Button } from 'reactstrap';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

class CategoriaForm extends Component {

    constructor(props) {
        super(props);
        this.cancelar = this.cancelar.bind(this);

        this.state = {
            id: undefined
        }
    }

    componentDidUpdate() {
        console.log(this.state.id, this.props.data);

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

CategoriaForm = reduxForm({ 
    form: "CategoriaForm", 
    validate 
})(CategoriaForm);

export default CategoriaForm;
