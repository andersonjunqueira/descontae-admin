import React, { Component, PropTypes } from 'react';
import { Input } from 'reactstrap';

import InputDecorator from '../InputDecorator';

class InputBootstrap extends Component {

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
            rows: this.props.rows
        };

        return (
            <InputDecorator {...idAttrs}>
                <Input {...attrs}/>
            </InputDecorator>
        );
    }
}

InputBootstrap.propTypes = {
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
}

export default InputBootstrap;