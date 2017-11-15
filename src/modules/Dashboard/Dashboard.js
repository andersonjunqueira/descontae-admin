import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 

import * as DASHBOARD_CLIENTE from './Dashboard.actions';
import { translate } from '../../components/Intl/Intl.actions';
import DashboardForm from './DashboardForm';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.atualizar = this.atualizar.bind(this);
    }

    componentWillMount() {
        this.props.actions.getDashboard();
    }

    atualizar(values) {
        let idCliente = values.cliente ? values.cliente.id : undefined;
        let idCidade = values.cidade ? values.cidade.id : undefined;
        this.props.actions.getDashboard(idCliente, idCidade, values.inicio, values.fim);
    }

    render() {
        if(this.props.data) {
            return (
                <DashboardForm data={this.props.data} doSubmit={this.atualizar}/>
            );
        } else {
            return (<div></div>);
        }
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.dashboardReducer.data
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