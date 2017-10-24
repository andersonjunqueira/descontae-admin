import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

import  { textFunctions } from '../Text';
import  { numberFunctions } from '../Number';
import InputBootstrap from '../Text/InputBootstrap'; 

export const phoneFunctions = { 
    applyMask: (value) => {
        let nums = textFunctions.clearMask(value);
        nums = numberFunctions.applyMask(nums);
        switch(nums.length) {
            case 8: 
                return nums.replace(/(\d{4})(\d{4})/g,"$1-$2");
            case 9: 
                return nums.replace(/(\d{5})(\d{4})/g,"$1-$2");
            case 10: 
                return nums.replace(/(\d{2})(\d{4})(\d{4})/g,"($1) $2-$3");
            case 11: 
                return nums.replace(/(\d{2})(\d{5})(\d{4})/g,"($1) $2-$3");
            default:
                return nums;
        }
    },
}

class Phone extends Component {

    constructor(props) {
        super(props);
        this.normalize = this.normalize.bind(this);
    }

    normalize(value) {
        return value !== undefined ? phoneFunctions.applyMask(value) : value;
    }

    render() {
        return (
            <Field component={InputBootstrap} 
                type="input"
                normalize={this.normalize}
                {...this.props}
            ></Field>
        );
    }
}

Phone.propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool,
}

Phone.defaultProps = {
    validators: [],
    maxLength: 15
};

export default Phone;