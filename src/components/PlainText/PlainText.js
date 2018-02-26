import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import PlainTextBootstrap from './PlainTextBootstrap'; 

class PlainText extends Component {

    constructor(props) {
        super(props);
        this.normalize = this.normalize.bind(this);
    }

    normalize(value) {
        return (this.props.normalize) ? this.props.normalize(value) : value;
    }

    render() {
        return (
            <Field component={PlainTextBootstrap} 
                type="input"
                normalize={this.normalize}
                {...this.props}
            ></Field>);
    }
}

PlainText.propTypes = {
    name: PropTypes.string,

    // INPUT DECORATOR
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.node,
    inputSize: PropTypes.number,
    labelSize: PropTypes.number,

    // COMMON
    normalize: PropTypes.func,
}

PlainText.defaultProps = {
    validators: []
};

export default PlainText;

