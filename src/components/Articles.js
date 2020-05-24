import React, { Component } from 'react';
import axios from 'axios';

class Articles extends Component{
    state = {
        articles: {},
        status: null
    };
    
    getArticles() {
        axios.get('http://localhost:3900/api/articles').then(response => {
            console.log(response.data);
            
            this.setState({
                articles: response.data.articles,
                status: 'success'
            });

        }, error => {
            console.log(error);
        });
    }

    componentWillMount() {
        this.getArticles();
    }

    render() {
        if (this.state.articles.length >= 1) {
            return (
                <div id="articles">
                    <h1 className="subheader">Listado de artículos</h1>
                    {this.state.status === 'success' &&
                                <div>
                                    { this.state.articles.map((article) => {
                                        return (
                                            <h1 key={ article._id }> { article.title } </h1>
                                        );
                                    }) 
                                    }
                                </div>
                    }
                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
            <div id="articles">
                <h1 className="subheader">No hay artículos para mostrar</h1>
            </div>
            );
        } else {
            return (
                <div id="articles">
                    <h1 className="subheader">Cargando</h1>
                </div>
            );
        }
       
    }
}

export default Articles