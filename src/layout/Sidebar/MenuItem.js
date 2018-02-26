import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import Intl from '../../components/Intl';

class MenuItem extends Component {
    render() {
        const item = this.props.item;
        return (
            <li key={item.id} className="nav-item">
                <NavLink exact to={item.url} className="nav-link">
                    <i className={item.icon}></i> <Intl str={item.text}></Intl>
                    {item.badge && <span className={item.badgeColor}>{item.badge}</span>}
                </NavLink>
            </li>  
        );
    }
}

export default MenuItem;

