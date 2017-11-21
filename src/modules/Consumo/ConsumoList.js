import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button, Table } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import Text from '../../components/Text';
import Intl from '../../components/Intl';

class ConsumoList extends Component {

    constructor(props) {
        super(props);
        this.limpar = this.limpar.bind(this);
    }

    limpar() {
        this.props.dispatch(this.props.reset);
        this.props.doLimpar();
    }

    render() {
        const { handleSubmit, doSubmit, invalid, submitting, data } = this.props;
        let content = (<Intl str="nenhum-registro-encontrado"></Intl>);
        if(data && data.totalElements > 0) {
            let paginationLinks = [];
            if(data.totalPages > 1) {
                if(!data.first) {
                    paginationLinks.push({ icon: "fa fa-step-backward", page: 0});
                }

                let start = data.number - 4;
                let last = data.number + 5;

                if(start < 0) {
                    start = 0;
                }

                if(last > data.totalPages) {
                    last = data.totalPages;
                }

                for (let i=start; i < last; i++) {
                    paginationLinks.push({ text: i+1, page: i, active: i === data.number});
                }

                if(!data.last) {
                    paginationLinks.push({ icon: "fa fa-step-forward", page: data.totalPages-1});
                }
            }

            content = (
                <div>
                    <Table hover size="sm" className="tabela">
                    <thead>
                        <tr>
                            <th className="table-w-5 text-center"><Intl str="cartao"></Intl></th>
                            <th className="table-w-15"><Intl str="bairro"></Intl></th>
                            <th className="table-w-15"><Intl str="cidade"></Intl></th>
                            <th className="table-w-5 text-center"><Intl str="uf"></Intl></th>
                            <th className="table-w-20"><Intl str="usuario"></Intl></th>
                            <th className="table-w-10 text-center"><Intl str="marca"></Intl></th>
                            <th className="table-w-30"><Intl str="oferta"></Intl></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data.content).map(function(key) {
                            const r = data.content[key];
                            return (<tr key={r.consumoId}>
                                <td className="text-center" scope="row">{r.numeroCartao}</td>
                                <td>{r.bairro}</td>
                                <td>{r.cidade}</td>
                                <td className="text-center">{r.uf}</td>
                                <td>{r.nomeUsuario}</td>
                                <td className="text-center">{r.marca}</td>
                                <td>{r.oferta}</td>
                            </tr>);
                        })}
                    </tbody>
                    </Table>
                    {paginationLinks.length > 0 && (
                        <Row>
                            <Col xs={12} md={12}>
                                <Pagination className="pull-right">
                                    {paginationLinks.map( (item, index) => {
                                        return (<PaginationItem key={index} active={item.active}>
                                            <PaginationLink onClick={() => { this.props.doSetPage(item.page); }}>
                                                <i className={"fa " + item.icon}></i>
                                                {item.text}
                                            </PaginationLink>
                                        </PaginationItem>)
                                    })}
                                </Pagination>
                            </Col>
                        </Row>
                    )}
                </div>
            );
        }

        return (
            <Form onSubmit={handleSubmit(doSubmit)}>
                <h4><Intl str='pesquisa-consumos'></Intl></h4>
                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100}/>
                    </Col>
                </Row>

                <Button type="submit" color="primary" disabled={invalid || submitting}>
                    <i className="fa fa-search"></i>
                    <Intl str='pesquisar'></Intl>
                </Button>

                <Button type="button" onClick={() => this.limpar()} className="espacamento">
                    <Intl str='limpar'></Intl>
                </Button>

                <div>
                    <h6><Intl str="resultado-pesquisa"></Intl></h6>
                    {content}
                </div>
            </Form>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

ConsumoList = reduxForm({ 
    form: "ConsumoList", 
    validate 
})(ConsumoList);

export default ConsumoList;
