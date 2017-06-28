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
        this.state = {
            initialized: false
        }
        this.limparFormulario = this.limparFormulario.bind(this);
    }

    limparFormulario() {
        this.props.dispatch(this.props.reset);
        this.props.doLimpar();
    }

    render() {
        const { handleSubmit, doSubmit, pristine, submitting, invalid, data } = this.props;

        let content = (<Intl str="nenhum-registro-encontrado"></Intl>);
        if(data && data.length > 0) {
            content = (
                <Table hover className="tabela">
                    <thead>
                        <tr>
                            <th className="text-center" width="5%">#</th>
                            <th width="*"><Intl str="nome"></Intl></th>
                            <th className="text-center" width="5%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map(function(key) {
                            return (<tr key={key}>
                                <td className="text-center" scope="row">{data[key].id}</td>
                                <td>{data[key].nome}</td>
                                <td className="text-center"></td>
                            </tr>);
                        })}
                    </tbody>
                </Table>);
        }

        return (
            <Form onSubmit={handleSubmit(doSubmit)}>
                <h4><Intl str='categorias'></Intl></h4>
                <Row>
                    <Col xs={12} md={12}>
                        <Text name="nome" label={<Intl str='nome'></Intl>} maxLength={100}/>
                    </Col>
                </Row>

                <Button type="submit" color="primary" disabled={invalid || submitting}>
                    <i className="fa fa-search"></i>
                    <Intl str='pesquisar'></Intl>
                </Button>

                <Button type="button" disabled={pristine || submitting} onClick={() => this.limparFormulario()} className="espacamento">
                    <Intl str='limpar'></Intl>
                </Button>

                <Link to="/categorias/novo" className="btn btn-secondary espacamento">
                    <i className="fa fa-plus"></i>
                    <Intl str='nova-categoria'></Intl>
                </Link>

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
