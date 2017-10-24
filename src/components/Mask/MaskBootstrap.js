import React, { Component, PropTypes } from 'react';

import MaskedInput from 'react-maskedinput';
import InputDecorator from '../InputDecorator';

class MaskBootstrap extends Component {

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
            mask: this.props.mask,
            className: "form-control"
        };

        return (
            <InputDecorator {...idAttrs}>
                <MaskedInput {...attrs}/>
            </InputDecorator>
        );
    }
}

MaskBootstrap.propTypes = {
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

    mask: PropTypes.string
}

export default MaskBootstrap;