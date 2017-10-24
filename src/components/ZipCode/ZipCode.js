import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import  { textFunctions } from '../Text';
import  { numberFunctions } from '../Number';
import  { searchZipcode } from './ZipCode.actions';
import { translate } from '../Intl/Intl.actions';
import Mask from '../Mask'; 

export const zipcodeFunctions = {  
    applyMask: (value) => {
        let nums = textFunctions.clearMask(value);
        nums = numberFunctions.applyMask(nums);
        return nums.replace(/(\d{2})(\d{3})(\d{3})/g,"$1.$2-$3");
    }
}

class ZipCode extends Component {

    constructor(props) {
        super(props);
        this.normalize = this.normalize.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    normalize(value) {
        return value !== undefined ? zipcodeFunctions.applyMask(value) : value;
    }

    doSearch() {
        let fields = this.props.name.split('.');
        let zip = this.props.forms[this.props.formName].values;
        fields.forEach(token => {

            let fieldArray = token.split("[");
            if(fieldArray.length === 1) {
                zip = zip[token];
            } else {
                zip = zip[fieldArray[0]];
                zip = zip[fieldArray[1].split(']')[0]];
            } 
        });

        zip = numberFunctions.applyMask(zip);
        searchZipcode(zip, this.props.callback);
    }

    render() {
        return ( 
            <Mask {...this.props}
                actionLabel={translate("pesquisar-cep")}
                action={this.doSearch}/>
        )
    }
}

ZipCode.propTypes = {
    formName: PropTypes.string,
    callback: PropTypes.func,
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool
}

ZipCode.defaultProps = {
    mask: "11.111-111"
};

const mapStateToProps = (state) => {
    return {
        forms: state.form
    }
};

ZipCode = connect(
    mapStateToProps
)(ZipCode);

export default ZipCode;