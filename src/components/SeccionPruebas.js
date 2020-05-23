import React, { Component } from 'react';
import MiComponente from "./MiComponente";
import Peliculas from "./Peliculas";

class SeccionPruebas extends Component {
    contador = 0;

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         contador:0
    //     };
    // }

    state = {
        contador: 0
    };

    sumar = (e) => {
        this.setState({
            contador: (this.state.contador + 1)
        });
    }
    restar = (e) => {
        this.setState({
            contador: (this.state.contador - 1)
        });
    }
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
        return (
            <section id="content">
                <h2 className="subheader">Últimos artículos</h2>
                <p></p>
                <h2 className="subheader">Funciones y JSX basíco</h2>
                <section className="componentes">
                    <MiComponente />
                </section>
                <h2 className="subheader">Estado</h2>
                <p>{ this.state.contador }</p>
                {/* <input type="button" value="Sumar" onClick={ this.sumar.bind(this) }/>
                <input type="button" value="Restar" onClick={ this.restar.bind(this) }/> */}
                <input type="button" value="Sumar" onClick={ this.sumar }/>
                <input type="button" value="Restar" onClick={ this.restar }/>
            </section>
        );
    }
}

export default SeccionPruebas