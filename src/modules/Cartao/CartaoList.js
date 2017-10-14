import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { cpfFunctions } from '../../components/CPF';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

class CartaoList extends Component {

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
        this.props.doExcluir(this.state.modalParam[0]);
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
                                <th className="table-w-5 text-center"><Intl str="ativo"></Intl></th>
                                <th className="table-w-10 text-center"><Intl str="codigo"></Intl></th>
                                <th className="table-w-15 text-center"><Intl str="cpf"></Intl></th>
                                <th className="table-w-30"><Intl str="usuario"></Intl></th>
                                <th className="table-w-30"><Intl str="assinante"></Intl></th>
                                <th className="table-w-10 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data.content).map(function(key) {
                                return (<tr key={key}>
                                    <td className="text-center"><i className={"fa fa-credit-card " + (data.content[key][5] === 'A' ? "text-success" : "text-danger")}></i></td>
                                    <td className="text-center">{data.content[key][1]}</td>
                                    <td className="text-center">{data.content[key][3] ? cpfFunctions.applyMask(data.content[key][3]) : ""}</td>
                                    <td>{data.content[key][2] ? data.content[key][2] : ""}</td>
                                    <td>{data.content[key][4] ? data.content[key][4] : "" }</td>
                                    <td className="text-center">
                                        <Button type="button" onClick={() => doCarregar(data.content[key][0])} color="secondary" size="sm">
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
                <h4><Intl str='pesquisa-cartoes'></Intl></h4>
                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='numero-nome'></Intl>} maxLength={100}/>
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
                    <Intl str='novo-cartao'></Intl>
                </Button>

                <div>
                    <h6><Intl str="resultado-pesquisa"></Intl></h6>
                    {content}
                </div>

                <Modal isOpen={this.state.modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}><Intl str="confirmacao-exclusao"></Intl></ModalHeader>
                    <ModalBody>
                        <Intl str="cartao-excluir-mensagem" params={[this.state.modalParam[1]]}></Intl>
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

CartaoList = reduxForm({ 
    form: "CartaoList", 
    validate 
})(CartaoList);

export default CartaoList;
