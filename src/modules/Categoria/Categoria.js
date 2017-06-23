import React, { Component } from 'react';

import CategoriaForm from './CategoriaForm';

import Intl from '../../components/Intl';

class Categoria extends Component {

    doSubmit(values) {
    }

    render() {

        const { params } = this.props;

        return (
            <div>
                <h4><Intl str='categorias'></Intl></h4>

                {params && params.idCategoria && <span>{params.idCategoria}</span>}
                {!params || !params.idCategoria && <span>form</span>}
            </div>
        );
    }

}

export default Categoria;
