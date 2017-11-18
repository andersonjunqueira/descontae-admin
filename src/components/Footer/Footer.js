import React, { Component } from 'react';

import appData from '../../app.json';
import { translate } from '../Intl/Intl.actions';

class Footer extends Component {
  render() {
    console.log(appData);
    return (
      <footer className="app-footer small">
        <strong>
          <span className="float-left">{`${translate('desenvolvido-por')}: `} <a href="http://www.iwstech.com.br/" target="_self">IWS TECH</a></span>
          <span className="float-right">{`${translate('versao')}: ${appData.config.version}`}</span>
        </strong>
      </footer>
    )
  }
}

export default Footer;
