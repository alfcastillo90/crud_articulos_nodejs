import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {
    

    render() {
        return(
            <div id="home">
                <Slider title="Blog" size="slider-small"/>
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Blog</h1>
                        {/* Listado de articulos que vendran de la api */}
                        <Articles />
                    </div>
                    <Sidebar blog="true"/>
                </div>
            </div>
        );
    }
}

export default Blog;