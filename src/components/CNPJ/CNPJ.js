import React, { Component, PropTypes } from 'react';

import  { textFunctions } from '../Text';
import  Number, { numberFunctions } from '../Number';

export const cnpjFunctions = { 
    applyMask: (value) => {
        let nums = numberFunctions.applyMask(value);
        return nums.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"$1.$2.$3/$4-$5");
    },

    validate: (value) => {
        let isValid = true;
        if(value) {
            let cnpj = textFunctions.clearMask(value);
            if (cnpj.length !== 14 ||
                cnpj === "00000000000000" ||
                cnpj === "11111111111111" ||
                cnpj === "22222222222222" ||
                cnpj === "33333333333333" ||
                cnpj === "44444444444444" ||
                cnpj === "55555555555555" ||
                cnpj === "66666666666666" ||
                cnpj === "77777777777777" ||
                cnpj === "88888888888888" ||
                cnpj === "99999999999999")
                isValid = false;

            let add = 0;
            let peso = 5;
            for (let i = 0; i < 12; i++) {
                add += parseInt(cnpj.charAt(i), 10) * peso;
                peso = peso === 2 ? 9 : peso-1;
            }

            let rev = 11 - (add % 11);
            if (rev === 13 || rev === 11) {
                rev = 0;
            }

            if (rev !== parseInt(cnpj.charAt(12), 10)) {
                isValid = false;
            }

            add = 0;
            peso = 6;
            for (let i = 0; i < 13; i++) {
                add += parseInt(cnpj.charAt(i), 10) * peso;
                peso = peso === 2 ? 9 : peso-1;
            }

            rev = 11 - (add % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }

            if (rev !== parseInt(cnpj.charAt(13), 10)) {
                isValid = false;
            }

        }

        return !isValid ? "CNPJ inválido" : undefined;
    }

}

class CNPJ extends Component {

    constructor(props) {
        super(props);
        this.getValidators = this.getValidators.bind(this);
        this.normalize = this.normalize.bind(this);
    }

    getValidators() {
        const validators = [];
        validators.push(cnpjFunctions.validate);
        return validators;
    }

    normalize(value) {
        return value !== undefined ? cnpjFunctions.applyMask(value) : value;
    }

    render() {
        return (
            <Number 
                name={this.props.name}
                label={this.props.label}
                placeholder={this.props.placeholder} 
                help={this.props.help}
                maxLength={18}
                className=""
                required={this.props.required}
                validators={this.getValidators()}
                normalize={this.normalize}
            />
        );
    }
}

CNPJ.propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool
}

CNPJ.defaultProps = {
    validators: []
};

export default CNPJ;