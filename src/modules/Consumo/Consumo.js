import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import { PAGESIZE_DEFAULT } from '../../app/App.actions';
import ConsumoList from './ConsumoList';
import * as consumoActions from './Consumo.actions';

class Consumo extends Component {

    constructor(props) {
        super(props);
        this.consultar = this.consultar.bind(this);
        this.pesquisar = this.pesquisar.bind(this);
        this.limpar = this.limpar.bind(this);
        this.setPage = this.setPage.bind(this);

        this.state = {
            lastFilter: ""
        };

        this.props.actions.consultar({}, 0, PAGESIZE_DEFAULT);
    }

    pesquisar(values) {
        this.consultar(values);
    }

    consultar(values, page = 0, pagesize = PAGESIZE_DEFAULT) {
        let filter = Object.assign({}, values);
        this.setState(Object.assign({}, this.state, { lastFilter: filter }));
        this.props.actions.consultar(filter, page, pagesize);
    }

    limpar() {
        this.consultar();
    }

    setPage(page) {
        this.consultar(this.state.lastFilter, page);
    }

    render() {
        const { data } = this.props;
        return (
            <ConsumoList data={data.registros} doSetPage={this.setPage}  doSubmit={this.pesquisar} doLimpar={this.limpar}/>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.consumos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(consumoActions, dispatch)
    };
};

Consumo = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Consumo);

export default Consumo;