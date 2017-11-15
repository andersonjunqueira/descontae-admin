import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button, Table } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { cpfFunctions } from '../CPF';
import Text from '../Text';
import Intl from '../Intl';
import { translate } from '../Intl/Intl.actions';

class PesquisaPessoaList extends Component {

    render() {
        const { handleSubmit, doSubmit, data, doSelecionar } = this.props;

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
                                <th className="table-w-50"><Intl str="nome"></Intl></th>
                                <th className="table-w-30 text-center"><Intl str="cpf"></Intl></th>
                                <th className="table-w-20 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data.content).map(function(key) {
                                return (<tr key={key}>
                                    <td scope="row">{data.content[key].nome}</td>
                                    <td className="text-center">{data.content[key].cpf ? cpfFunctions.applyMask(data.content[key].cpf) : ""}</td>
                                    <td className="text-center">
                                        <Button type="button" onClick={() => doSelecionar(data.content[key])} color="primary" size="sm">
                                            <Intl str="selecionar"></Intl>
                                        </Button>
                                    </td>
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
                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" placeholder={translate('nome-cpf')} maxLength={100} 
                            actionLabel={translate("pesquisar")}
                            action={handleSubmit(doSubmit)}/>
                    </Col>
                </Row>

                <div>
                    <h6><Intl str="resultado-pesquisa"></Intl></h6>
                    {content}
                </div>

            </Form>
        );
    }

}

PesquisaPessoaList = reduxForm({ 
    form: "PesquisaPessoaForm"
})(PesquisaPessoaList);

export default PesquisaPessoaList;
