import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import { translate } from '../Intl/Intl.actions';
import SelectBootstrap from './SelectBootstrap';

class Select extends Component {

    getValidators() {
        const validators = [];
        if(this.props.required) {
            validators.push((value) => {
                return (!value || value === translate("selecione") ) ? translate("campo-obrigatorio") : undefined 
            });
        }
        this.props.validators.forEach(function(v) {
            validators.push(v);
        });
        return validators;
    }

    render() {
        let ops = [...this.props.options];
        if(ops && this.props.undefinedOption) {
            ops.unshift({ value: undefined, text: (this.props.disabled ? "" : translate("selecione"))});
        }

        const attrs = { 
            name: this.props.name, 
            type: "select",
            label: this.props.label, 
            placeholder: this.props.placeholder, 
            help: this.props.help,
            options: ops,
            required: this.props.required,
            disabled: this.props.disabled,
            formGroupClass: "form-group--select",
            onChange: this.props.onChange
        };

        return (
            <Field component={SelectBootstrap} {...attrs} validate={this.getValidators()}/>
        );
    }
}

Select.propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,

    undefinedOption: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func
}

Select.defaultProps = {
    undefinedOption: true,
    disabled: false,
    options: [],
    validators: []
};

export default Select;
