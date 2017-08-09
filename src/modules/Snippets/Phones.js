import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import Intl from '../../components/Intl';
import Phone from '../../components/Phone';
import Card, { CardHeader, CardBody } from '../../components/Card';

class Phones extends Component {

    render() {
        const { fields, meta } = this.props; 
        return (
            <Card>
                <CardHeader>
                    <Intl str='telefones'></Intl> 
                    <Button type="button" color="success" className="pull-right" size="sm" onClick={() => fields.push()}>
                        <i className="fa fa-plus"></i>
                    </Button>
                </CardHeader>
                <CardBody>
                    {(!fields || fields.length === 0) && <Intl str='nenhum-telefone-encontrado'></Intl>}    
                    <Row>
                    {fields.map((field, index) => {
                        return (
                            <Col key={index} xs={12} md={4}>
                                <Row>
                                    <Col xs={8} md={10}>
                                        <Phone name={`${field}.numero`} label={<Intl str='telefone'></Intl>} maxLength={15}/>
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

export default Phones;
