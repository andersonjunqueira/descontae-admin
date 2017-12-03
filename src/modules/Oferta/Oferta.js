import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import OfertaForm from './OfertaForm';
import OfertaList from './OfertaList';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST, PAGELIMIT_DEFAULT } from '../../app/App.actions';
import * as ofertaActions from './Oferta.actions';
import { fileFunctions } from "../../components/File";

class Oferta extends Component {

    constructor(props) {
        super(props);
        this.consultar = this.consultar.bind(this);
        this.pesquisar = this.pesquisar.bind(this);
        this.limpar = this.limpar.bind(this);
        this.novo = this.novo.bind(this);
        this.carregar = this.carregar.bind(this);
        this.consultarUnidades = this.consultarUnidades.bind(this);
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

    consultar(values, page = 0, pagesize = PAGELIMIT_DEFAULT) {
        let filter = Object.assign({}, values);
        filter.sort = "";
        if(filter && filter.nome) {
            filter.nome += "*";
        }

        this.setState(Object.assign({}, this.state, { lastFilter: filter }));
        this.props.actions.setMode(MODE_LIST);
        this.props.actions.consultar(filter, page, pagesize);
    }

    consultarUnidades(marcaId, callback) {
        this.props.actions.carregarUnidades(marcaId, callback);
    }

    limpar() {
        this.consultar();
    }

    novo() {
        this.props.actions.setMode(MODE_INSERT);
    }

    salvar(values) {
        const data = Object.assign({}, values, {});
        let imagem = new Promise( (resolve, reject) => {
            if(data.imagem) {
                if(data.imagem.files) {
                    fileFunctions.toBase64(data.imagem.files[0], (base64) => {
                        data.imagem = "data:" + data.imagem.files[0].type + ";base64," + base64;
                        resolve();
                    });
                } else {
                    resolve();
                }
            }
        });

        Promise.all([imagem]).then(values => { 
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
        const obj = { unds: [] };

        return (
            <div>
                {data.mode === MODE_LIST && <OfertaList data={data.registros} 
                    doSubmit={this.pesquisar} doLimpar={this.limpar} doNovo={this.novo} doCarregar={this.carregar} 
                    doExcluir={this.excluir} doSetPage={this.setPage}></OfertaList>}

                {data.mode === MODE_INSERT && <OfertaForm data={obj} 
                    doSubmit={this.salvar} doConsultar={this.consultar} doConsultarUnidades={this.consultarUnidades}></OfertaForm>}

                {data.mode === MODE_UPDATE && <OfertaForm data={data.obj}
                    doSubmit={this.salvar} doConsultar={this.consultar} doConsultarUnidades={this.consultarUnidades}></OfertaForm>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.ofertaReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ofertaActions, dispatch)
    };
};

Oferta = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Oferta);

export default Oferta;
