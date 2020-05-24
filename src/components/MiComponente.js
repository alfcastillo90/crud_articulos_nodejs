import React, {Component} from 'react';

class MiComponente extends Component {
    render() {
        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamón cocido'],
            calorias: 400
        };

        return (
            <React.Fragment>
                <h1>Hi. I'm the component called: MiComponente</h1>
                <h2>I'm testing the component</h2>
                <h3> {'Receta: ' + receta.nombre}</h3>
                <h4> {'Calorías: ' + receta.calorias} </h4>
                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            console.log(ingrediente);
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            );
                        })
                    }
                </ol>
                {this.props.saludo &&
                   <React.Fragment>
                        <h2>Desde una PROP</h2>
                        <h3> { this.props.saludo } </h3>
                   </React.Fragment>
                }
                <hr/>
            </React.Fragment>
        );
    }
}

export default MiComponente;