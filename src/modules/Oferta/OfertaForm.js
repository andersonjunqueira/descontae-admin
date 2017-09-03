import React, { Component } from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';

import Text from '../../components/Text';
import Number from '../../components/Number';
import File from '../../components/File';
import Intl from '../../components/Intl';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import UnidadesOferta from '../Snippets/UnidadesOferta';
import SelectMarca from '../Marca/SelectMarca';
import Card, { CardHeader, CardBody } from '../../components/Card';

import { toaster } from '../../components/Notification/Notification.actions';
import { translate } from '../../components/Intl/Intl.actions';

class OfertaForm extends Component {

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

        const situacaoTypes = [
            {value: "A", text: translate("ativo")},
            {value: "I", text: translate("inativo")}
        ];

        return (
            <Form onSubmit={handleSubmit(doSubmit)}>

                <h4><Intl str='oferta'></Intl></h4>

                <Row>
                    <Col xs={12} md={8}>
                        <TextArea name="descricao" label={<Intl str='descricao'></Intl>} maxLength={500} required={true} />
                        <TextArea name="regras" label={<Intl str='regras'></Intl>} maxLength={1000} required={true} />
                        <Row>
                            <Col xs={12} md={6}>
                                <Number name="valor" label={<Intl str='valor'></Intl>} required={true} />
                            </Col>
                            <Col xs={12} md={6}>
                                <Number name="desconto" label={<Intl str='desconto'></Intl>} required={true} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6}>
                                <Select name="situacao" options={situacaoTypes} label={<Intl str='situacao'></Intl>}/>
                            </Col>
                        </Row>
                    </Col>
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
                </Row>

                <Card>
                    <CardHeader>
                        <Intl str='unidades'></Intl> 
                    </CardHeader>
                    <CardBody>
                        <Row> 
                            <Col xs={12} md={4}>
                                <SelectMarca name="marcaSelecionada" label={<Intl str='marca'/>}/>
                            </Col>
                        </Row>

                        {this.props.data && this.props.data.marcaSelecionada && (<span>OK</span>)}

                    </CardBody>
                </Card>

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

OfertaForm = reduxForm({ 
    form: "OfertaForm", 
    validate 
})(OfertaForm);

export default OfertaForm;
