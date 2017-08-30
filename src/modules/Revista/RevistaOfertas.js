import React, { Component } from 'react';
import { Row, Col, Button, Table } from 'reactstrap';

import Intl from '../../components/Intl';
import Phone from '../../components/Phone';
import Card, { CardHeader, CardBody } from '../../components/Card';

class RevistaOfertas extends Component {

    render() {
        const { fields, meta } = this.props; 
        return (
            <Card>
                <CardHeader>
                    <Intl str='ofertas'></Intl> 
                    <Button type="button" color="success" className="pull-right" size="sm" onClick={() => fields.push()}>
                        <i className="fa fa-plus"></i>
                    </Button>
                </CardHeader>
                <CardBody>
                    {(!fields || fields.length === 0) && <Intl str='nenhuma-oferta-encontrada'></Intl>}
                    {(fields && fields.length !== 0) && (
                        <Table hover size="sm" className="tabela">
                            <thead>
                                <tr>
                                    <th className="table-w-10 text-center">#</th>
                                    <th className="table-w-50"><Intl str="oferta"></Intl></th>
                                    <th className="table-w-20"><Intl str="marca"></Intl></th>
                                    <th className="table-w-20 text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {fields && fields.map((field, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{field.oferta.id}</td>
                                        <td>{field.oferta.descricao}</td>
                                        <td>{field.marca.nome}</td>
                                        <td></td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </Table>
                    )}
                    {meta.error && <span className="fields-error">{meta.error}</span>}
                </CardBody>
            </Card>
        );
    }
}

export default RevistaOfertas;
