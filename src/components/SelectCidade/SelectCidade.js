import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Select from '../Select';

import { loadCidadesForSelect } from './SelectCidade.actions';

class SelectCidade extends Component {

    componentWillMount() {
        if(!this.props.list) {
            this.props.loadCidadesForSelect();
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

SelectCidade.propTypes = {
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
        list: state.selectCidadeReducer.selectList
    }
};

SelectCidade = connect(
    mapStateToProps, 
    { loadCidadesForSelect }
)(SelectCidade);

export default SelectCidade;
