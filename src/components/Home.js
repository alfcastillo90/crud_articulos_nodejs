import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {
    render() {
        
        return(
            <div id="home">
                <Slider title="Bienvenido al curso de react" buttonString="Ir al blog" size="slider-big"/>
                <div className="center">
                    <div id="content" className="articles">
                        <h1 className="subheader">Últimos artículos</h1>
                        <Articles component="last_articles"/>
                    </div>  
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Home;