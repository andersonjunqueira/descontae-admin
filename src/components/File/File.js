import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import BootstrapFile from './BootstrapFile'

export const fileFunctions = { 
    toBase64: (file, callback) => {
        let reader = new FileReader();
        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            callback(btoa(binaryString));
        };
        reader.readAsBinaryString(file);
    }
}

class File extends Component {

    constructor(props) {
        super(props);
        this.getValidators = this.getValidators.bind(this);
    }

    getValidators() {
        const validators = [];

        if(this.props.required) {
            validators.push( (value) => !value ? "Campo Obrigatório" : undefined );
        }

        this.props.validators.forEach(function(v){
            validators.push(v);
        });

        return validators;
    }

    render() {
        return (
            <Field name={this.props.name}
                component={BootstrapFile}
                onChange={this.props.onChange}

                label={this.props.label}
                required={this.props.required}  
                placeholder={this.props.placeholder}
                help={this.props.help}
                validate={this.getValidators()}
                className={this.props.className}
                width={this.props.width} 
                height={this.props.height}
            />
        );
    }
}

File.propTypes = {
    label: PropTypes.node,
    className: PropTypes.string,
    help: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    validators: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func
}

File.defaultProps = {
    required: false,
    validators: []
};

export default File;

