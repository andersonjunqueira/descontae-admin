import React, { Component, PropTypes } from 'react';
import { FormGroup, Label, Input, FormText, FormFeedback, InputGroup, InputGroupButton, Button } from 'reactstrap';
import Dropzone from 'react-dropzone';

class BootstrapFile extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(files) {
        this.encodeBase64(this.props.input.name, files[0], this.props.input.onChange);
    }

    render() {
        const field = this.props; 
        const attrs = { 
            type: field.type,
            placeholder: field.placeholder, 
            className: field.className,
            state: field.meta.error && field.meta.touched ? "danger" : ""
        };

        let feedback = (<FormText color="muted">{field.help}</FormText>);
        if(field.meta.error && field.meta.touched) {
            feedback = (<FormFeedback>{field.meta.error}</FormFeedback>);
        }

        return (
            <Dropzone onDrop={this.onChange}/>
        );
    }

    encodeBase64(name, file, callback) {
        let reader = new FileReader();
        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            callback({
                base64: btoa(binaryString),
                name: name,
                filename: file.name,
                size: file.size,
                type: file.type
            });
        };
        reader.readAsBinaryString(file);
    }
}

BootstrapFile.propTypes = {
    label: PropTypes.node,
    help: PropTypes.string,
    onChange: PropTypes.func
}
export default BootstrapFile