import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import * as DASHBOARD_CLIENTE from './Dashboard.actions';
import DashboardForm from './DashboardForm';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.atualizar = this.atualizar.bind(this);
    }
/*
    componentWillUpdate() {
        if(this.props.roles) {
            if(this.props.roles.isAdmin || this.props.roles.isCliente) {
                this.props.actions.loadDashboard();
            }
        }
    }
*/
    atualizar(values) {
        let idCliente = values.cliente ? values.cliente.id : undefined;
        let idCidade = values.cidade ? values.cidade.id : undefined;
        this.props.actions.loadDashboard(idCliente, idCidade, values.inicio, values.fim);
    }

    render() {
        if(Object.keys(this.props.data).length) {
            if(this.props.roles.isAdmin || this.props.roles.isCliente) {
                return (
                    <DashboardForm data={this.props.data} doSubmit={this.atualizar} showClienteSearch={this.props.roles.isAdmin}/>
                );
            }
        } 
        return (<div></div>);
    }

}

const mapStateToProps = (state) => {
    console.log('DASHBOARD LOADING STATE');
    return {
        roles: state.profile.roles,
        data: state.dashboard
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(DASHBOARD_CLIENTE, dispatch)
    };
};

Dashboard = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Dashboard);

export default Dashboard;
