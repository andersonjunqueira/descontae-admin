import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';

import Intl from '../../components/Intl';
import TextArea from '../../components/TextArea';
import Text from '../../components/Text';
import File from '../../components/File';
import Number from '../../components/Number';
import Select from '../../components/Select';

import { translate } from "../../components/Intl/Intl.actions";

class PlanoForm extends Component {

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
        const situacaoTypes = [
            {value: "A", text: translate("ativo")},
            {value: "I", text: translate("inativo")}
        ];
        const { handleSubmit, doSubmit, pristine, reset, submitting, invalid} = this.props;
        return (
            <Form onSubmit={handleSubmit(doSubmit)}>

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
                            <Col xs={12} md={6}>
                                <Number name="valor" label={<Intl str='valor'></Intl>} required={true} step={0.1} precision={2} min={0}/>
                            </Col>
                            <Col xs={12} md={6}>
                                <Select name="situacao" options={situacaoTypes} label={<Intl str='situacao'></Intl>}/>
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

PlanoForm = reduxForm({ 
    form: "PlanoForm", 
    validate 
})(PlanoForm);

export default PlanoForm;
