import React, { PropTypes } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import Full from '../containers/Full';
import Intl from '../components/Intl';

import Inicio from '../modules/Inicio';
import Categoria from '../modules/Categoria';
import Marca from '../modules/Marca';
import Cliente from '../modules/Cliente';
import Plano from '../modules/Plano';
import Parceiro from '../modules/Parceiro';
import Oferta from '../modules/Oferta';
import Cartao from '../modules/Cartao';

const App = ({store}) => (
    <Provider store={store}>

        <Router history={browserHistory}>

            <Route component={Full} path="/" name={<Intl str='inicio'></Intl>}>
                <IndexRoute component={Inicio} />

                <Route path="/categorias" name={<Intl str='categorias'></Intl>} component={Categoria} />
                <Route path="/marcas" name={<Intl str='marcas'></Intl>} component={Marca} />
                <Route path="/clientes" name={<Intl str='clientes'></Intl>} component={Cliente} />
                <Route path="/planos" name={<Intl str='planos'></Intl>} component={Plano} />
                <Route path="/parceiros" name={<Intl str='parceiros'></Intl>} component={Parceiro} />
                <Route path="/ofertas" name={<Intl str='ofertas'></Intl>} component={Oferta} />
                <Route path="/cartoes" name={<Intl str='cartoes'></Intl>} component={Cartao} />

            </Route>

        </Router>

    </Provider>
);


App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
