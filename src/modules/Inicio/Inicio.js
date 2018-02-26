import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

//import InicioForm from './InicioForm';

class Inicio extends Component {

    pesquisar(values) {
        console.log(values);
    }

    render() {
        return (
        <div>
            {/* 
            <h4>Inicio</h4>
            <InicioForm doSubmit={this.pesquisar}/>
            */}
        </div>
        );
    }
}

const validate = values => {
    const errors = {};
    return errors;
}

Inicio = reduxForm({ 
    form: "InicioForm",
    validate
})(Inicio);

export default Inicio;
