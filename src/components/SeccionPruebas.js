import React, { Component } from 'react';
import MiComponente from "./MiComponente";
import Peliculas from "./Peliculas";
import logo from "../assets/images/logo.svg";

class SeccionPruebas extends Component {
    HolaMundo(nombre, age) {
        const presentacion = (
            <div>
              <h2>Hi, I'm {nombre} </h2>
              <h3>I'm {age} years old</h3>
            </div>
          );
        
          return presentacion;
    }

    render() {
        const nombre = "Carlos Alfredo Castillo Rodríguez";

        return (
            <section id="content">
                <h2 className="subheader">Últimos artículos</h2>
                <p></p>
                <h2 className="subheader">Funciones y JSX basíco</h2>
                <section className="componentes">
                    <MiComponente />
                    <Peliculas />
                </section>
                <h2 className="subheader">Funciones y JSX basíco</h2>
            </section>
        );
    }
}

export default SeccionPruebas