import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import BootstrapFile from './BootstrapFile'

export const fileFunctions = {
    getPromise: (data) => {
        return new Promise( (resolve, reject) => {
            if(data) {
                if(data.files) {
                    fileFunctions.toBase64(data.files[0], (base64) => {
                        let b64 = "data:" + data.files[0].type + ";base64," + base64;
                        resolve(b64);
                    });
                } else {
                    resolve(undefined);
                }
            }
        });
    },
    
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
            validators.push( (value) => { 
                return !value || (value.files && value.files.length === 0) ? "Campo Obrigatório" : undefined;
            });
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
                accept={this.props.accept}
                maxSize={this.props.maxSize}

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
    placeholder: PropTypes.node,
    help: PropTypes.node,
    required: PropTypes.bool,
    validators: PropTypes.array,
    accept: PropTypes.string,
    maxSize: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func
}

File.defaultProps = {
    required: false,
    validators: []
};

export default File;

