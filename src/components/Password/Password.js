import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import InputBootstrap from '../Text/InputBootstrap';
import { translate } from '../Intl/Intl.actions';

class Password extends Component {

    constructor(props) {
        super(props);
        this.getValidators = this.getValidators.bind(this);
    }

    getValidators() {
        const validators = [];
        if(this.props.required) {
            validators.push((value) => {
                return !value ? translate("campo-obrigatorio") : undefined 
            });
        }
        this.props.validators.forEach(function(v) {
            validators.push(v);
        });
        return validators;
    }

    render() {
        return (
            <Field component={InputBootstrap} 
                type="password"
                validate={this.getValidators()}
                {...this.props}
            ></Field>
        );
    }
}

Password.propTypes = {
    name: PropTypes.string,

    // INPUT DECORATOR
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

    // COMMON
    validators: PropTypes.array

}

Password.defaultProps = {
    required: false,
    validators: [],
    leftIconAddon: "fa fa-key"
};

export default Password;