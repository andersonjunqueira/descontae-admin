import React, { PropTypes } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Full from '../containers/Full';
import Intl from '../components/Intl';

import Inicio from '../modules/Inicio';
import Categoria from '../modules/Categoria';

const App = ({store}) => (
    <Provider store={store}>

        <Router history={browserHistory}>

            <Route component={Full} path="/" name={<Intl str='inicio'></Intl>}>
                <IndexRoute component={Inicio} />

                <Route path="/categoria" name={<Intl str='categoria'></Intl>} component={Categoria} />
                <Route path="/categoria/:idCategoria" name={<Intl str='categoria'></Intl>} component={Categoria} />
            </Route>

        </Router>

    </Provider>
);


App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
