import React, { Component, PropTypes } from 'react';

import  { textFunctions } from '../Text';
import  { numberFunctions } from '../Number';
import Mask from '../Mask'; 

//TODO CRIAR UM COMPONENTE COM SELEÇÃO DE DATA EM CALENDÁRIO
//TODO CRIAR UMA VALIDAÇÃO DE DATA DECENTE

export const dateFunctions = {  
    applyMask: (value) => {
        let nums = textFunctions.clearMask(value);
        nums = numberFunctions.applyMask(nums);
        return nums.replace(/(\d{2})(\d{2})(\d{4})/g,"$1/$2/$3");
    },
    checkDateFormat: value => value && value.split("/").length === 3,
    toBackend: value => {
        if(value) {
            const tokens = value.split("/");
            return tokens[2] + "-" + tokens[1] + "-" + tokens[0];
        }
        return undefined;
    },
    toFrontend: value => {
        if(value) {
            const tokens = value.split("-");
            return tokens[2] + "/" + tokens[1] + "/" + tokens[0];
        }
        return undefined;
    }

}

class Date extends Component {

    constructor(props) {
        super(props);
        this.normalize = this.normalize.bind(this);
        this.getValidators = this.getValidators.bind(this);
    }

    normalize(value) {
        return value !== undefined ? dateFunctions.applyMask(value) : value;
    }

    getValidators() {
        const validators = [];
        validators.push((value) => {
            return value && !dateFunctions.checkDateFormat(value) ? "Data inválida" : undefined;
        });
        return validators;
    }

    render() {
        return (
            <Mask validate={this.getValidators()} {...this.props}/>
        )
    }
}

Date.propTypes = {
    label: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool
}

Date.defaultProps = {
    required: false,
    leftIconAddon: "fa fa-calendar",
    mask: "11/11/1111"
};

export default Date;