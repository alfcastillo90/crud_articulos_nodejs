import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Formulario extends Component {
    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    state = {
        user: {}
    }
    recibirFormulario = (e) => {
        e.preventDefault();
        let genero = 'hombre';
        
        if(this.generoHombreRef.current.checked) {
            genero = this.generoHombreRef.current.value;
        } else if(this.generoMujerRef.current.checked) {
            genero = this.generoMujerRef.current.value;
        } else {
            genero = this.generoOtroRef.current.value;
        }

        let user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidoRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero,
        }

        this.setState({
            user:user
        });
    }

    render() {
        if(this.state.user.nombre) {
            var user = this.state.user;
        }
        return(
            <div id="Formulario">
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1>
                        {/* Mostrar datos del formulario */}
                        {this.state.user.nombre &&
                            <div id="user-data">
                                <p>Nombre: <strong>{ user.nombre }</strong></p>
                                <p>Apellidos: <strong>{ user.apellidos }</strong></p>
                                <p>Bio: <strong>{ user.bio }</strong></p>
                                <p>Genero: <strong>{ user.genero }</strong></p>
                            </div>
                        }
                        <form className="mid-form" onSubmit={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={ this.nombreRef } onChange={ this.recibirFormulario } required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={ this.apellidoRef }onChange={ this.recibirFormulario } required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={ this.bioRef } onChange={ this.recibirFormulario } required></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={ this.generoHombreRef } onChange={ this.recibirFormulario }/> Hombre 
                                <input type="radio" name="genero" value="mujer" ref={ this.generoMujerRef } onChange={ this.recibirFormulario }/> Mujer 
                                <input type="radio" name="genero" value="otro" ref={ this.generoOtroRef } onChange={ this.recibirFormulario }/> Otro
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>
                    </div>
                    <Sidebar blog="true"/>
                </div>
            </div>
        );
    }
}

export default Formulario;