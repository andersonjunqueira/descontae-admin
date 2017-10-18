import React, { Component, PropTypes } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import PlainText from '../../components/PlainText';
import Intl from '../../components/Intl';
import { translate } from '../../components/Intl/Intl.actions';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Unidade from './Unidade';


class Unidades extends Component {

    constructor(props) {
        super(props);
        this.tabToggle = this.tabToggle.bind(this);
        this.novaUnidade = this.novaUnidade.bind(this);
        this.removerUnidade = this.removerUnidade.bind(this);

        this.state = {
            activeTab: 0
        };
    }

    tabToggle(tab) {
        this.setState({
            activeTab: tab
        });
    }

    novaUnidade() {
        this.props.fields.push({nome: translate("nova-unidade")});
    }

    removerUnidade(index) {
        this.props.fields.remove(index);
        this.tabToggle(0);
    }

    render() {
        const { fields, meta } = this.props; 
        
        let tabs = (
            <div>
            <Nav tabs>
                {fields.map((field, index) => {
                    return (
                        <NavItem key={index}>
                            <NavLink className={this.state.activeTab === index ? 'active' : ''} onClick={() => { this.tabToggle(index); }}>
                                <PlainText name={`${field}.nome`}/>
                            </NavLink>
                        </NavItem>
                    );
                })}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                {fields.map((field, index) => {
                    return (
                        <TabPane key={index} tabId={index}>
                            <Row>
                                <Col xs={12} md={12}>
                                    <Button type="button" color="danger" size="sm" className="pull-right" onClick={() => this.removerUnidade(index)}>
                                        <i className="fa fa-trash"></i>
                                    </Button>
                                </Col>
                            </Row>
                            <Unidade name={`${field}`} formName={this.props.formName} required={this.props.required}/>
                        </TabPane>
                    );
                })}            
            </TabContent>            
            </div>
        );

        return (
            <Card>
                <CardHeader>
                    <Intl str='unidades'></Intl> 
                    <Button type="button" color="success" className="pull-right" size="sm" onClick={this.novaUnidade}>
                        <i className="fa fa-plus"></i>
                    </Button>
                </CardHeader>
                <CardBody>

                    {!meta.error && (!fields || fields.length === 0) && <Intl str='nenhuma-unidade-encontrada'></Intl>}
                    {meta.error && <span className="fields-error">{meta.error}</span>}
                    {fields && fields.length > 0 && tabs}
                    
                </CardBody>
            </Card>
        );
    }
}

Unidades.propTypes = {
    formName: PropTypes.string
}

Unidades.defaultProps = {
    required: false
};

export default Unidades;
