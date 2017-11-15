import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Select from '../Select';

import { loadCategoriasForSelect } from './SelectCategoria.actions';

class SelectCategoria extends Component {

    componentWillMount() {
        if(!this.props.list) {
            this.props.loadCategoriasForSelect();
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
            options: this.props.list
        };
        return (
            <Select {...attrs}/>
        );
    }
}

SelectCategoria.propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool,
    undefinedOption: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => {
    return {
        list: state.selectCategoriaReducer.selectList
    }
};

SelectCategoria = connect(
    mapStateToProps, 
    { loadCategoriasForSelect }
)(SelectCategoria);

export default SelectCategoria;
