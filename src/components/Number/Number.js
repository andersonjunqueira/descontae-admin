import React, { Component, PropTypes } from 'react';

import Text from '../Text';

export const numberFunctions = { 
    applyMask: (value) => value !== undefined ? value.replace(/[^\d]/g, '') : value,
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

        if(this.props.minValue) {
            validators.push(numberFunctions.minValueValidator(this.props.minValue));
        }

        if(this.props.maxValue) {
            validators.push(numberFunctions.maxValueValidator(this.props.maxValue));
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
            <Text {...this.props}/>
        );
    }
}

//TODO [AJ] INCLUIR COMPORTAMENTO PARA CASAS DECIMAIS

Number.propTypes = {
    name: PropTypes.string,

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

    // COMMON
    validators: PropTypes.array,
    normalize: PropTypes.func,

    // NUMBER 
    maxValue: PropTypes.number,
    minValue: PropTypes.number
}

Number.defaultProps = {
    className: "text-align-right ",
    validators: []
};

export default Number;