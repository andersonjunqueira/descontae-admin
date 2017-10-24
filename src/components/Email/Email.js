import React, { Component, PropTypes } from 'react';
import isEmail from 'sane-email-validation';
import { Field } from 'redux-form';

import InputBootstrap from '../Text/InputBootstrap'; 

export const emailFunctions = {
     validateEmail: min => value => (value && !isEmail(value)) ? "e-mail inválido" : undefined 
}

class Email extends Component {

    constructor(props) {
        super(props);
        this.getValidators = this.getValidators.bind(this);
    }

    getValidators() {
        const validators = [];
        validators.push(emailFunctions.validateEmail(this.props.value));

        this.props.validators.forEach(function(v){
            validators.push(v);
        });

        return validators;
    }

    render() {
        return (
            <Field component={InputBootstrap} 
                type="input"
                validate={this.getValidators()}
                {...this.props}
            ></Field> 
        );
    }
}

Email.propTypes = {
    name: PropTypes.string,
    
    // INPUT DECORATOR
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.node,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    inputSize: PropTypes.number,
    labelSize: PropTypes.number,
    action: PropTypes.func,
    actionIcon: PropTypes.string,
    actionLabel: PropTypes.node,
    leftAddon: PropTypes.node,
    rightAddon: PropTypes.node,
    leftIconAddon: PropTypes.node,
    rightIconAddon: PropTypes.node,

    // COMMON
    validators: PropTypes.array
}

Email.defaultProps = {
    required: false,
    validators: [],
    leftAddon: "@"
};

export default Email;