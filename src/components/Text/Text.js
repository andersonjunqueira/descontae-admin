import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import InputBootstrap from './InputBootstrap';
import { translate } from '../Intl/Intl.actions';

export const textFunctions = { 
    clearMask: (value) => value !== undefined ? value.replace(/[\.\/\-:]/g, '') : value,
}

class Text extends Component {

    constructor(props) {
        super(props);
        this.getValidators = this.getValidators.bind(this);
        this.normalize = this.normalize.bind(this);
    }

    getValidators() {
        const validators = [];
        if(this.props.required) {
            validators.push((value) => {
                return !value ? translate("campo-obrigatorio") : undefined 
            });
        }
        this.props.validators.forEach(function(v) {
            validators.push(v);
        });
        return validators;
    }

    normalize(value) {
        return (this.props.normalize) ? this.props.normalize(value) : value;
    }

    render() {
        return (
            <Field component={InputBootstrap} 
                type="input"
                validate={this.getValidators()}
                normalize={this.normalize}
                {...this.props}
            ></Field>);
    }
}

Text.propTypes = {
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
    size: PropTypes.string,

    // COMMON
    validators: PropTypes.array,
    normalize: PropTypes.func,

    // TEXT 
    maxLength: PropTypes.number
}

Text.defaultProps = {
    required: false,
    disabled: false,
    validators: []
};

export default Text;

