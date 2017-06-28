import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router'

import { Form, Row, Col, Button, Table } from 'reactstrap';
import Text from '../../components/Text';
import Intl from '../../components/Intl';

import { translate } from "../../components/Intl/Intl.actions";

class CategoriaList extends Component {

    constructor(props) {
        super(props);
        this.limpar = this.limpar.bind(this);
        this.novo = this.novo.bind(this);
    }

    limpar() {
        this.props.dispatch(this.props.reset);
        this.props.doLimpar();
    }


    carregar(id) {
        this.props.doCarregar(id);
    }

    excluir(id) {
        this.props.doExcluir(id);
    }

    render() {
        const { handleSubmit, doSubmit, pristine, submitting, invalid, data } = this.props;

        let content = (<Intl str="nenhum-registro-encontrado"></Intl>);
        if(data && data.length > 0) {
            content = (
                <Table hover className="tabela">
                    <thead>
                        <tr>
                            <th className="categ-col-1">#</th>
                            <th className="categ-col-2"><Intl str="nome"></Intl></th>
                            <th className="categ-col-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map(function(key) {
                            return (<tr key={key}>
                                <td className="text-center" scope="row">{data[key].id}</td>
                                <td>{data[key].nome}</td>
                                <td className="text-center">
                                    <Button type="button" onClick={() => this.carregar(data[key].id)} color="secondary" size="sm">
                                        <i className="fa fa-pencil"></i>
                                    </Button>

                                    <Button type="button" onClick={() => this.excluir(data[key].id)} color="danger" size="sm" className="espacamento">
                                        <i className="fa fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </Table>);
        }

        return (
            <Form onSubmit={handleSubmit(doSubmit)}>
                <h4><Intl str='pesquisa-categorias'></Intl></h4>
                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100}/>
                    </Col>
                </Row>

                <Button type="submit" color="primary" disabled={invalid || submitting}>
                    <i className="fa fa-search"></i>
                    <Intl str='pesquisar'></Intl>
                </Button>

                <Button type="button" disabled={pristine || submitting} onClick={() => this.props.doLimpar()} className="espacamento">
                    <Intl str='limpar'></Intl>
                </Button>

                <Button type="button" onClick={() => this.props.doNovo()} color="secondary">
                    <i className="fa fa-plus"></i>
                    <Intl str='nova-categoria'></Intl>
                </Button>

                <div>
                    <h6><Intl str="resultado-pesquisa"></Intl></h6>
                    {content}
                </div>

            </Form>
        );
    }

}

const validate = values => {
    const errors = {};
    return errors;
}

CategoriaList = reduxForm({ 
    form: "CategoriaList", 
    validate 
})(CategoriaList);

export default CategoriaList;
