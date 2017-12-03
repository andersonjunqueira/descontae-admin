import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import CategoriaList from './CategoriaList';
import { fetchAll, remove } from './Categoria.actions';
import { PAGELIMIT_DEFAULT } from '../../app/App.actions';

class CategoriaFetch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filtro: {
                nome: undefined, 
                page: 0, 
                limit: PAGELIMIT_DEFAULT, 
                sort: ['nome'], 
                dir: ['asc'] 
            }
        }
    }

    componentDidMount() {
        this.props.fetchAll(this.state.filtro);
    }

    fetchPage(page) {
        this.setState(Object.assign(this.state.filtro, { page }));
        this.props.fetchAll( this.state.filtro );
    }

    remove(id) {
        this.props.remove(id, () => {
            this.fetchPage(0);  
            this.props.history.push('/categorias');
        });
    }

    setOrderBy(field, dir) {
        const nfiltro = Object.assign(this.state.filtro);
        let index = nfiltro.sort.indexOf(field);
        if(index > -1) {
            nfiltro.dir[index] = dir;
        } else {
            nfiltro.sort.push(field);
            nfiltro.dir.push(dir);
        }

        this.setState(nfiltro);
        this.props.fetchAll( this.state.filtro );
    }

    render() {
        return (
            <CategoriaList 
                data={this.props.data} 
                handleDelete={this.remove.bind(this)}
                handlePage={this.fetchPage.bind(this)}
                handleOrder={this.setOrderBy.bind(this)}
            />
        );
    }
    
}

const mapState = (state) => {
    return {
        data: state.categorias.list
    };
};

const mapDispatch = (dispatch) => {
    return bindActionCreators({ fetchAll, remove }, dispatch);
};

export default connect(mapState, mapDispatch)(CategoriaFetch);
