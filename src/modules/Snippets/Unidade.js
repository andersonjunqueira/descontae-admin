import React, { Component, PropTypes } from 'react';
import { FieldArray } from 'redux-form';
import { Row, Col } from 'reactstrap';

import Intl from '../../components/Intl';
import Text from '../../components/Text';
import Number from '../../components/Number';
import Password from '../../components/Password';
import Time from '../../components/Time';
import Endereco from '../../components/Endereco';
import Phones from './Phones';
import Imagens from './Imagens';

class Unidade extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} md={12}>
                        <Text name={`${this.props.name}.nome`} label={<Intl str='nome'></Intl>} maxLength={100} required={this.props.required}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <Password name={`${this.props.name}.senhaValidacao`} label={<Intl str='senha-validacao'></Intl>} maxLength={100} required={this.props.required}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Time name={`${this.props.name}.inicioExpediente`} label={<Intl str='inicio-expediente'></Intl>} required={this.props.required}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Time name={`${this.props.name}.fimExpediente`} label={<Intl str='fim-expediente'></Intl>} required={this.props.required}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Text name={`${this.props.name}.endereco.latitude`} label={<Intl str='latitude'></Intl>} precision={6} step={0.1}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <Text name={`${this.props.name}.endereco.longitude`} label={<Intl str='longitude'></Intl>} precision={6} step={0.1}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <Endereco name={`${this.props.name}.endereco`} required={this.props.required} formName={this.props.formName}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <FieldArray name={`${this.props.name}.telefones`} component={Phones} required={this.props.required} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12}>
                        <FieldArray name={`${this.props.name}.imagens`} component={Imagens} required={this.props.required} />
                    </Col>
                </Row>
            </div>
        );
    }

}

Unidade.propTypes = {
    formName: PropTypes.string
}

Unidade.defaultProps = {
    required: false
};

export default Unidade;
