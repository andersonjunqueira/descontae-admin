import React, { Component, PropTypes } from 'react';
import { FormGroup, Label, FormText, FormFeedback } from 'reactstrap';
import Dropzone from 'react-dropzone';

class BootstrapFile extends Component {

    onChange(files) {
        if(this.props.input.onChange) {
            this.props.input.onChange({ name: this.props.input.name, files: files });
        }
    }

    render() {
        const field = this.props; 

        let feedback = (<FormText color="muted">{field.help}</FormText>);
        if(field.meta.error && field.meta.touched) {
            feedback = (<FormFeedback>{field.meta.error}</FormFeedback>);
        }

        let preview;
        if(field.input.value) {
            if(field.input.value.files) {
                preview = (<div><img src={field.input.value.files[0].preview} height={field.height} role="presentation"/></div>);
            } else {
                preview = (<div><img src={field.input.value} height={field.height} role="presentation"/></div>);
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
                    accept={field.accept}
                    maxSize={field.maxSize}
                    multiple={true}
                    style={{
                        "width" : "100%", 
                        "height" : field.height + 2, 
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
    placeholder: PropTypes.node,
    help: PropTypes.node,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
    accept: PropTypes.string,
    maxSize: PropTypes.number
}
export default BootstrapFile;