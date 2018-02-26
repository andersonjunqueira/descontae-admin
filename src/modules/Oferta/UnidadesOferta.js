import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Field } from 'redux-form';

import Intl from '../../components/Intl';

class UnidadesOferta extends Component {

    render() {
        const { fields, meta } = this.props; 
        return (<div>
            {(!fields || fields.length === 0) && <Intl str='selecione-uma-franquia'></Intl>}
            {(fields && fields.length !== 0) && 
                <Table hover size="sm" className="tabela">
                    <thead>
                        <tr>
                        <th className="table-w-10 text-center">#</th>
                        <th className="table-w-30"><Intl str="unidade"></Intl></th>
                        <th className="table-w-40"><Intl str="endereco"></Intl></th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field, index) => { 
                            return (
                                <tr key={index}>
                                    <td className="text-center" scope="row">
                                        <Field name={`${field}.selecionada`} component="input" type="checkbox"/>
                                    </td>
                                    <td>{fields.get(index).nome}</td>
                                    <td>{fields.get(index).endereco}</td>
                                </tr>);
                        })}
                    </tbody>
                </Table>
            }
            {meta.error && <span className="fields-error">{meta.error}</span>}
        </div>);
    }
}

export default UnidadesOferta;
