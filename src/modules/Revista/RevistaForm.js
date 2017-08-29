import React, { Component } from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';

import Text from '../../components/Text';
import TextArea from '../../components/TextArea';
import File from '../../components/File';
import Date from '../../components/Date';
import Intl from '../../components/Intl';

import RevistaOfertas from './RevistaOfertas';

class RevistaForm extends Component {

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

                <h4><Intl str='revista'></Intl></h4>

                <Row>
                    <Col xs={12} md={4}>
                        <Text name="edicao" label={<Intl str='edicao'></Intl>} maxLength={100} required={true}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Date name="inicioVigencia" label={<Intl str='inicio-vigencia'></Intl>} required={true}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Date name="fimVigencia" label={<Intl str='inicio-vigencia'></Intl>} required={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <TextArea name="descricao" label={<Intl str='nome-fantasia'></Intl>} maxLength={100} required={true}/>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={4}>
                        <File name="imagem" 
                            label={<Intl str='miniatura'></Intl>} 
                            required={true} 
                            width={200} height={200}
                            placeholder={<Intl str="miniatura-placeholder"></Intl>}
                            help={<Intl str="imagem-plano-help"></Intl>}
                            accept="image/jpeg, image/png"
                            maxSize={500*1024}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <File name="pdf" 
                            label={<Intl str='pdf'></Intl>} 
                            required={true} 
                            width={200} height={200}
                            placeholder={<Intl str="pdf-revista-placeholder"></Intl>}
                            help={<Intl str="pdf-revista-help"></Intl>}
                            accept="application/pdf"
                            maxSize={1024*1024*3}/>
                    </Col>
                </Row>

                <FieldArray name="ofertas" component={RevistaOfertas} />

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

RevistaForm = reduxForm({ 
    form: "RevistaForm", 
    validate 
})(RevistaForm);

export default RevistaForm;
