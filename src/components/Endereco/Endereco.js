import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'reactstrap';

import Intl from '../../components/Intl';
import Text from '../Text';
import UF from '../UF';
import ZipCode from '../ZipCode';

class Endereco extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={3}>
                        <ZipCode name="cep" label={<Intl str='cep'></Intl>} placeholder="__.___-___" zipcodeParams={this.props.zipcodeParams}/>
                    </Col>
                    <Col xs={12} md={9}>
                        <Text name="logradouro" label={<Intl str='logradouro'></Intl>} maxLength={100}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={10}>
                        <Text name="complemento" label={<Intl str='complemento'></Intl>} maxLength={20}/>
                    </Col>
                    <Col xs={12} md={2}>
                        <Text name="numero" label={<Intl str='numero'></Intl>} maxLength={10}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={5}>
                        <Text name="bairro" label={<Intl str='bairro'></Intl>} maxLength={50}/>
                    </Col>
                    <Col xs={12} md={5}>
                        <Text name="cidade" label={<Intl str='cidade'></Intl>} maxLength={50}/>
                    </Col>
                    <Col xs={12} md={2}>
                        <UF name="uf" label={<Intl str='uf'></Intl>}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

Endereco.propTypes = {
    zipcodeParams: PropTypes.object
}

export default Endereco;
