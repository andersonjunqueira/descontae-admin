import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm';
import { save, fetchOne } from './Profile.actions';

class ProfileEdit extends Component {

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
                <ProfileForm 
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

export default connect(mapState, mapDispatch)(ProfileEdit);
