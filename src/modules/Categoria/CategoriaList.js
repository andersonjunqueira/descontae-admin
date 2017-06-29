import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import { Form, Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

class CategoriaList extends Component {

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
        if(data && data.length > 0) {
            content = (
                <Table hover className="tabela">
                    <thead>
                        <tr>
                            <th className="categ-col-1">#</th>
                            <th className="categ-col-2"><Intl str="nome"></Intl></th>
                            <th className="categ-col-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map(function(key) {
                            return (<tr key={key}>
                                <td className="text-center" scope="row">{data[key].id}</td>
                                <td>{data[key].nome}</td>
                                <td className="text-center">
                                    <Button type="button" onClick={() => doCarregar(data[key].id)} color="secondary" size="sm">
                                        <i className="fa fa-pencil"></i>
                                    </Button>

                                    <Button type="button" onClick={() => toggle(data[key]) } color="danger" size="sm" className="espacamento">
                                        <i className="fa fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </Table>);
        }

        return (
            <Form onSubmit={handleSubmit(doSubmit)}>
                <h4><Intl str='pesquisa-categorias'></Intl></h4>
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
                    <Intl str='nova-categoria'></Intl>
                </Button>

                <div>
                    <h6><Intl str="resultado-pesquisa"></Intl></h6>
                    {content}
                </div>

                <Modal isOpen={this.state.modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}><Intl str="confirmacao-exclusao"></Intl></ModalHeader>
                    <ModalBody>
                        <Intl str="categoria-excluir-mensagem" params={[this.state.modalParam.nome]}></Intl>
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

CategoriaList = reduxForm({ 
    form: "CategoriaList", 
    validate 
})(CategoriaList);

export default CategoriaList;
