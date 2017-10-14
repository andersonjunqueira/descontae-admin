import React, { Component, PropTypes } from 'react';
import { Button } from 'reactstrap';

import Intl from '../../components/Intl';
import Card, { CardHeader, CardBody } from '../../components/Card';
import Unidade from './Unidade';

class Unidades extends Component {

    render() {
        const { fields, meta } = this.props; 
        return (
            <div>
                <Card>
                    <CardHeader>
                        <Intl str='unidades'></Intl> 
                        <Button type="button" color="success" className="pull-right" size="sm" onClick={() => fields.push()}>
                            <i className="fa fa-plus"></i>
                        </Button>
                    </CardHeader>
                    <CardBody>
                        {(!fields || fields.length === 0) && <Intl str='nenhuma-unidade-encontrada'></Intl>}
                        {fields.map((field, index) => {
                            return (
                                <div key={index}>
                                    <Unidade name={`${field}`} formName={this.props.formName}/>
                                    <hr className="hr-destaque"/>
                                </div>
                            );
                        })}
                        {meta.error && <span className="fields-error">{meta.error}</span>}
                    </CardBody>
                </Card>

            </div>
        );
    }
}

Unidades.propTypes = {
    formName: PropTypes.string
}

export default Unidades;
