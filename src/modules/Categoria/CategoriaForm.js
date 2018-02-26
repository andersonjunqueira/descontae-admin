import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'reactstrap';

import Text from '../../components/Text';
import Intl from '../../components/Intl';

class ProfileForm extends Component {

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
                    <i className="fa fa-floppy-o"></i> <Intl str='salvar' className="hidden-xs-down"></Intl>
                </Button>
                <Button type="button" disabled={pristine || submitting} onClick={() => this.props.dispatch(reset)} className="espacamento">
                    <i className="fa fa-eraser"></i> <Intl str='limpar' className="hidden-xs-down"></Intl>
                </Button>
                <Link className="btn btn-secondary" to="/categorias">
                    <i className="fa fa-ban"></i> <Intl str='cancelar' className="hidden-xs-down"></Intl>
                </Link> 

            </Form>
        );

    }
}

const validate = values => {
    const errors = {};
    return errors;
}

ProfileForm = reduxForm({ 
    form: "ProfileForm", 
    validate 
})(ProfileForm);
    
export default ProfileForm;
