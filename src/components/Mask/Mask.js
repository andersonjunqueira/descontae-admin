import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import InputBootstrap from '../Text/InputBootstrap';

export const textFunctions = { 
    clearMask: (value) => value !== undefined ? value.replace(/[\.\/\-]/g, '') : value,
}

class Mask extends Component {

    constructor(props) {
        super(props);
        this.getValidators = this.getValidators.bind(this);
    }

    getValidators() {
        const validators = [];
        if(this.props.required) {
            validators.push((value) => {
                return !value ? "Campo Obrigatório" : undefined 
            });
        }
        this.props.validators.forEach(function(v) {
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
            ></Field>);
    }
}

Mask.propTypes = {

    // INPUT DECORATOR
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.node,
    required: PropTypes.bool,
    inputSize: PropTypes.number,
    labelSize: PropTypes.number,

    action: PropTypes.func,
    actionIcon: PropTypes.string,
    actionLabel: PropTypes.node,
    leftAddon: PropTypes.node,
    rightAddon: PropTypes.node,
    leftIconAddon: PropTypes.node,
    rightIconAddon: PropTypes.node,
    size: PropTypes.string,

    // COMMON
    validators: PropTypes.array,

    // TEXT 
    maxLength: PropTypes.number
}

Mask.defaultProps = {
    required: false,
    validators: []
};

export default Mask;

