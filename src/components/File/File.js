import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import BootstrapFile from './BootstrapFile'

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
            />
        );
    }
}

File.propTypes = {
    label: PropTypes.node,
    className: PropTypes.string,
    help: PropTypes.string,
    required: PropTypes.bool,
    validators: PropTypes.array,
    onChange: PropTypes.func
}

File.defaultProps = {
    required: false,
    validators: []
};

export default File;

