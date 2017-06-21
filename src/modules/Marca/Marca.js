import React, { Component } from 'react';

import MarcaForm from './MarcaForm';

class Marca extends Component {

    doSubmit(values) {
    }

    render() {
        return (
            <MarcaForm doSubmit={this.doSubmit}/>
        );
    }

}

export default Marca;
