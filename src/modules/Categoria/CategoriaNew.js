import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm';
import { save } from './Profile.actions';

class ProfileNew extends Component {

    salvar(values) {
        this.props.save(values, () => {
            this.props.history.push('/categorias');
        });
    }

    render() {
        return (
            <ProfileForm 
                doSubmit={this.salvar.bind(this)}
            />
        );
    }
    
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({ save }, dispatch);
};

export default connect(null, mapDispatch)(ProfileNew);
