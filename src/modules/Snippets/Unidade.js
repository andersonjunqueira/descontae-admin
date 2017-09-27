import React, { Component, PropTypes } from 'react';
import { FieldArray } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';

import Card, { CardHeader, CardBody } from '../../components/Card';
import Intl from '../../components/Intl';
import Text from '../../components/Text';
import File from '../../components/File';
import Password from '../../components/Password';
import Time from '../../components/Time';
import Endereco from '../../components/Endereco';
import Phones from './Phones';

class renderImages extends Component {
    render() {
        const { fields, meta } = this.props; 
        return (
            <Card>
                <CardHeader>
                    <Intl str='imagens'></Intl> 
                    <Button type="button" color="success" className="pull-right" size="sm" onClick={() => fields.push()}>
                        <i className="fa fa-plus"></i>
                    </Button>
                </CardHeader>
                <CardBody>
                    {(!fields || fields.length === 0) && <Intl str='nenhuma-imagem-encontrada'></Intl>}    
                    <Row>
                    {fields.map((field, index) => {
                        return (
                            <Col xs={12} md={4} key={index}> 
                                <Row>
                                    <Col xs={8} md={10}>
                                        <File name={`${field}.imagem`} 
                                            label={<Intl str='imagem'></Intl>} 
                                            required={true} 
                                            width={200} height={200}
                                            placeholder={<Intl str="miniatura-placeholder"></Intl>}
                                            help={<Intl str="imagem-plano-help"></Intl>}
                                            accept="image/jpeg, image/png"
                                            maxSize={500*1024}
                                        />
                                    </Col>
                                    <Col xs={4} md={2}>
                                        <a className="btn btn-danger btn-sm fields-remove-button" onClick={() => { fields.remove(index); } }>
                                          <i className="fa fa-trash"></i>
                                        </a>
                                    </Col>
                                </Row>
                            </Col>

                        );
                    })}
                    </Row>
                    {meta.error && <span className="fields-error">{meta.error}</span>}
                </CardBody>
            </Card>
        );
    }
}

class Unidade extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <Text name={`${this.props.name}.nome`} label={<Intl str='nome'></Intl>} maxLength={100} required={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <Password name={`${this.props.name}.senhaValidacao`} label={<Intl str='senha-validacao'></Intl>} maxLength={100} required={true}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Time name={`${this.props.name}.inicioExpediente`} label={<Intl str='inicio-expediente'></Intl>} required={true}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Time name={`${this.props.name}.fimExpediente`} label={<Intl str='fim-expediente'></Intl>} required={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <Endereco name={`${this.props.name}.endereco`} required={true} formName={this.props.formName}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <FieldArray name={`${this.props.name}.telefones`} component={Phones} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <FieldArray name={`${this.props.name}.imagens`} component={renderImages} />
                    </Col>
                </Row>
            </div>
        );
    }

}

Unidade.propTypes = {
    formName: PropTypes.string
}

export default Unidade;
