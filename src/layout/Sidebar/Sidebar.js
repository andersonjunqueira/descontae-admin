import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import Submenu from './Submenu';
import MenuHeading from './MenuHeading';
import MenuItem from './MenuItem';

const Sidebar = withRouter(props => <SideMenu {...props}/>);

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.activeRoute = this.activeRoute.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    }

    filterMenu(menu, roles) {
        let out = [];

        const verificar = (itemRoles, userRoles) => {
            for(let ur=0; ur < userRoles.length; ur++) {
                if(itemRoles.indexOf(userRoles[ur]) > -1) {
                    return true;
                }
            }
            return false;
        };

        const adicionar = (menuItem) => {
            out.push(menuItem);
            if(menuItem.submenu) {
               menuItem.submenu = this.filterMenu(menuItem.submenu, roles);
            }
        };
        
        for(let i = 0; i < menu.length; i++) {
            let item = menu[i];

            // SE NÃO TEM ROLES DEFINIDAS, ADICIONA.
            if(!item.roles) {
                adicionar(item);

            // SE TEM ROLES DEFINIDAS, VERIFICAR
            } else if(roles) {
            
                // SE A ROLE DO MENU ESTIVER PRESENTE NA ROLE DO ITEM, ADICIONAR
                if(verificar(item.roles, roles)) {
                    adicionar(item)
                }
            }
        }
        return out;
    }

    render() {
        const menuItems = this.filterMenu(this.props.data.menu, this.props.data.roles.plain);
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        {menuItems.map( (item, index) => {
                            if(item.heading) {
                                return <MenuHeading key={index} item={item} />
                            } else if(item.submenu) {
                                return <Submenu key={index} item={item} activeRoute={this.activeRoute} handleClick={handleClick} />
                            } else {
                                return <MenuItem key={index} item={item} />
                            }
                        })}
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const ns = {};
    ns.roles = state.profile.roles || { plain: [] } ;
    ns.menu = state.sidebar.sidebarMenu || [];
    return { data: ns };
};

SideMenu = connect(
    mapStateToProps
)(SideMenu);

export default Sidebar;
