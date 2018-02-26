import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Select from '../Select';

import { loadProfilesForSelect } from './SelectProfile.actions';

class SelectProfile extends Component {

    componentWillMount() {
        if(!this.props.list) {
            this.props.loadProfilesForSelect();
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

SelectProfile.propTypes = {
    label: PropTypes.node,
    placeholder: PropTypes.node,
    help: PropTypes.string,
    required: PropTypes.bool,
    undefinedOption: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state) => {
    return {
        list: state.selectProfileReducer.selectList
    }
};

SelectProfile = connect(
    mapStateToProps, 
    { loadProfilesForSelect }
)(SelectProfile);

export default SelectProfile;
