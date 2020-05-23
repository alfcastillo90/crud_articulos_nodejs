import React from 'react';
import logo from './logo.svg';
import './App.css';

function HolaMundo(age, nombre) {
  const presentacion = (
  <div>
    <h2>Hi, I'm {nombre} </h2>
    <h3>I'm {age} years old</h3>
  </div>);
  
  return presentacion;
}

function App() {
  const nombre = "Carlos Alfredo Castillo Rodríguez";
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello!. This is my first react web application</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        { HolaMundo(29, nombre) }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
