import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Select from '../../components/Select';

import { loadFranquiasForSelect } from './Marca.actions';

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
            options: this.props.list
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
    options: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => {
    return {
        list: state.marcaReducer.selectList
    }
};

SelectMarca = connect(
    mapStateToProps, 
    { loadFranquiasForSelect }
)(SelectMarca);

export default SelectMarca;
