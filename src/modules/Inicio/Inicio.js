import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class Inicio extends Component {

    render() {
        return (
        <div>
            <h4>Inicio</h4>
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
