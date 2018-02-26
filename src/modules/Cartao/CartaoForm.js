import React, { Component } from 'react';
import { reduxForm, change } from 'redux-form';
import { Form, Row, Col, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import Card, { CardHeader, CardBody } from '../../components/Card';
import Text from '../../components/Text';
import Number from '../../components/Number';
import Date from '../../components/Date';
import Select from '../../components/Select';
import Intl from '../../components/Intl';
import SelectPlano from '../../components/SelectPlano';
import PesquisaPessoa from '../../components/PesquisaPessoa';
import PesquisaCliente from '../../components/PesquisaCliente';
import { translate } from '../../components/Intl/Intl.actions';

class CartaoForm extends Component {

    constructor(props) {
        super(props);
        this.cancelar = this.cancelar.bind(this);
        this.modalPessoaToggle = this.modalPessoaToggle.bind(this);
        this.modalUsuarioToggle = this.modalUsuarioToggle.bind(this);
        this.modalClienteToggle = this.modalClienteToggle.bind(this);
        this.tabToggle = this.tabToggle.bind(this);
        this.selecionarPessoa = this.selecionarPessoa.bind(this);
        this.selecionarUsuario = this.selecionarUsuario.bind(this);
        this.selecionarCliente = this.selecionarCliente.bind(this);
 
        this.state = {
            id: undefined,
            modalPessoaOpen: false,
            modalUsuarioOpen: false,
            modalClienteOpen: false,
            activeTab: '1'
        };
    }

    tabToggle(tab) {
        this.setState({
            activeTab: tab
        });
    }

    modalPessoaToggle() {
        this.setState({
            modalPessoaOpen: !this.state.modalPessoaOpen
        });
    }

    modalUsuarioToggle() {
        this.setState({
            modalUsuarioOpen: !this.state.modalUsuarioOpen
        });
    }

    modalClienteToggle() {
        this.setState({
            modalClienteOpen: !this.state.modalClienteOpen
        });
    }    

    componentDidUpdate() {
        if(this.props.data) {
            if(this.state.id !== this.props.data.id) {
                this.props.dispatch(this.props.initialize(this.props.data));
                this.setState(Object.assign(this.state, { id: this.props.data.id }));
            }
        }
    }

    cancelar() {
        this.props.doConsultar();
        this.setState(Object.assign(this.state, { id: undefined }));
    }

    selecionarUsuario(value) {
        if(value) {
            this.props.dispatch(change('CartaoForm', 'pessoa', value ));
        }
        this.modalUsuarioToggle();
    }

    selecionarPessoa(value) {
        if(value) {
            this.props.dispatch(change('CartaoForm', 'assinatura', { pessoa: value, cliente: undefined }));
        }
        this.modalPessoaToggle();
    }

    selecionarCliente(value) {
        if(value) {
            this.props.dispatch(change('CartaoForm', 'assinatura', { cliente: value, pessoa: undefined }));
        }
        this.modalClienteToggle();
    }

    render() {
        const { handleSubmit, doSubmit, pristine, reset, submitting, invalid } = this.props;
        const ativoTypes = [
            {value: "A", text: translate("ativo")},
            {value: "I", text: translate("inativo")}
        ];
        const assinaturaRequired = !!this.props.data && !!this.props.data.assinatura;
        return (
            <div>
                <Form onSubmit={handleSubmit(doSubmit)}>

                    <h4><Intl str='cartao'></Intl></h4>

                    <Nav tabs>
                        <NavItem>
                            <NavLink className={this.state.activeTab === '1' ? 'active' : ''} onClick={() => { this.tabToggle('1'); }}>
                                <Intl str="avulso"></Intl>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={this.state.activeTab === '2' ? 'active' : ''} onClick={() => { this.tabToggle('2'); }}
                                disabled={this.state.id !== undefined}>
                                <Intl str="faixa"></Intl>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col xs={12} md={2}>
                                    <Number name="codigo" label={<Intl str='codigo'></Intl>} maxLength={50} required={true}
                                        disabled={this.state.id !== undefined}/>
                                </Col>
                                <Col xs={12} md={10}>
                                    <Text name="pessoa.nome" label={<Intl str='usuario'></Intl>} maxLength={50} disabled={true}
                                        actionLabel={translate("pesquisar")}
                                        action={this.modalUsuarioToggle}/>                                
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={2}>
                                    <Select name="ativo" options={ativoTypes} label={<Intl str='ativo'></Intl>}/>
                                </Col>
                            </Row>
                            <p></p>

                            <Card>
                                <CardHeader>
                                    <Intl str='assinatura'></Intl> 
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Text name="assinatura.pessoa.nome" label={<Intl str='patrocinador-usuario'></Intl>} maxLength={50} disabled={true}
                                                actionLabel={translate("pesquisar")}
                                                action={this.modalPessoaToggle}/>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Text name="assinatura.cliente.nome" label={<Intl str='patrocinador-cliente'></Intl>} maxLength={50} disabled={true}
                                                actionLabel={translate("pesquisar")}
                                                action={this.modalClienteToggle}/>
                                        </Col>
                                    </Row>                                    
                                    <Row>
                                        <Col xs={12} md={4}>
                                            <SelectPlano name="assinatura.plano.id" label={<Intl str='plano'></Intl>}/>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Date name="assinatura.inicioVigencia" label={<Intl str='inicio-vigencia'></Intl>}/>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Date name="assinatura.fimVigencia" label={<Intl str='fim-vigencia'></Intl>}/>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col xs={12} md={2}>
                                    <Number name="codigo" label={<Intl str='codigo-inicial'></Intl>} maxLength={50} required={true}
                                        disabled={this.state.id !== undefined}/>
                                </Col>
                                <Col xs={12} md={2}>
                                    <Number name="codigoFinal" label={<Intl str='codigo-final'></Intl>} maxLength={50} required={this.state.activeTab === '2'}/>
                                </Col>
                            </Row>

                            <Card>
                                <CardHeader>
                                    <Intl str='assinatura'></Intl> 
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <Text name="assinatura.cliente.nome" label={<Intl str='patrocinador-cliente'></Intl>} maxLength={50} disabled={true}
                                                actionLabel={translate("pesquisar")}
                                                action={this.modalClienteToggle}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={4}>
                                            <SelectPlano name="assinatura.plano.id" label={<Intl str='plano'></Intl>} 
                                                required={assinaturaRequired}/>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Date name="assinatura.inicioVigencia" label={<Intl str='inicio-vigencia'></Intl>} 
                                                required={assinaturaRequired}/>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <Date name="assinatura.fimVigencia" label={<Intl str='fim-vigencia'></Intl>} 
                                                required={assinaturaRequired}/>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                        </TabPane>
                    </TabContent>
                    <br/>

                    <Button type="submit" color="primary" disabled={invalid || submitting}>
                        <Intl str='salvar'></Intl>
                    </Button>

                    <Button type="button" disabled={pristine || submitting} onClick={() => this.props.dispatch(reset)} className="espacamento">
                        <Intl str='limpar'></Intl>
                    </Button>

                    <Button type="button" onClick={() => this.cancelar()} className="btn btn-secondary">
                        <Intl str='cancelar'></Intl>
                    </Button>

                </Form>

                <Modal isOpen={this.state.modalPessoaOpen} toggle={this.modalPessoaToggle} size="lg">
                    <ModalHeader toggle={this.modalPessoaToggle}><Intl str="pesquisa-pessoas"></Intl></ModalHeader>
                    <ModalBody>
                        <PesquisaPessoa doSelecionar={this.selecionarPessoa}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalUsuarioOpen} toggle={this.modalUsuarioToggle} size="lg">
                    <ModalHeader toggle={this.modalUsuarioToggle}><Intl str="pesquisa-pessoas"></Intl></ModalHeader>
                    <ModalBody>
                        <PesquisaPessoa doSelecionar={this.selecionarUsuario}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.modalClienteOpen} toggle={this.modalClienteToggle} size="lg">
                    <ModalHeader toggle={this.modalClienteToggle}><Intl str="pesquisa-clientes"></Intl></ModalHeader>
                    <ModalBody>
                        <PesquisaCliente doSelecionar={this.selecionarCliente}/>
                    </ModalBody>
                </Modal>                
            </div>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

CartaoForm = reduxForm({ 
    form: "CartaoForm", 
    validate 
})(CartaoForm);

export default CartaoForm;
