import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import RevistaForm from './RevistaForm';
import RevistaList from './RevistaList';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST, PAGESIZE_DEFAULT } from '../../app/App.actions';
import * as revistaActions from './Revista.actions';
import { fileFunctions } from "../../components/File";

class Revista extends Component {

    constructor(props) {
        super(props);
        this.consultar = this.consultar.bind(this);
        this.pesquisar = this.pesquisar.bind(this);
        this.limpar = this.limpar.bind(this);
        this.novo = this.novo.bind(this);
        this.carregar = this.carregar.bind(this);
        this.salvar = this.salvar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.setPage = this.setPage.bind(this);

        this.state = {
            lastFilter: ""
        };
    }

    componentDidMount() {
        this.consultar();
    }

    pesquisar(values) {
        this.consultar(values);
    }

    consultar(values, page = 0, pagesize = PAGESIZE_DEFAULT) {
        let filter = Object.assign({}, values);
        filter.sort = "fimVigencia,DESC";
        if(filter && filter.nome) {
            filter.nome += "*";
        }

        this.setState(Object.assign({}, this.state, { lastFilter: filter }));
        this.props.actions.setMode(MODE_LIST);
        this.props.actions.consultar(filter, page, pagesize);
    }

    limpar() {
        this.consultar();
    }

    novo() {
        this.props.actions.setMode(MODE_INSERT);
    }

    salvar(values) {
        const data = Object.assign({}, values, {});

        let ppdf = fileFunctions.getPromise(data.pdf).then(response => {
            if(response) {
                data.pdf = response;
            }
        });

        let pimagem = fileFunctions.getPromise(data.imagem).then(response => {
            if(response) {
                data.imagem = response;
            }
        });

        Promise.all([ppdf, pimagem]).then(values => { 
            this.props.actions.salvar(data, this.consultar);
        }, reason => {
            console.log(reason);
        });
    }

    carregar(id) {
        this.props.actions.carregar(id);
        this.props.actions.setMode(MODE_UPDATE);
    }

    excluir(id) {
        this.props.actions.excluir(id, this.consultar);
    }

    setPage(page) {
        this.consultar(this.state.lastFilter, page);
    }

    render() {

        const { data } = this.props;
        const newObj = {};
        const obj = {...data.obj, ofertas: data.objOfertas};

        return (
            <div>
                {data.mode === MODE_LIST && <RevistaList data={data.registros} 
                    doSubmit={this.pesquisar} doLimpar={this.limpar} doNovo={this.novo} doCarregar={this.carregar} 
                    doExcluir={this.excluir} doSetPage={this.setPage}></RevistaList>}

                {data.mode === MODE_INSERT && <RevistaForm 
                    data={newObj} doSubmit={this.salvar} doConsultar={this.consultar}></RevistaForm>}

                {data.mode === MODE_UPDATE && <RevistaForm 
                    data={obj} doSubmit={this.salvar} doConsultar={this.consultar}></RevistaForm>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.revistaReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(revistaActions, dispatch)
    };
};

Revista = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Revista);

export default Revista;
