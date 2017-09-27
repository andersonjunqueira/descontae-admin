import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import  { textFunctions } from '../Text';
import { translate } from '../Intl/Intl.actions';
import  Text from '../Text';

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
        if(parseInt(temp[0]) < 0 || parseInt(temp[0]) > 23) {
            return undefined;
        } else if(parseInt(temp[1]) < 0 || parseInt(temp[1]) > 59) {
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
            <Text 
                name={this.props.name}
                label={this.props.label}
                placeholder="__:__" 
                help={this.props.help}
                maxLength={5}
                required={this.props.required}
                normalize={this.normalize}
                className=""
                validators={this.getValidators()}
            />
        )
    }
}

Time.propTypes = {
    label: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool
}

Time.defaultProps = {
    leftIconAddon: "fa fa-clock-o"
}

export default Time;