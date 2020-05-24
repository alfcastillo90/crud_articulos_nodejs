import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Formulario extends Component {
    render() {
        
        return(
            <div id="Formulario">
                <Slider title="Formulario" size="slider-small"/>
                <div className="center">
                    <div id="content">
                        <h1 class="subheader">Blog</h1>
                        {/* Listado de articulos que vendran de la api */}
                    </div>
                    <Sidebar blog="true"/>
                </div>
            </div>
        );
    }
}

export default Formulario;