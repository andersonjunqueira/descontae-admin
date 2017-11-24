import React, { Component } from 'react';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-bootstrap';

class SimpleTop extends Component {
  render() {
    return (
      <div className="app flex-row">
        {this.props.children}
        <NotificationsSystem theme={theme} />
      </div>
    );
  }
}

export default SimpleTop;
