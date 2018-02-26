import React, { Component, PropTypes } from 'react';
import { Input } from 'reactstrap';

import InputDecorator from '../InputDecorator';

class SelectBootstrap extends Component {

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
                <Input {...attrs}>
                    {this.props.options.map( (op, index) => {
                        return (<option key={index} value={op.value}>{op.text}</option>);
                    })}
                </Input>
            </InputDecorator>
        );
    }
}

SelectBootstrap.propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.node,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    inputSize: PropTypes.number,
    labelSize: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.object),
}

export default SelectBootstrap;