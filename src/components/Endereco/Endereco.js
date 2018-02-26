import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { Row, Col } from 'reactstrap';

import Intl from '../Intl';
import Text from '../Text';
import UF from '../UF';
import ZipCode from '../ZipCode';

import { toaster } from '../Notification/Notification.actions';

class Endereco extends Component {

    constructor(props) {
        super(props);
        this.atualizaEndereco = this.atualizaEndereco.bind(this);
    }

    atualizaEndereco(address) { 
        if(address) {
            this.props.dispatch(change(this.props.formName, this.props.name + '.logradouro', address.logradouro));
            this.props.dispatch(change(this.props.formName, this.props.name + '.bairro', address.bairro));
            this.props.dispatch(change(this.props.formName, this.props.name + '.cidade', address.cidade));
            this.props.dispatch(change(this.props.formName, this.props.name + '.uf', address.uf));
        } else {
            this.props.dispatch(toaster(null, "cep-nao-encontrado", [], {status: "warning"}));
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={3}>
                        <ZipCode name={`${this.props.name}.cep`} label={<Intl str='cep'></Intl>} placeholder="__.___-___" formName={this.props.formName} callback={this.atualizaEndereco} required={this.props.required}/>
                    </Col>
                    <Col xs={12} md={9}>
                        <Text name={`${this.props.name}.logradouro`} label={<Intl str='logradouro'></Intl>} maxLength={100} required={this.props.required} disabled={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={10}>
                        <Text name={`${this.props.name}.complemento`} label={<Intl str='complemento'></Intl>} maxLength={20}/>
                    </Col>
                    <Col xs={12} md={2}>
                        <Text name={`${this.props.name}.numero`} label={<Intl str='numero'></Intl>} maxLength={10}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={5}>
                        <Text name={`${this.props.name}.bairro`} label={<Intl str='bairro'></Intl>} maxLength={50} required={this.props.required} disabled={true}/>
                    </Col>
                    <Col xs={12} md={5}>
                        <Text name={`${this.props.name}.cidade`} label={<Intl str='cidade'></Intl>} maxLength={50} required={this.props.required} disabled={true}/>
                    </Col>
                    <Col xs={12} md={2}>
                        <UF name={`${this.props.name}.uf`} label={<Intl str='uf'></Intl>} required={this.props.required} disabled={true}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

Endereco.propTypes = {
    formName: PropTypes.string,
    required: PropTypes.bool
}

Endereco.defaultProps = {
    required: false
};

Endereco = connect()(Endereco);

export default Endereco;
