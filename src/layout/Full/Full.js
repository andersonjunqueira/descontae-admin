import React, { Component } from 'react';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-bootstrap';

import Header from '../Header/';
import Sidebar from '../Sidebar/';
import Footer from '../Footer/';

class Full extends Component {
    render() {
        return (
        <div className="app">
            <Header />
            <div className="app-body">
                <Sidebar />
                <main className="main">
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </main>
            </div>
            <Footer />
            <NotificationsSystem theme={theme} />
         </div>
        );
    }
}

export default Full;
