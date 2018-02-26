import React, { Component, PropTypes } from 'react';

import InputDecorator from '../InputDecorator';
import NumericInput from 'react-numeric-input';

class NumberBootstrap extends Component {

    render() {
        const idAttrs = {
            ...this.props,
            state: this.props.meta.touched && this.props.meta.error ? "danger" : "",
        };

        const attrs = {
            ...this.props.input,
            type: this.props.type,
            name: this.props.input.name,
            id: this.props.input.name,
            placeholder: this.props.placeholder,
            maxLength: this.props.maxLength,
            disabled: this.props.disabled,
            className: 'form-control',
            max: this.props.max,
            min: this.props.min,
            step: this.props.step,
            precision: this.props.precision
        };

        return (
            <InputDecorator {...idAttrs}>
                <NumericInput  {...attrs}/>
            </InputDecorator>
        );
    }
}

NumberBootstrap.propTypes = {
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

    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    precision: PropTypes.number
}

export default NumberBootstrap;