import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import Text from '../../components/Text';
import Intl from '../../components/Intl';
import Select from '../../components/Select';

import { translate } from "../../components/Intl/Intl.actions";

class OfertaList extends Component {

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

        const situacaoTypes = [
            {value: "A", text: translate("ativo")},
            {value: "I", text: translate("inativo")}
        ];

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
                            <th className="table-w-10 text-center">#</th>
                            <th className="table-w-50"><Intl str="oferta"></Intl></th>
                            <th className="table-w-20 text-center"><Intl str="marca"></Intl></th>
                            <th className="table-w-20 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data.content).map(function(key) {
                                return (<tr key={key}>
                                    <td className="text-center" scope="row">{data.content[key][0]}</td>
                                    <td>{data.content[key][1]}</td>
                                    <td className="text-center">{data.content[key][2]}</td>
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
                <h4><Intl str='pesquisa-ofertas'></Intl></h4>
                <Row>
                    <Col xs={12} md={8}>
                        <Text name="texto" label={<Intl str='texto'></Intl>} maxLength={100}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Select name="situacao" options={situacaoTypes} label={<Intl str='situacao'></Intl>}/>
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
                    <Intl str='nova-oferta'></Intl>
                </Button>

                <div>
                    <h6><Intl str="resultado-pesquisa"></Intl></h6>
                    {content}
                </div>

                <Modal isOpen={this.state.modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}><Intl str="confirmacao-exclusao"></Intl></ModalHeader>
                    <ModalBody>
                        <Intl str="oferta-excluir-mensagem" params={[this.state.modalParam[1]]}></Intl>
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

OfertaList = reduxForm({ 
    form: "OfertaList", 
    validate 
})(OfertaList);

export default OfertaList;
