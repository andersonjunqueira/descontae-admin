import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { cnpjFunctions } from '../../components/CNPJ';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

class ParceiroList extends Component {

    constructor(props) {
        super(props);
        this.limpar = this.limpar.bind(this);
        this.toggle = this.toggle.bind(this);
        this.excluir = this.excluir.bind(this);

        this.state = {
            modal: false,
            modalParam: ""
        };

    }

    toggle(value) {
        this.setState({
            modal: !this.state.modal,
            modalParam: value
        });
    }

    limpar() {
        this.props.dispatch(this.props.reset);
        this.props.doLimpar();
    }

    excluir(value) {
        this.props.doExcluir(this.state.modalParam.id);
        this.toggle({});
    }

    render() {
        const { handleSubmit, doSubmit, pristine, submitting, invalid, data, doCarregar } = this.props;
        const toggle = (value) => this.toggle(value);

        let content = (<Intl str="nenhum-registro-encontrado"></Intl>);
        if(data && data.totalElements > 0) {
            let paginationLinks = [];
            if(data.totalPages > 1) {
                if(!data.first) {
                    paginationLinks.push({ icon: "fa fa-step-backward", page: 0});
                }

                for (let i=0; i < data.totalPages; i++) {
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
                                <th className="categ-col-1">#</th>
                                <th className="categ-col-2"><Intl str="nome"></Intl></th>
                                <th className="categ-col-3"><Intl str="cnpj"></Intl></th>
                                <th className="categ-col-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data.content).map(function(key) {
                                return (<tr key={key}>
                                    <td className="text-center" scope="row">{data.content[key].id}</td>
                                    <td>{data.content[key].nome}</td>
                                    <td className="text-center">{cnpjFunctions.applyMask(data.content[key].cnpj)}</td>
                                    <td className="text-center">
                                        <Button type="button" onClick={() => doCarregar(data.content[key].id)} color="secondary" size="sm">
                                            <i className="fa fa-pencil"></i>
                                        </Button>

                                        <Button type="button" onClick={() => toggle(data.content[key]) } color="danger" size="sm" className="espacamento">
                                            <i className="fa fa-trash"></i>
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
                <h4><Intl str='pesquisa-parceiros'></Intl></h4>
                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100}/>
                    </Col>
                </Row>

                <Button type="submit" color="primary" disabled={invalid || submitting}>
                    <i className="fa fa-search"></i>
                    <Intl str='pesquisar'></Intl>
                </Button>

                <Button type="button" disabled={pristine || submitting} onClick={() => this.limpar()} className="espacamento">
                    <Intl str='limpar'></Intl>
                </Button>

                <Button type="button" onClick={() => this.props.doNovo()} color="secondary">
                    <i className="fa fa-plus"></i>
                    <Intl str='novo-parceiro'></Intl>
                </Button>

                <div>
                    <h6><Intl str="resultado-pesquisa"></Intl></h6>
                    {content}
                </div>

                <Modal isOpen={this.state.modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}><Intl str="confirmacao-exclusao"></Intl></ModalHeader>
                    <ModalBody>
                        <Intl str="parceiro-excluir-mensagem" params={[this.state.modalParam.nome]}></Intl>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.excluir()}><Intl str="excluir"></Intl></Button>
                        <Button color="secondary" onClick={toggle} className="espacamento"><Intl str="cancelar"></Intl></Button>
                    </ModalFooter>
                </Modal>

            </Form>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

ParceiroList = reduxForm({ 
    form: "ParceiroList", 
    validate 
})(ParceiroList);

export default ParceiroList;
