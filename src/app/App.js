import React, { PropTypes } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import SimpleTop from '../containers/SimpleTop';
import Intl from '../components/Intl';
import PrivateRoute from './PrivateRoute';

import Inicio from '../modules/Inicio';
import Profile from '../modules/Profile';

const App = ({store}) => (
    <Provider store={store}>

        <Router history={browserHistory}>

            <Route component={SimpleTop} path="/" name={<Intl str='inicio'></Intl>}>
                <IndexRoute component={Inicio} />
                <PrivateRoute path="/profile" name={<Intl str='meu-perfil'></Intl>} component={Profile} />
            </Route>

        </Router>

    </Provider>
);


App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
