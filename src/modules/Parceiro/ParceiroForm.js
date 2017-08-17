import React, { Component } from 'react';
import { FieldArray, reduxForm, change } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';

import Text from '../../components/Text';
import CNPJ from '../../components/CNPJ';
import Email from '../../components/Email';
import SelectCategoria from '../Categoria/SelectCategoria';
import SelectMarca from '../Marca/SelectMarca';
import Phones from '../Snippets/Phones';
import Unidades from '../Snippets/Unidades';
import Intl from '../../components/Intl';

import { toaster } from '../../components/Notification/Notification.actions';

class ParceiroForm extends Component {

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
        return (
            <Form onSubmit={handleSubmit(doSubmit)}>

                <h4><Intl str='parceiro'></Intl></h4>

                <Row>
                    <Col xs={12} md={8}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100} required={true}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <CNPJ name="cnpj" label={<Intl str='cnpj'></Intl>} required={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Text name="nomeFantasia" label={<Intl str='nome-fantasia'></Intl>} maxLength={100} required={true}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <Email name="email" label={<Intl str='email-responsavel'></Intl>} required={true} maxLength={100}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <SelectCategoria name="categoria.id" label={<Intl str='categoria'></Intl>} required={true}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <SelectMarca name="marca.id" label={<Intl str='marca'></Intl>} required={true}/>
                    </Col>
                </Row>

                <FieldArray name="telefones" component={Phones} />

                <FieldArray name="unidades" component={Unidades} formName="ParceiroForm"/>

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