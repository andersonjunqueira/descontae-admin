import React, { Component } from 'react';
import { reduxForm, change } from 'redux-form';
import { Row, Col, Form, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Pie, Bar } from 'react-chartjs-2';

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

    getPieOptions() { return { legend: { position: 'right' } }; }
    getBarOptions() { return { legend: { display: false } }; }
    getColors() { return ['#5499C7', '#CD6155', '#AF7AC5', '#48C9B0', '#52BE80', '#F4D03F', '#EB984E', '#F0F3F4',  '#AAB7B8', '#5D6D7E', '#5DADE2', '#EC7063', '#A569BD', '#45B39D', '#58D68D', '#F5B041', '#DC7633', '#CACFD2', '#99A3A4', '#566573']; }

    getCartoesAtivosData() {
        return {
            labels: this.props.data.cartoesAtivos.map((item) => `${translate(item.situacao)} - ${item.percentual}`),
            datasets: [{
                data: this.props.data.cartoesAtivos.map((item) => item.total),
                backgroundColor: this.getColors(),
                hoverBackgroundColor: this.getColors()
            }]
            
        };
    }

    getConsumosPorCategoriaData() {
        return {
            labels: this.props.data.consumosTotaisByCategoria.map((item) => `${item.nome} - ${item.percentual}`),
            datasets: [{
                data: this.props.data.consumosTotaisByCategoria.map((item) => item.total),
                backgroundColor: this.getColors(),
                hoverBackgroundColor: this.getColors()
            }]
        };
    }

    getConsumosPorCidadeData() {
        return {
            labels: this.props.data.consumosTotaisByCidade.map((item) => `${item.nome} - ${item.percentual}`),
            datasets: [{
                data: this.props.data.consumosTotaisByCidade.map((item) => item.total),
                backgroundColor: this.getColors(),
                hoverBackgroundColor: this.getColors()
            }]
        };
    }

    getConsumosPorBairroData() {
        return {
            labels: this.props.data.consumosTotaisByBairro.map((item) => `${item.nome} - ${item.percentual}`),
            datasets: [{
                data: this.props.data.consumosTotaisByBairro.map((item) => item.total),
                backgroundColor: this.getColors(),
                hoverBackgroundColor: this.getColors()
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
                    
                    {this.props.showClienteSearch && (
                        <Row>
                            <Col xs={12} md={6}>
                                <Text name="cliente.nome" label={<Intl str='cliente'></Intl>} maxLength={50} disabled={true}
                                    actionLabel={translate("pesquisar")}
                                    action={this.modalClienteToggle}/>
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col xs={12} md={6}>
                            <Button type="submit" color="primary" disabled={invalid || submitting}>
                                <Intl str='atualizar'></Intl>
                            </Button>

                            <Button type="button" disabled={pristine || submitting} onClick={() => this.props.dispatch(reset)} className="espacamento">
                                <Intl str='limpar'></Intl>
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
                                    <h1 className="text-center">{this.props.data.cartoesTotais}</h1>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} md={6}>
                            <Card>
                                <CardHeader>
                                    <Intl str='total-consumos'></Intl> {`(${this.props.data.dataInicio} - ${this.props.data.dataFim})`}
                                </CardHeader>
                                <CardBody>
                                    <h1 className="text-center">{this.props.data.consumosTotais}</h1>
                                </CardBody>
                            </Card>                           
                        </Col>
                        <Col xs={12} md={6}>
                            <Card>
                                <CardHeader> 
                                    <Intl str='cartoes-ativos'></Intl> 
                                </CardHeader>
                                <CardBody>
                                    {this.props.data.cartoesAtivos.length > 0 && (<Pie data={this.getCartoesAtivosData()} options={this.getPieOptions()}/>)}
                                    {this.props.data.cartoesAtivos.length == 0 && (<span>{translate('nao-ha-dados')}</span>)}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} md={6}>
                            <Card>
                                <CardHeader>
                                    <Intl str='consumos-cidade'></Intl> {`(${this.props.data.dataInicio} - ${this.props.data.dataFim})`}
                                </CardHeader>
                                <CardBody>
                                    {this.props.data.consumosTotaisByCidade.length > 0 && (<Bar data={this.getConsumosPorCidadeData()} options={this.getBarOptions()}/>)}
                                    {this.props.data.consumosTotaisByCidade.length == 0 && (<span>{translate('nao-ha-dados')}</span>)}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs={12} md={12}>
                            <Card>
                                <CardHeader>
                                    <Intl str='consumos-bairro'></Intl> {`(${this.props.data.cidade.nome}, ${this.props.data.dataInicio} - ${this.props.data.dataFim})`}
                                </CardHeader>
                                <CardBody>
                                    {this.props.data.consumosTotaisByBairro.length > 0 && (<Bar data={this.getConsumosPorBairroData()} options={this.getBarOptions()}/>)}
                                    {this.props.data.consumosTotaisByBairro.length == 0 && (<span>{translate('nao-ha-dados')}</span>)}
                                </CardBody>
                            </Card>                        
                        </Col>
                        <Col xs={12} md={12}>
                            <Card>
                                <CardHeader>
                                    <Intl str='consumos-categoria'></Intl> {`(${this.props.data.cidade.nome}, ${this.props.data.dataInicio} - ${this.props.data.dataFim})`} 
                                </CardHeader>
                                <CardBody>
                                    {this.props.data.consumosTotaisByCategoria.length > 0 && (<Pie data={this.getConsumosPorCategoriaData()} options={this.getPieOptions()}/>)}
                                    {this.props.data.consumosTotaisByCategoria.length == 0 && (<span>{translate('nao-ha-dados')}</span>)}
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

DashboardForm.defaultProps = {
    showClienteSearch: false
};

DashboardForm = reduxForm({ 
    form: "DashboardForm"
})(DashboardForm);

export default DashboardForm;
