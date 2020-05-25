import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import logo from '../assets/images/logo.svg';
import Moment from 'react-moment';
import 'moment/locale/es';
class Articles extends Component {
    state = {
        articles: {},
        status: null
    };

    url = Global.url;

    getArticles() {
        axios.get(this.url+'articles').then(response => {
            console.log(response.data);

            this.setState({
                articles: response.data.articles,
                status: 'success'
            });

        }, error => {
            console.log(error);
        });
    }

    getArticlesBySearch(searched) {
        axios.get(this.url+'search/'+ searched).then(response => {
            console.log(response.data);
            this.setState({
                articles: response.data.articles,
                status: 'success'
            });

        }).catch(error => {
            console.log('aqui');
            this.setState({
                articles: [],
                status: 'success'
            });
        })
    }

    getLastArticles() {
        axios.get(this.url+'articles/true').then(response => {
            console.log(response.data);

            this.setState({
                articles: response.data.articles,
                status: 'success'
            });

        });
    }

    componentWillMount() {
        const component = this.props.component;
        const search = this.props.search;
        if(component === 'blog') {
            this.getArticles();
        } else if (component === 'last_articles') {
            this.getLastArticles();
        } else if (component === 'search' && search && search !== null && search !== 'undefined') {
            this.getArticlesBySearch(search);
        }
       
    }

    render() {
        if (this.state.articles.length >= 1) {
            const listArticles = this.state.articles.map((article) => {
                return (
                    <article key={article._id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            { 
                                article.image !== null ? (
                                    <img src={ this.url + 'get-image/'+article.image } alt={article.title} />
                                ): (
                                    <img src={ logo } alt={article.title} />
                                )
                            }
                        </div>
                        <h2 className="subheader">{article.title}</h2>
                        <span className="date">
                            <Moment fromNow locale='es'>{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/'+ article._id }> Leer más </Link>
                        <div className="clearfix"></div>
                  </article>
                );
            });

            return (
                <div id="articles" className="posts">
                    {listArticles}
                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay artículos para mostrar</h2>
                    <p>Todavía no hay contenido en esta sección</p>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h1 className="subheader">Cargando...</h1>
                    <p>Espere mientras este cargando</p>
                </div>
            );
        }

    }
}

export default Articles