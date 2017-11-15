import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import { PAGESIZE_MODAL } from '../../app/App.actions';
import PesquisaPessoaList from './PesquisaPessoaList';
import * as pesquisaPessoaActions from './PesquisaPessoa.actions';

class PesquisaPessoa extends Component {

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
        if(filter && filter.nome) {
            filter.nome += "*";
        }
        this.setState(Object.assign({}, this.state, { lastFilter: filter }));        
        this.props.actions.consultar(filter, page, pagesize);
    }

    setPage(page) {
        this.consultar(this.state.lastFilter, page);
    }

    render() {
        return (
            <PesquisaPessoaList data={this.props.data ? this.props.data.registros : undefined} 
                doSubmit={this.pesquisar} doSelecionar={this.props.doSelecionar} doSetPage={this.setPage}/>
        );
    }
}

PesquisaPessoa.propTypes = {
    doSelecionar: PropTypes.func.isRequired
}

PesquisaPessoa.defaultProps = {
};

const mapStateToProps = (state) => {
    return {
        data: state.pesquisaPessoaReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(pesquisaPessoaActions, dispatch)
    };
};

PesquisaPessoa = connect(
    mapStateToProps, 
    mapDispatchToProps
)(PesquisaPessoa);

export default PesquisaPessoa;

