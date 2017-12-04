import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { translate } from './Intl.actions';

export const DEFAULT_LANGUAGE = "br";

class Intl extends Component {
    render() {
      const t = translate;
      return (<span className={this.props.className}>{t(this.props.str, this.props.params)}</span>);
    }
}

Intl.propTypes = {
    str: PropTypes.string.isRequired,
    params: PropTypes.array
};

Intl.defaultProps = {
    params: []
};

const mapStateToProps = (state) => {
    return {
        language: state.intl.currentLanguage
    }
};

Intl = connect(
    mapStateToProps
)(Intl);

export default Intl;

