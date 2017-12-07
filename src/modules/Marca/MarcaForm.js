import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'reactstrap';

import Text from '../../components/Text';
import Intl from '../../components/Intl';
import File from '../../components/File';

class MarcaForm extends Component {

    componentDidMount() {
        if(this.props.data) {
            this.props.dispatch(this.props.initialize(this.props.data));
        }
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
        return (
            <Form onSubmit={handleSubmit(this.props.doSubmit)}>
                <h4><Intl str='marca'></Intl></h4>

                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100} required={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <File name="logomarca" 
                            label={<Intl str='logomarca'></Intl>} 
                            required={true} 
                            width={200} height={200}
                            placeholder={<Intl str="miniatura-placeholder"></Intl>}
                            help={<Intl str="logomarca-help"></Intl>}
                            accept="image/jpeg, image/png"
                            maxSize={500*1024}
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <File name="imagemThumbnail" 
                            label={<Intl str='miniatura'></Intl>} 
                            required={true} 
                            width={200} height={200}
                            placeholder={<Intl str="miniatura-placeholder"></Intl>}
                            help={<Intl str="miniatura-help"></Intl>}
                            accept="image/jpeg, image/png"
                            maxSize={500*1024}
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <File name="imagemFundoApp" 
                            label={<Intl str='imagem-fundo-app'></Intl>} 
                            required={true} 
                            width={200} height={200}
                            placeholder={<Intl str="miniatura-placeholder"></Intl>}
                            help={<Intl str="imagem-fundo-app-help"></Intl>}
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
                <Link className="btn btn-secondary" to="/marcas">
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

MarcaForm = reduxForm({ 
    form: "MarcaForm", 
    validate 
})(MarcaForm);
    
export default MarcaForm;
