import React, { Component } from 'react';

import Intl from '../../components/Intl';
import MenuHeading from './MenuHeading';
import MenuItem from './MenuItem';

class Submenu extends Component {
    render() {
        const { activeRoute, handleClick, item } = this.props;
        return (
            <li className={activeRoute(item.url)}>
                <a className="nav-link nav-dropdown-toggle" href="#" onClick={handleClick}><i className={item.icon}></i> <Intl str={item.text}></Intl></a>
                <ul className="nav-dropdown-items">
                    {item.submenu.map( (item, index) => {
                        if(item.heading) {
                            return <MenuHeading key={index} item={item} />
                        } else if(item.submenu) {
                            return <Submenu key={index} item={item} activeRoute={activeRoute} handleClick={handleClick} />
                        } else {
                            return <MenuItem key={index} item={item} />
                        }
                    })}
                </ul>
            </li>
        );
    }
}

export default Submenu;
