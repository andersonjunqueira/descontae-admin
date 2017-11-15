import React, { Component } from 'react';
import { reduxForm, change } from 'redux-form';
import { Row, Col, Form, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Pie } from 'react-chartjs-2';

import Card, { CardHeader, CardBody } from '../../components/Card';
import Text from '../../components/Text';
import Intl from '../../components/Intl';
import PesquisaCliente from '../../components/PesquisaCliente';
import SelectCidade from '../../components/SelectCidade';
import Date from '../../components/Date';

import { translate } from '../../components/Intl/Intl.actions';

class DashboardForm extends Component {

    constructor(props) {
        super(props);
        this.getCartoesAtivosData = this.getCartoesAtivosData.bind(this);
        this.getConsumosPorCategoriaData = this.getConsumosPorCategoriaData.bind(this);
        this.getConsumosPorCidadeData = this.getConsumosPorCidadeData.bind(this);
        this.getConsumosPorBairroData = this.getConsumosPorBairroData.bind(this);
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
            this.props.dispatch(change('DashboardForm', 'cliente', value));
        }
        this.modalClienteToggle();
    }

    getChartOptions() {
        return {
            legend: {
                position: 'right'
            }
        };
    }

    getCartoesAtivosData() {
        return {
            labels: this.props.data.cartoesAtivos.map((item) => translate(item.situacao)),
            datasets: [{
                data: this.props.data.cartoesAtivos.map((item) => item.total),
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56'
                ]
            }]
            
        };
    }

    getConsumosPorCategoriaData() {
        return {
            labels: this.props.data.totaisByCategoria.map((item) => item.nome),
            datasets: [{
                data: this.props.data.totaisByCategoria.map((item) => item.total),
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56'
                ]
            }]
        };
    }

    getConsumosPorCidadeData() {
        return {
            labels: this.props.data.totaisByCidade.map((item) => item.nome),
            datasets: [{
                data: this.props.data.totaisByCidade.map((item) => item.total),
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56'
                ]
            }]
        };
    }

    getConsumosPorBairroData() {
        return {
            labels: this.props.data.totaisByBairro.map((item) => item.nome),
            datasets: [{
                data: this.props.data.totaisByBairro.map((item) => item.total),
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56'
                ]
            }]
        };
    }    

    render() {
        if(this.props.data) {
            const { handleSubmit, doSubmit, pristine, reset, submitting, invalid} = this.props;
            return (
                <Form onSubmit={handleSubmit(doSubmit)}>
                    <h4><Intl str='dashboard'></Intl></h4>

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
                    <Row>
                        <Col xs={12} md={6}>
                            <Text name="cliente.nome" label={<Intl str='cliente'></Intl>} maxLength={50} disabled={true}
                                actionLabel={translate("pesquisar")}
                                action={this.modalClienteToggle}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <Button type="submit" color="primary" disabled={invalid || submitting}>
                                <Intl str='atualizar'></Intl>
                            </Button>
                        </Col>
                    </Row><br/>

                    <Row>
                        <Col xs={12} md={6}>
                            <Card>
                                <CardHeader>
                                    <Intl str='total-cartoes'></Intl> 
                                </CardHeader>
                                <CardBody>
                                    <h1 className="text-center">{this.props.data.totais}</h1>
                                </CardBody>
                            </Card>                        
                            <Card>
                                <CardHeader> 
                                    <Intl str='cartoes-ativos'></Intl> 
                                </CardHeader>
                                <CardBody>
                                    {this.props.data.cartoesAtivos.length > 0 && (<Pie data={this.getCartoesAtivosData()} options={this.getChartOptions()}/>)}
                                    {this.props.data.cartoesAtivos.length == 0 && (<span>{translate('nao-ha-dados')}</span>)}
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Intl str='consumos-cidade'></Intl> 
                                </CardHeader>
                                <CardBody>
                                    {this.props.data.totaisByCidade.length > 0 && (<Pie data={this.getConsumosPorCidadeData()} options={this.getChartOptions()}/>)}
                                    {this.props.data.totaisByCidade.length == 0 && (<span>{translate('nao-ha-dados')}</span>)}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} md={6}>
                            <Card>
                                <CardHeader>
                                    <Intl str='consumos-categoria'></Intl> 
                                </CardHeader>
                                <CardBody>
                                    {this.props.data.totaisByCategoria.length > 0 && (<Pie data={this.getConsumosPorCategoriaData()} options={this.getChartOptions()}/>)}
                                    {this.props.data.totaisByCategoria.length == 0 && (<span>{translate('nao-ha-dados')}</span>)}
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Intl str='consumos-bairro'></Intl> 
                                </CardHeader>
                                <CardBody>
                                    {this.props.data.totaisByBairro.length > 0 && (<Pie data={this.getConsumosPorBairroData()} options={this.getChartOptions()}/>)}
                                    {this.props.data.totaisByBairro.length == 0 && (<span>{translate('nao-ha-dados')}</span>)}
                                </CardBody>
                            </Card>                        
                        </Col>
                    </Row>

                    <Modal isOpen={this.state.modalClienteOpen} toggle={this.modalClienteToggle} size="lg">
                        <ModalHeader toggle={this.modalClienteToggle}><Intl str="pesquisa-clientes"></Intl></ModalHeader>
                        <ModalBody>
                            <PesquisaCliente doSelecionar={this.selecionarCliente}/>
                        </ModalBody>
                    </Modal>  
                                        
                </Form>
            );
        } else {
            return (<div></div>);
        }
    }

}

DashboardForm = reduxForm({ 
    form: "DashboardForm"
})(DashboardForm);

export default DashboardForm;
