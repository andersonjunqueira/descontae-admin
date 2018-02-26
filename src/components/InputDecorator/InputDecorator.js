import React, { Component, PropTypes } from 'react';
import { FormGroup, Label, FormText, FormFeedback, InputGroup, Col, InputGroupButton, InputGroupAddon, Button } from 'reactstrap';

class InputDecorator extends Component {

    render() {
        const p = this.props;

        let feedback = (<span></span>);
        if(p.meta.error && p.meta.touched) {
            feedback = (<FormFeedback><span>{p.meta.error}</span></FormFeedback>);
        } else if(p.help) {
            feedback = (<FormText color="muted">{p.help}</FormText>);
        }

        let label = p.inputSize ?
            (<Label for={p.input.name} sm={p.labelSize} className="text-right">
                {p.label}{p.required && <span className="required"> *</span>}
             </Label>) :
            (<Label for={p.input.name} className="text-right">
                {p.label}{p.required && <span className="required"> *</span>}
             </Label>);

        let action = p.action ?  
            (<InputGroupButton>
                <Button type="button" onClick={p.action}>
                    {p.actionIcon && <i className={p.actionIcon}></i>}
                    {p.actionLabel}
                </Button>
             </InputGroupButton>) :
            undefined;

        let leftAddon = p.leftAddon ? (<InputGroupAddon>{p.leftAddon}</InputGroupAddon>) : undefined;
        leftAddon = p.leftIconAddon ? (<InputGroupAddon><i className={p.leftIconAddon}></i></InputGroupAddon>) : leftAddon;

        let rightAddon = p.rightAddon && !p.action ? (<InputGroupAddon>{p.rightAddon}</InputGroupAddon>) : undefined;
        rightAddon = p.rightIconAddon ? (<InputGroupAddon><i className={p.rightIconAddon}></i></InputGroupAddon>) : rightAddon;

        let inputGroup = (
            <InputGroup size={p.size ? p.size : "md"}>
                {leftAddon}
                {p.children}
                {action}
                {rightAddon}
            </InputGroup>);

        let component = p.inputSize ? 
                (<Col sm={p.inputSize}>{inputGroup}{feedback}</Col>) : 
                inputGroup;

        let formGroup = p.inputSize ?
            (<FormGroup row color={p.meta.error && p.meta.touched ? "danger" : null}>
                {p.label && label}
                {component}
             </FormGroup>) :

            (<FormGroup color={p.meta.error && p.meta.touched ? "danger" : null}>
                {p.label && label}
                {component}
                {feedback}
             </FormGroup>); 

        return formGroup;
    }
}

InputDecorator.propTypes = {
    field: PropTypes.object,
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.node,
    required: PropTypes.bool,
    inputSize: PropTypes.number,
    labelSize: PropTypes.number,
    action: PropTypes.func,
    actionIcon: PropTypes.string,
    actionLabel: PropTypes.node
}

export default InputDecorator;