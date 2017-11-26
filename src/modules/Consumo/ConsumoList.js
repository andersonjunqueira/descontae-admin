import React, { Component } from 'react';
import { reduxForm, change } from 'redux-form';
import { Form, Row, Col, Button, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import PesquisaCliente from '../../components/PesquisaCliente';
import SelectCidade from '../../components/SelectCidade';
import Date from '../../components/Date';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

import { translate } from '../../components/Intl/Intl.actions';

class ConsumoList extends Component {

    constructor(props) {
        super(props);
        this.limpar = this.limpar.bind(this);
        this.modalClienteToggle = this.modalClienteToggle.bind(this);
        this.selecionarCliente = this.selecionarCliente.bind(this);

        this.state = {
            modalClienteOpen: false
        };
    }

    modalClienteToggle() {
        this.setState({
            modalClienteOpen: !this.state.modalClienteOpen
        });
    }

    selecionarCliente(value) {
        if(value) {
            this.props.dispatch(change('ConsumoList', 'cliente', value));
        }
        this.modalClienteToggle();
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
                    <Col xs={12} md={4}>
                        <SelectCidade name="cidade.id" label={<Intl str='cidade'></Intl>}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Date name="inicio" label={<Intl str='inicio-periodo'></Intl>}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Date name="fim" label={<Intl str='fim-periodo'></Intl>}/>
                    </Col>
                </Row>
                
                {this.props.showClienteSearch && (
                    <Row>
                        <Col xs={12} md={6}>
                            <Text name="cliente.nome" label={<Intl str='cliente'></Intl>} maxLength={50} disabled={true}
                                actionLabel={translate("pesquisar")}
                                action={this.modalClienteToggle}/>
                        </Col>
                    </Row>
                )}

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

                <Modal isOpen={this.state.modalClienteOpen} toggle={this.modalClienteToggle} size="lg">
                    <ModalHeader toggle={this.modalClienteToggle}><Intl str="pesquisa-clientes"></Intl></ModalHeader>
                    <ModalBody>
                        <PesquisaCliente doSelecionar={this.selecionarCliente}/>
                    </ModalBody>
                </Modal>                  
            </Form>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

ConsumoList.defaultProps = {
    showClienteSearch: false
};

ConsumoList = reduxForm({ 
    form: "ConsumoList", 
    validate 
})(ConsumoList);

export default ConsumoList;
