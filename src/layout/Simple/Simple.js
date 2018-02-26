import React, { Component } from 'react';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-bootstrap';

class Simple extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        {this.props.children}
        <NotificationsSystem theme={theme} />
      </div>
    );
  }
}

export default Simple;
