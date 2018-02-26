import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Full from '../layout/Full';
import Intl from '../components/Intl';

import ProfileFetch from '../modules/Profile/ProfileFetch';
import ProfileNew from '../modules/Profile/ProfileNew';
import ProfileEdit from '../modules/Profile/ProfileEdit';
import MarcaFetch from '../modules/Marca/MarcaFetch';
import MarcaNew from '../modules/Marca/MarcaNew';
import MarcaEdit from '../modules/Marca/MarcaEdit';
import PlanoFetch from '../modules/Plano/PlanoFetch';
import PlanoNew from '../modules/Plano/PlanoNew';
import PlanoEdit from '../modules/Plano/PlanoEdit';


import Inicio from '../modules/Inicio';
import Cliente from '../modules/Cliente';
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
                <Route path="/categorias/novo" component={ProfileNew} />
                <Route path="/categorias/:id" component={ProfileEdit} />
                <Route path="/categorias" component={ProfileFetch} />
                <Route path="/marcas/novo" component={MarcaNew} />
                <Route path="/marcas/:id" component={MarcaEdit} />
                <Route path="/marcas" component={MarcaFetch} />
                <Route path="/planos/novo" component={PlanoNew} />
                <Route path="/planos/:id" component={PlanoEdit} />
                <Route path="/planos" component={PlanoFetch} />
{/*

                <Route path="/clientes" name={<Intl str='clientes'></Intl>} component={Cliente} />
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
