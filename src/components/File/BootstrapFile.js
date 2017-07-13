import React, { Component, PropTypes } from 'react';
import { FormGroup, Label, Input, FormText, FormFeedback, InputGroup, InputGroupButton, Button } from 'reactstrap';
import Dropzone from 'react-dropzone';

class BootstrapFile extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange(files) {
        this.encodeBase64(this.props.input.name, files[0], this.props.input.onChange);
        this.setState({
            files: [ files[0] ]
        });
    }

    render() {
        const field = this.props; 
        const attrs = { 
            type: field.type,
            state: field.meta.error && field.meta.touched ? "danger" : ""
        };

        let feedback = (<FormText color="muted">{field.help}</FormText>);
        if(field.meta.error && field.meta.touched) {
            feedback = (<FormFeedback>{field.meta.error}</FormFeedback>);
        }

        return (
            <FormGroup color={field.meta.error && field.meta.touched ? "danger" : null}>
                {field.label && <Label for={field.name}>
                    {field.label}
                    {field.required && <span className="required"> *</span>}
                </Label>}

                <Dropzone 
                    className={field.className}
                    onDrop={this.onChange.bind(this)} 
                    multiple={false}
                    style={{
                            "width" : (field.width + 2) + "px", 
                            "height" : (field.height + 2) + "px", 
                            "border": "1px solid #b0bec5", 
                            "textAlign": "center"
                    }}>
                    <div>
                        {this.state.files && this.state.files.map((file, index) => <img key={index} src={file.preview} width={field.width} height={field.height} /> )}
                        {!this.state.files && <span>{field.placeholder}</span>}
                    </div>
                </Dropzone>

                {feedback}
            </FormGroup>
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
    width: PropTypes.number,
    height: PropTypes.number,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}
export default BootstrapFile;