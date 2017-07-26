import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import PlanoForm from './PlanoForm';
import PlanoList from './PlanoList';

import { MODE_INSERT, MODE_UPDATE, MODE_LIST, PAGESIZE_DEFAULT } from '../../app/App.actions';
import * as planoActions from './Plano.actions';
import { fileFunctions } from "../../components/File";

class Plano extends Component {

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
        filter.sort = "titulo,ASC";
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
        let plogo = new Promise( (resolve, reject) => {
            if(data.logoplano) {
                if(data.logoplano.files) {
                    fileFunctions.toBase64(data.logoplano.files[0], (base64) => {
                        data.logoplano = "data:" + data.logoplano.files[0].type + ";base64," + base64;
                        resolve();
                    });
                } else {
                    resolve();
                }
            }
        });

        let pthumb = new Promise( (resolve, reject) => {       
            if(data.imagemThumbnail) {
                if(data.imagemThumbnail.files) {
                    fileFunctions.toBase64(data.imagemThumbnail.files[0], (base64) => {
                        data.imagemThumbnail = "data:" + data.imagemThumbnail.files[0].type + ";base64," + base64;
                        resolve();
                    });
                } else {
                    resolve();
                }
            }
        });

        let pfundo = new Promise( (resolve, reject) => {
            if(data.imagemFundoApp) {
                if(data.imagemFundoApp.files) {
                    fileFunctions.toBase64(data.imagemFundoApp.files[0], (base64) => {
                        data.imagemFundoApp = "data:" + data.imagemFundoApp.files[0].type + ";base64," + base64;
                        resolve();
                    });
                } else {
                    resolve();
                }
            }
        });

        Promise.all([plogo, pthumb, pfundo]).then(values => { 
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
        const obj = {};

        return (
            <div>
                {data.mode === MODE_LIST && <PlanoList data={data.registros} 
                    doSubmit={this.pesquisar} doLimpar={this.limpar} doNovo={this.novo} doCarregar={this.carregar} 
                    doExcluir={this.excluir} doSetPage={this.setPage}></PlanoList>}

                {data.mode === MODE_INSERT && <PlanoForm 
                    data={obj} doSubmit={this.salvar} doConsultar={this.consultar}></PlanoForm>}

                {data.mode === MODE_UPDATE && <PlanoForm 
                    data={data.obj} doSubmit={this.salvar} doConsultar={this.consultar}></PlanoForm>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.planoReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(planoActions, dispatch)
    };
};

Plano = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Plano);

export default Plano;
