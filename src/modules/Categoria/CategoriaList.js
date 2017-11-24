import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import PaginationBar from '../../components/PaginationBar';
import SimpleTable from '../../components/SimpleTable';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

class CategoriaList extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);

        this.state = {
            modal: false,
            modalParam: ""
        };

    }

    showModal(value) {
        this.setState({
            modal: !this.state.modal,
            modalParam: value
        });
    }

    render() {
        const toggle = (value) => this.showModal(value);
        const { data, doSetPage, doSubmit, doFetchOne, handleSubmit, pristine, submitting, invalid } = this.props;
        const headers = [
            { label: (<Intl str="nome"></Intl>), classNames: 'table-w-75' },
            { classNames: 'table-w-20 text-center' }
        ];

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
                <Button type="button" disabled={pristine || submitting} onClick={() => this.props.dispatch(this.props.reset)} className="espacamento">
                    <Intl str='limpar'></Intl>
                </Button>
                <Button type="button" onClick={() => this.props.doAdd()} color="secondary">
                    <i className="fa fa-plus"></i><Intl str='nova-categoria'></Intl>
                </Button>

                <div>
                    <h6><Intl str="resultado-pesquisa"></Intl></h6>
                    
                    {(!data || data.totalElements === 0) && <Intl str="nenhum-registro-encontrado"></Intl>}
                    {(data && data.totalElements > 0) && (
                        <div>
                            <SimpleTable headers={headers}>
                                {Object.keys(data.content).map(function(key) {
                                    const r = data.content[key];
                                    return (<tr key={key}>
                                        <td>{r.nome}</td>
                                        <td className="text-center">
                                            <Button onClick={() => doFetchOne(r.id)} color="secondary" size="sm">
                                                <i className="fa fa-pencil"></i>
                                            </Button>
                                            <Button onClick={() => toggle(r)} color="danger" size="sm" className="espacamento">
                                                <i className="fa fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>);
                                })}
                            </SimpleTable>
                            <PaginationBar data={data} selectPage={doSetPage}/>
                        </div>
                    )}
                </div>
                <Modal isOpen={this.state.modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}><Intl str="confirmacao-exclusao"></Intl></ModalHeader>
                    <ModalBody>
                        <Intl str="categoria-excluir-mensagem" params={[this.state.modalParam.nome]}></Intl>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { this.props.doDelete(this.state.modalParam.id); toggle({}); }}><Intl str="excluir"></Intl></Button>
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

CategoriaList.propTypes = {
    data: PropTypes.object,
    doSubmit: PropTypes.func,
    doAdd: PropTypes.func,
    doDelete: PropTypes.func,
    doFetchOne: PropTypes.func,
    doSetPage: PropTypes.func
};

CategoriaList = reduxForm({ 
    form: "CategoriaList", 
    validate 
})(CategoriaList);

export default CategoriaList;
