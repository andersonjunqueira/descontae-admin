import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import InputBootstrap from '../Text/InputBootstrap';

class TextArea extends Component {

    constructor(props) {
        super(props);
        this.getValidators = this.getValidators.bind(this);
        this.normalize = this.normalize.bind(this);
    }

    getValidators() {
        const validators = [];

        if(this.props.required) {
            validators.push((value) => {
                return !value ? "Campo Obrigatório" : undefined 
            });
        }

        this.props.validators.forEach(function(v){
            validators.push(v);
        });

        return validators;
    }

    normalize(value) {
        return (this.props.normalize) ? this.props.normalize(value) : value;
    }

    render() {
        return (
            <Field name={this.props.name}
                component={InputBootstrap}
                type="textarea"

                label={this.props.label}
                required={this.props.required}  
                placeholder={this.props.placeholder} 
                help={this.props.help}
                maxLength={this.props.maxLength}
                validate={this.getValidators()}
                normalize={this.normalize}
                className={this.props.className}
                rightButtonLabel={this.props.rightButtonLabel}
                rightButtonAction={this.props.rightButtonAction}
                rows={this.props.rows}
            />
        );
    }
}

TextArea.propTypes = {
    label: PropTypes.node,
    className: PropTypes.string,
    placeholder: PropTypes.node,
    help: PropTypes.node,
    maxLength: PropTypes.number,
    required: PropTypes.bool,
    validators: PropTypes.array,
    rightButtonLabel: PropTypes.string,
    rightButtonAction: PropTypes.func,
    rows: PropTypes.number
}

TextArea.defaultProps = {
    required: false,
    validators: []
};

export default TextArea;

