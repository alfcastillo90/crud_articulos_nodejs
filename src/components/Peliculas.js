import React, { Component } from 'react';
import MensajeEstatico from './MensajeEstatico';

class Peliculas extends Component {
    render() {
        return (
            <div id="peliculas">
                <h4>Hola soy el componente de peliculas</h4>
                <MensajeEstatico></MensajeEstatico>
            </div>  
        )
    }
}
export default Peliculas;