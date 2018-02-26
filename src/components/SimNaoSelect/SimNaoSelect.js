import React, { Component, PropTypes } from 'react';

import { translate } from '../Intl/Intl.actions';
import Select from '../Select';

class SimNaoSelect extends Component {

    render() {
        let ops = [
            {value: "S", text: translate("sim")},
            {value: "N", text: translate("nao")}
        ];

        const attrs = { 
            name: this.props.name, 
            label: this.props.label, 
            placeholder: this.props.placeholder, 
            help: this.props.help,
            options: ops,
            required: this.props.required,
            disabled: this.props.disabled,
            onChange: this.props.onChange,
            undefinedOption: this.props.undefinedOption
        };

        return (
            <Select {...attrs} /> 
        );
    }
}

SimNaoSelect.propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,

    undefinedOption: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func
}

SimNaoSelect.defaultProps = {
    undefinedOption: true,
    disabled: false,
    options: [],
    validators: []
};

export default SimNaoSelect;
