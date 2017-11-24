import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import CategoriaForm from './CategoriaForm';
import CategoriaList from './CategoriaList';
import actions from './Categoria.actions';
import { PAGESIZE_DEFAULT } from '../../app/App.actions';

class Categoria extends Component {

    constructor(props) {
        super(props);
        this.fetchAll = this.fetchAll.bind(this);
        this.setPage = this.setPage.bind(this);
        this.fetchAll();
    }

    componentWillMount() {
    }

    fetchAll(values, startPage = 0, pagesize = PAGESIZE_DEFAULT) {
        this.props.actions.fetchAll(values, startPage, pagesize);
    }

    setPage(page) {
        this.fetchAll('', page);
    }

    render() {
        const { list, obj } = this.props;
        if(!obj) {
            return (
                <CategoriaList 
                    data={list} 
                    doSubmit={(values) => this.fetchAll(values)}
                    doAdd={this.props.actions.add}
                    doDelete={this.props.actions.delete}
                    doFetchOne={this.props.actions.fetchOne}
                    doSetPage={this.setPage}
                />
            );
        } else {
            return (
                <CategoriaForm data={obj} 
                    doSubmit={this.props.actions.save}
                    doCancel={this.props.actions.cancel}
                />
            );
        }
    }

}

const mapStateToProps = (state) => {
    return {
        list: state.categorias,
        obj: state.categoria
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categoria);
