import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form } from 'reactstrap';

import Mask from '../../components/Mask';

class Inicio extends Component {

    doSearch() {
        console.log("OK");
    }

    render() {
        return (
        <div>
            <h4>Inicio</h4>
            <Form>
                <Mask name="mask" label="MASK" required={true} mask="1111 1111"/>
            </Form>
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
