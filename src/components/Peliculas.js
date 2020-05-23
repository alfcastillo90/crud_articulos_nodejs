import React, { Component } from 'react';
import Pelicula from './Pelicula';

class Peliculas extends Component {
    state = {}

    cambiarTitulo = () => {
        let { peliculas } = this.state;
        // const random = Math.floor(Math.random()*3);
        // alert(random);
        // peliculas[random].title = "Batman begins" + random;
        peliculas[0].title = "Batman begins";
        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, indice) => {
        console.log("favorita marcada");
       
        this.setState({
            favorita: pelicula
        });

        console.log(this.state.favorita);
        console.log(indice);
    }

    componentWillMount() {
        console.log("Component will mount");
        this.setState({
            peliculas: [
                {
                    title: "Batman vs superman",
                    year: 2017,
                    image:
                      "https://dam.smashmexico.com.mx/wp-content/uploads/2018/04/24160545/batman_v_superman_dawn_of_justice-cover.jpg"
                  },
                  {
                    title: "Gran Torino",
                    year: 2015,
                    image:
                      "https://razonesparacreer.com/wp-content/uploads/2017/10/grantorino-708x350@2x.jpg"
                  },
                  {
                    title: "El señor de los anillos",
                    year: 2003,
                    image:
                      "https://as01.epimg.net/epik/imagenes/2020/03/28/portada/1585384112_802989_1585386362_noticia_normal_recorte1.jpg"
                  }
            ],
            nombre: 'Carlos Alfredo Castillo Rodríguez',
            favorita: []
        });
    }

    componentDidMount() {
        console.log("Component did mount");
    }

    componentWillUnmount() {
        console.log("component will unmount")
    }

    render() {
        let favorita;
        let favoritaStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        }

        if (this.state.favorita.titulo) {
            favorita = ( <div className="favorita" style={ favoritaStyle }>
                    <strong>La película favorita es: </strong>
                    <span>{ this.state.favorita.title }</span>
                </div> )
        } else {
            favorita = ( <p>No hay película favorita</p> )
        }

        return (
            <div id="content" className="peliculas">
                <h2 className="subheader">Películas</h2>
                <p>Selección de las peliculas favoritas de { this.state.nombre }</p>
                <div>
                    <input type="button" onClick={this.cambiarTitulo} value="Cambiar título de Batman"/>
                </div>
                { /*
                    this.state.favorita.title 
                    ? (
                        <div className="favorita" style={ favoritaStyle }>
                            <strong>La película favorita es: </strong>
                            <span>{ this.state.favorita.title }</span>
                        </div> ) 
                    : (
                        <p>No hay película favorita</p> ) */
                }

                 { favorita }
                
                {/**Create movies component */}
                <div id="articles" className="peliculas">
                {
                    this.state.peliculas.map((pelicula, i) => {
                        return (
                            <Pelicula 
                            key={i} 
                            pelicula={pelicula}
                            indice={i}
                            marcarFavorita={this.favorita} />
                        );
                    })
                }
                </div> 
            </div>  
        )
    }
}
export default Peliculas;