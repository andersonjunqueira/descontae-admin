import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { Form, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import PaginationBar from '../../components/PaginationBar';
import SimpleTable from '../../components/SimpleTable';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

class MarcaList extends Component {

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

    reset() {
        this.props.dispatch(this.props.reset);
        this.props.doSubmit({});
    }

    render() {
        const toggle = (value) => this.showModal(value);
        const { data, doSubmit, doDelete, doSetPage, doSetOrderBy, handleSubmit, pristine, submitting, invalid } = this.props;
        const headers = [
            { classNames: 'table-xs-75 table-sm-85 table-md-85 table-lg-90', label: (<Intl str="nome"></Intl>), orderField: 'nome' },
            { classNames: 'table-xs-25 table-sm-15 table-md-15 table-lg-10 text-center' }
        ];

        return (
            <Form onSubmit={handleSubmit(doSubmit)}>
                <h4><Intl str='pesquisa-marcas'></Intl></h4>

                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100}/>
                    </Col>
                </Row>
                <Button type="submit" color="primary" disabled={invalid || submitting}>
                    <i className="fa fa-search"></i> <Intl str='pesquisar' className="hidden-xs-down"></Intl>
                </Button>
                <Button type="button" disabled={pristine || submitting} onClick={this.reset.bind(this)} className="espacamento">
                    <i className="fa fa-eraser"></i> <Intl str='limpar' className="hidden-xs-down"></Intl>
                </Button>
                <Link className="btn btn-secondary" to="/categorias/novo">
                    <i className="fa fa-plus"></i> <Intl str='nova-marca' className="hidden-xs-down"></Intl>
                </Link>

                <hr />
                <h6><Intl str="resultado-pesquisa"></Intl></h6>
                {(!data || data.totalElements === 0) && <Intl str="nenhum-registro-encontrado"></Intl>}
                {(data && data.totalElements > 0) && (<div>

                    <SimpleTable headers={headers} dataSort={data.sort} setOrderBy={doSetOrderBy}>
                        {Object.keys(data.content).map(function(key) {
                            const r = data.content[key];
                            return (<tr key={key}>
                                <td>{r.nome}</td>
                                <td className="text-right">
                                    <Link className="btn btn-secondary btn-sm" to={`/categorias/${r.id}`}>
                                        <i className="fa fa-pencil"></i>
                                    </Link>
                                    <Button onClick={() => toggle(r)} color="danger" size="sm" className="espacamento">
                                        <i className="fa fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>);
                        })}
                    </SimpleTable>
                    <PaginationBar data={data} selectPage={doSetPage}/>

                    <Modal isOpen={this.state.modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}><Intl str="confirmacao-exclusao"></Intl></ModalHeader>
                        <ModalBody>
                            <Intl str="marca-excluir-mensagem" params={[this.state.modalParam.nome]}></Intl>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => { doDelete(this.state.modalParam.id); toggle({}); }}><Intl str="excluir"></Intl></Button>
                            <Button color="secondary" onClick={toggle} className="espacamento"><Intl str="cancelar"></Intl></Button>
                        </ModalFooter>
                    </Modal>

                </div>)}

        </Form>);
    }
    
}

const validate = values => {
    const errors = {};
    return errors;
}

MarcaList = reduxForm({ 
    form: "MarcaList", 
    validate 
})(MarcaList);

export default MarcaList;
