import React, { Component } from 'react';

import ProfileForm from '../Profile/ProfileForm';

class Inicio extends Component {

    doSubmit(values) {
    }

    render() {
        return (
        <div className="container">

            <div className="row justify-content-center page-header text-center">
                <div className="col-sm-12 col-md-8">
                    <h1><img src="img/logo-II-workshop-eng-automotiva-texto-horizontal.png" className="header-image"/></h1>
                    <br/>
                    <p>Para garantir sua participação, basta fazer sua inscrição abaixo:</p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-8">
                    <ProfileForm doSubmit={this.doSubmit}/>
                </div>
            </div>

            <div className="row justify-content-center page-header">
            </div>
        </div>
        );
    }
}

export default Inicio;
