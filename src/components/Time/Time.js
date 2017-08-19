import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import  { textFunctions } from '../Text';
import  Number, { numberFunctions } from '../Number';

export const timeFunctions = {  
    applyMask: (value) => {
        let nums = textFunctions.clearMask(value);
        nums = numberFunctions.applyMask(nums);
        return nums.replace(/(\d{2})(\d{2})/g,"$1:$2");
    },
    checkTimeFormat: value => value.split(":").length === 2,
    checkTimeValues: value => {
        const temp = value.split(":");
        if(parseInt(temp[0]) < 0 || parseInt(temp[0]) > 23) {
            return false;
        } else if(parseInt(temp[1]) < 0 || parseInt(temp[1]) > 59) {
            return false;
        }
        return true;
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
        validators.push(timeFunctions.checkTimeFormat);
        validators.push(timeFunctions.checkTimeValues);
        return validators;
    }

    render() {
        return (
            <Number 
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

export default Time;