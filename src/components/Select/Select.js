import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import { translate } from '../Intl/Intl.actions';
import BootstrapInput from '../BootstrapInput';

//TODO REVER O COMPONENTE PARA NÃO UTILIZAR O BOOTSTRAPINPUT E SIM O INPUTBOOTSTRAP OU SIMILAR
class Select extends Component {

    render() {

        let ops = [...this.props.options];
        if(ops && this.props.undefinedOption) {
            ops.unshift({ value: undefined, text: translate("selecione")});
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
            formGroupClass: "form-group--select"
        };

        return (
            <Field component={BootstrapInput} {...attrs}/>
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
    options: PropTypes.arrayOf(PropTypes.object)
}

Select.defaultProps = {
    undefinedOption: true,
    disabled: false,
    options: []
};

export default Select;
