import React from "react";

import "./assets/css/App.css";

// Importar componentes¡
import Header from "./components/Header";
import Slider from "./components/Slider";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Peliculas from "./components/Peliculas";

function HolaMundo(age, nombre) {
  const presentacion = (
    <div>
      <h2>Hi, I'm {nombre} </h2>
      <h3>I'm {age} years old</h3>
    </div>
  );

  return presentacion;
}

function App() {
  const buttonString = "Ir al blog";

  return (
    <div className="App">
      <Header />
      <Slider title="Bienvenido al curso de react" buttonString={ buttonString }/>
      <div className="center">
        <Peliculas />
        <Sidebar />
        <div className="clearfix"></div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
