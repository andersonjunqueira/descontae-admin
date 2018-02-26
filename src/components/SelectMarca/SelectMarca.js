import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Select from '../Select';

import { loadFranquiasForSelect } from './SelectMarca.actions';

class SelectMarca extends Component {

    componentWillMount() {
        if(!this.props.list) {
            this.props.loadFranquiasForSelect();
        }
    }

    render() { 
        const attrs = { 
            name: this.props.name, 
            label: this.props.label, 
            placeholder: this.props.placeholder, 
            help: this.props.help,
            required: this.props.required,
            undefinedOption: this.props.undefinedOption,
            options: this.props.list,
            onChange: this.props.onChange
        };
        return (
            <Select {...attrs}/>
        );
    }
}

SelectMarca.propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool,
    undefinedOption: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        list: state.selectMarcaReducer.selectList
    }
};

SelectMarca = connect(
    mapStateToProps, 
    { loadFranquiasForSelect }
)(SelectMarca);

export default SelectMarca;
