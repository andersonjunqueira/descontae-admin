import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import PlanoList from './PlanoList';
import { fetchAll, remove } from './Plano.actions';
import { PAGELIMIT_DEFAULT } from '../../app/App.actions';

class PlanoFetch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filtro: {
                titulo: undefined, 
                page: 0, 
                limit: PAGELIMIT_DEFAULT, 
                sort: ['titulo'], 
                dir: ['asc'] 
            }
        }
    }

    componentDidMount() {
        this.props.fetchAll(this.state.filtro);
    }

    pesquisar(values) {
        if(values.titulo) {
            this.setState(Object.assign(this.state.filtro, { titulo: `${values.titulo}*` }));
        } else {
            this.setState(Object.assign(this.state.filtro, { titulo: undefined }));
        }
        this.props.fetchAll(this.state.filtro);
    }

    fetchPage(page) {
        this.setState(Object.assign(this.state.filtro, { page }));
        this.props.fetchAll( this.state.filtro );
    }

    remove(id) {
        this.props.remove(id, () => {
            this.fetchPage(0);  
            this.props.history.push('/planos');
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
            <PlanoList 
                data={this.props.data} 
                doSubmit={this.pesquisar.bind(this)}
                doDelete={this.remove.bind(this)}
                doSetPage={this.fetchPage.bind(this)}
                doSetOrderBy={this.setOrderBy.bind(this)}
            />
        );
    }
    
}

const mapState = (state) => {
    return {
        data: state.planos.list
    };
};

const mapDispatch = (dispatch) => {
    return bindActionCreators({ fetchAll, remove }, dispatch);
};

export default connect(mapState, mapDispatch)(PlanoFetch);
