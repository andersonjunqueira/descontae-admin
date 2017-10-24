import React, { Component, PropTypes } from 'react';

import  { textFunctions } from '../Text';
import { translate } from '../Intl/Intl.actions';
import Mask from '../Mask'; 

export const timeFunctions = {  
    applyMask: (value) => {
        let nums = textFunctions.clearMask(value);
        return nums.substring(0,2) + ":" + nums.substring(2,4);
    },
    checkTimeFormat: value => {
        return value.split(":").length === 2 ? translate("formato-invalido") : undefined;
    },
    checkTimeValues: value => {
        console.log(value);
        const temp = value.split(":");
        if(parseInt(temp[0], 10) < 0 || parseInt(temp[0], 10) > 23) {
            return undefined;
        } else if(parseInt(temp[1], 10) < 0 || parseInt(temp[1], 10) > 59) {
            return undefined;
        }
        return translate("valor-invalido");
    }

}

class Time extends Component {

    constructor(props) {
        super(props);
        this.normalize = this.normalize.bind(this);
        this.getValidators = this.getValidators.bind(this);
    }

    normalize(value) {
        return value !== undefined ? timeFunctions.applyMask(value) : value;
    }

    getValidators() {
        const validators = [];
        // validators.push(timeFunctions.checkTimeFormat);
        // validators.push(timeFunctions.checkTimeValues);
        return validators;
    }

    render() {
        return (
            <Mask validate={this.getValidators()} {...this.props}/>               
        )
    }
}

Time.propTypes = {
    label: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool
}

Time.defaultProps = {
    required: false,
    mask: "11:11",
    leftIconAddon: "fa fa-clock-o"
}

export default Time;