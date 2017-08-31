import React, { Component } from 'react';
import { Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Intl from '../../components/Intl';
import Card, { CardHeader, CardBody } from '../../components/Card';
import TextArea from '../../components/TextArea';
import File from '../../components/File';
import Number from '../../components/Number';
import Select from '../../components/Select';
import SelectMarca from '../../modules/Marca/SelectMarca';

import { translate } from "../../components/Intl/Intl.actions";

class RevistaOfertas extends Component {

    constructor(props) {
        super(props);
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.excluir = this.excluir.bind(this);

        this.state = {
            editModal: false,
            editModalData: "",
            deleteModal: false,
            deleteModalData: { oferta: {} }
        };

    }

    toggleEditModal(value) {
        this.setState({
            editModal: !this.state.editModal,
            editModalData: value
        });
    }

    toggleDeleteModal(value) {
        if(value) {
            this.setState({
                deleteModal: !this.state.deleteModal,
                deleteModalData: value
            });
        } else {
            this.excluir()
        }
    }

    closeEditModal() {
        this.toggleEditModal({ oferta: {} });
    }

    closeDeleteModal() {
        this.toggleDeleteModal({ oferta: {} });
    }

    excluir(value) {
        this.toggleDeleteModal({});
    }

    render() {
        const { fields, meta } = this.props;
        const situacaoTypes = [
            {value: "A", text: translate("ativo")},
            {value: "I", text: translate("inativo")}
        ];

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
                                    <th className="table-w-20 text-center"><Intl str="marca"></Intl></th>
                                    <th className="table-w-20 text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {fields && fields.map((name, index) => {
                                const item = this.props.fields.get(index);

                                return (
                                    <tr key={index}>
                                        <td className="text-center">{item ? item.oferta.id : ""}</td>
                                        <td>{item ? item.oferta.descricao : "(nova)"}</td>
                                        <td className="text-center">{item ? item.marca.nome : ""}</td>
                                        <td className="text-center">
                                            <Button type="button" onClick={() => this.toggleEditModal(`${name}`) } color="secondary" size="sm">
                                                <i className="fa fa-pencil"></i>
                                            </Button>

                                            <Button type="button" onClick={() => this.toggleDeleteModal(item) } color="danger" size="sm" className="espacamento">
                                                <i className="fa fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>);
                            })}
                            </tbody>
                        </Table>
                    )}
                    {meta.error && <span className="fields-error">{meta.error}</span>}

                    <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal}>
                        <ModalHeader toggle={this.toggleDeleteModal}><Intl str="confirmacao-exclusao"></Intl></ModalHeader>
                        <ModalBody>
                            <Intl str="revista-excluir-mensagem" params={[this.state.deleteModalData.oferta.descricao]}></Intl>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.excluir()}><Intl str="excluir"></Intl></Button>
                            <Button color="secondary" onClick={this.closeDeleteModal} className="espacamento"><Intl str="cancelar"></Intl></Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal} size="lg">
                        <ModalHeader toggle={this.toggleDeleteModal}><Intl str="editar-oferta"></Intl></ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col xs={12} md={8}>
                                    <TextArea name={`${this.state.editModalData}.oferta.descricao`} label={<Intl str='descricao'></Intl>} maxLength={500} required={true} />
                                    <TextArea name={`${this.state.editModalData}.oferta.regras`} label={<Intl str='regras'></Intl>} maxLength={1000} required={true} />
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Number name={`${this.state.editModalData}.oferta.valor`} label={<Intl str='valor'></Intl>} required={true} />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Number name={`${this.state.editModalData}.oferta.desconto`} label={<Intl str='desconto'></Intl>} required={true} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Select name="situacao" options={situacaoTypes} label={<Intl str='situacao'></Intl>}/>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <SelectMarca name="marca" label={<Intl str='situacao'></Intl>}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} md={4}>
                                    <File name={`${this.state.editModalData}.oferta.imagem`} 
                                        label={<Intl str='miniatura'></Intl>} 
                                        required={true} 
                                        width={200} height={200}
                                        placeholder={<Intl str="miniatura-placeholder"></Intl>}
                                        help={<Intl str="imagem-plano-help"></Intl>}
                                        accept="image/jpeg, image/png"
                                        maxSize={500*1024}/>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.excluir()}><Intl str="excluir"></Intl></Button>
                            <Button color="secondary" onClick={this.closeEditModal} className="espacamento"><Intl str="cancelar"></Intl></Button>
                        </ModalFooter>
                    </Modal>

                </CardBody>
            </Card>
        );
    }
}

export default RevistaOfertas;
