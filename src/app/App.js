import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Full from '../layout/Full';
import Intl from '../components/Intl';

import CategoriaFetch from '../modules/Categoria/CategoriaFetch';


import Inicio from '../modules/Inicio';
import Marca from '../modules/Marca';
import Cliente from '../modules/Cliente';
import Plano from '../modules/Plano';
import Parceiro from '../modules/Parceiro';
import Oferta from '../modules/Oferta';
import Cartao from '../modules/Cartao';
import Pessoa from '../modules/Pessoa';
import Dashboard from '../modules/Dashboard';
import Consumo from '../modules/Consumo';

const App = ({store}) => (
    <BrowserRouter>
        <Full>
            <Switch>
                <Route path="/categorias" component={CategoriaFetch} />
{/*
                <Route path="/categorias/novo" component={CategoriaForm} />

                <Route path="/marcas" name={<Intl str='marcas'></Intl>} component={Marca} />
                <Route path="/clientes" name={<Intl str='clientes'></Intl>} component={Cliente} />
                <Route path="/planos" name={<Intl str='planos'></Intl>} component={Plano} />
                <Route path="/parceiros" name={<Intl str='parceiros'></Intl>} component={Parceiro} />
                <Route path="/ofertas" name={<Intl str='ofertas'></Intl>} component={Oferta} />
                <Route path="/cartoes" name={<Intl str='cartoes'></Intl>} component={Cartao} />
                <Route path="/pessoas" name={<Intl str='pessoas'></Intl>} component={Pessoa} />
                <Route path="/consumos" name={<Intl str='consumos'></Intl>} component={Consumo} />

                <Route path="/componentes" name={<Intl str='inicio'></Intl>} component={Inicio}/>
*/}
                <Route path="/" component={Dashboard} />
            </Switch>
        </Full>
    </BrowserRouter>
);

export default App;
