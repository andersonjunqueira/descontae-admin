import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Form } from 'reactstrap';

import Text from '../../components/Text';
import Mask from '../../components/InputDecorator/Mask';

class Inicio extends Component {

    doSearch() {
        console.log("OK");
    }

    render() {
        return (
        <div>
            <h4>Inicio</h4>
            <Form>
                <Text name="mask" label="MASK" help="OK" required={true} inputSize={10} labelSize={2} maxLength={2} action={this.doSearch} actionLabel="Action" size="lg"/>
                <Text name="mask" label="MASK" help="OK" required={true} placeholder="ABCD" action={this.doSearch} actionLabel="Action" actionIcon="fa fa-home" leftAddon="@" rightAddon="#"/>
                <Text name="mask" label="MASK" help="OK" required={true} placeholder="ABCD" leftIconAddon="fa fa-home" rightAddon="#"/>
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
