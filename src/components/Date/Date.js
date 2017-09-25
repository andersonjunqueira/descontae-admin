import React, { Component, PropTypes } from 'react';

import  { textFunctions } from '../Text';
import  Number, { numberFunctions } from '../Number';

//TODO CRIAR UM COMPONENTE COM SELEÇÃO DE DATA EM CALENDÁRIO
//TODO REMOVER ESSAS FUNÇÕES DE CONVERSÃO DE DATA
//TODO CRIAR UMA VALIDAÇÃO DE DATA DECENTE

export const dateFunctions = {  
    applyMask: (value) => {
        let nums = textFunctions.clearMask(value);
        nums = numberFunctions.applyMask(nums);
        return nums.replace(/(\d{2})(\d{2})(\d{4})/g,"$1/$2/$3");
    },
    checkDateFormat: value => value && value.split("/").length === 3,
    toBackend: value => {
        const tokens = value.split("/");
        return tokens[2] + "-" + tokens[1] + "-" + tokens[0];
    },
    toFrontend: value => {
        const tokens = value.split("-");
        return tokens[2] + "/" + tokens[1] + "/" + tokens[0];
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
            <Number 
                name={this.props.name}
                label={this.props.label}
                placeholder="__/__/____" 
                help={this.props.help}
                maxLength={10}
                required={this.props.required}
                normalize={this.normalize}
                className=""
                validators={this.getValidators()}
            />
        )
    }
}

Date.propTypes = {
    label: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool
}

Date.defaultProps = {
    required: false
};

export default Date;