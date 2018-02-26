import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import NumberBootstrap from './NumberBootstrap';

export const numberFunctions = { 
    applyMask: (value) => (value !== undefined && value != null) ? value.replace(/[^\d]/g, '') : value,
    minValueValidator: min => value => (value && value < min) ? "Valor mínimo permitido: " + min : undefined,
    maxValueValidator: max => value => (value && value > max) ? "Valor máximo permitido: " + max : undefined
}

class Number extends Component {

    constructor(props) { 
        super(props);
        this.getValidators = this.getValidators.bind(this);
        this.normalize = this.normalize.bind(this);
    }

    getValidators() {
        const validators = [];

        if(this.props.min) {
            validators.push(numberFunctions.minValueValidator(this.props.min));
        }

        if(this.props.max) {
            validators.push(numberFunctions.maxValueValidator(this.props.max));
        }

        this.props.validators.forEach(function(v){
            validators.push(v);
        });

        return validators;
    }

    normalize(value) {
        if(this.props.normalize) {
            return this.props.normalize(value);
        } else {
            return numberFunctions.applyMask(value);
        }
    }

    render() {
        return (
            <Field component={NumberBootstrap} 
                type="input"
                validate={this.getValidators()}
                {...this.props}
            ></Field>
        );
    }
}

Number.propTypes = {
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
    validators: PropTypes.array,
    normalize: PropTypes.func,

    // NUMBER 
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    precision: PropTypes.number
}

Number.defaultProps = {
    className: "text-align-right ",
    required: false,
    validators: []
};

export default Number;