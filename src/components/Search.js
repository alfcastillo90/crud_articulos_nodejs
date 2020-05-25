import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Search extends Component {
    render() {
        const searched = this.props.match.params.search;
        return(
            <div id="home">
                <Slider title={"Búsqueda: " + searched } size="slider-small"/>
                <div className="center">
                    {/* Listado de articulos que vendran de la api */}
                    <div id="content" className="articles">
                        <Articles 
                            search={ searched } component='search'
                        />
                    </div>  
                </div>
                <Sidebar blog="true"/>
            </div>
        );
    }
}

export default Search;