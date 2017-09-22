import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import { PAGESIZE_MODAL } from '../../app/App.actions';
import PesquisaClienteList from './PesquisaClienteList';
import * as pesquisaClienteActions from './PesquisaCliente.actions';

class PesquisaCliente extends Component {

    constructor(props) {
        super(props);
        this.consultar = this.consultar.bind(this);
        this.pesquisar = this.pesquisar.bind(this);
        this.setPage = this.setPage.bind(this);

        this.state = {
            lastFilter: ""
        };
    }

    pesquisar(values) {
        this.consultar(values);
    }

    consultar(values, page = 0, pagesize = PAGESIZE_MODAL) {
        let filter = Object.assign({}, values);
        if(filter && filter.titulo) {
            filter.titulo += "*";
        }
        this.setState(Object.assign({}, this.state, { lastFilter: filter }));        
        this.props.actions.consultar(filter, page, pagesize);
    }

    setPage(page) {
        this.consultar(this.state.lastFilter, page);
    }

    render() {
        return (
            <PesquisaClienteList data={this.props.data ? this.props.data.registros : undefined} 
                doSubmit={this.pesquisar} doSelecionar={this.props.doSelecionar} doSetPage={this.setPage}/>
        );
    }
}

PesquisaCliente.propTypes = {
    doSelecionar: PropTypes.func.isRequired
}

PesquisaCliente.defaultProps = {
};

const mapStateToProps = (state) => {
    return {
        data: state.pesquisaClienteReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(pesquisaClienteActions, dispatch)
    };
};

PesquisaCliente = connect(
    mapStateToProps, 
    mapDispatchToProps
)(PesquisaCliente);

export default PesquisaCliente;

