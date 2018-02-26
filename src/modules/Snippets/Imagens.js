import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import Intl from '../../components/Intl';
import Card, { CardHeader, CardBody } from '../../components/Card';
import File from '../../components/File';

class Imagens extends Component {
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
                    {!meta.error && (!fields || fields.length === 0) && <Intl str='nenhuma-imagem-encontrada'></Intl>}    
                    {meta.error && <span className="fields-error">{meta.error}</span>}
                    <Row>
                    {fields.map((field, index) => {
                        return (
                            <Col xs={12} md={4} key={index}> 
                                <Row>
                                    <Col xs={8} md={10}>
                                        <File name={`${field}.imagem`} 
                                            label={<Intl str='imagem'></Intl>} 
                                            width={200} height={200}
                                            placeholder={<Intl str="miniatura-placeholder"></Intl>}
                                            help={<Intl str="imagem-plano-help"></Intl>}
                                            accept="image/jpeg, image/png"
                                            maxSize={500*1024}
                                            required={this.props.required}
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
                </CardBody>
            </Card>
        );
    }
}

Imagens.defaultProps = {
    required: false
};

export default Imagens;
