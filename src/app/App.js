import React, { PropTypes } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Full from '../containers/Full';
import Intl from '../components/Intl';

import Inicio from '../modules/Inicio';
import Profile from '../modules/Profile';
import Marca from '../modules/Marca';

const App = ({store}) => (
    <Provider store={store}>

        <Router history={browserHistory}>

            <Route component={Full} path="/" name={<Intl str='inicio'></Intl>}>
                <IndexRoute component={Inicio} />
                <Route path="/profile" name={<Intl str='meu-perfil'></Intl>} component={Profile} />
                <Route path="/marca" name={<Intl str='marca/franquia'></Intl>} component={Marca} />
            </Route>

        </Router>

    </Provider>
);


App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
