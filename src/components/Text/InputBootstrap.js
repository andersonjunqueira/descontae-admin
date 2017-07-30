import React, { Component, PropTypes } from 'react';
import { Input } from 'reactstrap';

import InputDecorator from '../InputDecorator';

class InputBootstrap extends Component {

    render() {
        const attrs = {
            ...this.props.input,
            type: this.props.type,
            name: this.props.input.name,
            id: this.props.input.name,
            placeholder: this.props.placeholder,
            state: this.props.meta.touched && this.props.meta.error ? "danger" : "",
            maxLength: this.props.maxLength
        };

        return (
            <InputDecorator {...this.props}>
                <Input {...attrs}/>
            </InputDecorator>
        );
    }
}

InputBootstrap.propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.string,
    help: PropTypes.node,
    required: PropTypes.bool,
    inputSize: PropTypes.number,
    labelSize: PropTypes.number
}

export default InputBootstrap;