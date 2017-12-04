import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import CategoriaForm from './CategoriaForm';
import { save, fetchOne } from './Categoria.actions';

class CategoriaEdit extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchOne(id, () => {
            this.props.history.push('/categorias');
        });
    }

    salvar(values) {
        console.log(values);
        this.props.save(values, () => {
            this.props.history.push('/categorias');
        });
    }

    render() {
        if(this.props.data) {
            return (
                <CategoriaForm 
                    data={this.props.data}    
                    doSubmit={this.salvar.bind(this)}
                />
            );
        } else {
            return <span></span>;
        }
    }
    
}

const mapState = (state) => {
    return {
        data: state.categorias.active
    };
};

const mapDispatch = (dispatch) => {
    return bindActionCreators({ save, fetchOne }, dispatch);
};

export default connect(mapState, mapDispatch)(CategoriaEdit);
