import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'reactstrap';

import Intl from '../../components/Intl';
import TextArea from '../../components/TextArea';
import Text from '../../components/Text';
import File from '../../components/File';
import Number from '../../components/Number';
import Select from '../../components/Select';
import SimNaoSelect from '../../components/SimNaoSelect';

import { translate } from "../../components/Intl/Intl.actions";

class PlanoForm extends Component {

    componentDidMount() {
        if(this.props.data) {
            this.props.dispatch(this.props.initialize(this.props.data));
        }
    }

    render() {
        const situacaoTypes = [
            {value: "A", text: translate("ativo")},
            {value: "I", text: translate("inativo")}
        ];

        const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
        return (
            <Form onSubmit={handleSubmit(this.props.doSubmit)}>
                <h4><Intl str='plano'></Intl></h4>
                
                <Row>
                    <Col xs={12} md={8}>
                        <Row>
                            <Col xs={12} md={12}>
                                <Text name="titulo" label={<Intl str='titulo'></Intl>} maxLength={30} required={true}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <TextArea name="descricao" label={<Intl str='descricao'></Intl>} maxLength={500}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4}>
                                <Number name="valor" label={<Intl str='valor'></Intl>} required={true} step={0.1} precision={2} min={0}/>
                            </Col>
                            <Col xs={12} md={4}>
                                <Select name="situacao" options={situacaoTypes} label={<Intl str='situacao'></Intl>}/>
                            </Col>
                            <Col xs={12} md={4}>
                                <SimNaoSelect name="mostraApp" label={<Intl str='mostra-app'></Intl>}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={4}>
                        <File name="imagem" 
                            label={<Intl str='imagem'></Intl>} 
                            required={true} 
                            width={200} height={200}
                            placeholder={<Intl str="miniatura-placeholder"></Intl>}
                            help={<Intl str="imagem-plano-help"></Intl>}
                            accept="image/jpeg, image/png"
                            maxSize={500*1024}
                        />
                    </Col>
                </Row>

                <Button type="submit" color="primary" disabled={invalid || submitting}>
                    <i className="fa fa-floppy-o"></i> <Intl str='salvar' className="hidden-xs-down"></Intl>
                </Button>
                <Button type="button" disabled={pristine || submitting} onClick={() => this.props.dispatch(reset)} className="espacamento">
                    <i className="fa fa-eraser"></i> <Intl str='limpar' className="hidden-xs-down"></Intl>
                </Button>
                <Link className="btn btn-secondary" to="/planos">
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

PlanoForm = reduxForm({ 
    form: "PlanoForm", 
    validate 
})(PlanoForm);
    
export default PlanoForm;
