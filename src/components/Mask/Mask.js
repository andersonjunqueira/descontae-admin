// REFERENCIA DE MASCARA
// https://github.com/insin/inputmask-core#pattern

import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import MaskBootstrap from './MaskBootstrap'; 

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
            <Field component={MaskBootstrap} 
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

    // MASK
    mask: PropTypes.string
}

Mask.defaultProps = {
    required: false,
    validators: []
};

export default Mask;

