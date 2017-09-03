import React, { Component, PropTypes } from 'react';
import { Button, Row, Col } from 'reactstrap';

import Intl from '../../components/Intl';
import Card, { CardHeader, CardBody } from '../../components/Card';
import SelectMarca from '../Marca/SelectMarca';

class UnidadesOferta extends Component {

    render() {
        const { fields, meta, marcaSelecionada } = this.props; 
        return (
            <div>


            </div>
        );
    }
}

UnidadesOferta.propTypes = {
    formName: PropTypes.string
}

export default UnidadesOferta;
