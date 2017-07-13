import React, { Component, PropTypes } from 'react';
import { FormGroup, Label, Input, FormText, FormFeedback, InputGroup, InputGroupButton, Button } from 'reactstrap';
import Dropzone from 'react-dropzone';

class BootstrapFile extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange(files) {
        this.props.input.onChange({ name: this.props.input.name, files: files });
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

        let preview;
        if(field.input.value) {
            if(field.input.value.files) {
                preview = (<div><img src={field.input.value.files[0].preview} height={field.height}/></div>);
            } else {
                preview = (<div><img src={field.input.value} height={field.height}/></div>);
            }
        } else {
            preview = (<div>{field.placeholder}</div>);
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
                    multiple={true}
                    style={{
                        "width" : "100%", 
                        "height" : "20%", 
                        "border": "1px solid #b0bec5", 
                        "textAlign": "center"
                    }}>
                    {preview}
                </Dropzone>

                {feedback}
            </FormGroup>
        );
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