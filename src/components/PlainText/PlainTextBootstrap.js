import React, { Component, PropTypes } from 'react';

import InputDecorator from '../InputDecorator';

class PlainTextBootstrap extends Component {

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
                <p className="form-control-plaintext">{attrs.value}</p>
            </InputDecorator>
        );
    }
}

PlainTextBootstrap.propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.node,
    inputSize: PropTypes.number,
    labelSize: PropTypes.number,
}

export default PlainTextBootstrap;