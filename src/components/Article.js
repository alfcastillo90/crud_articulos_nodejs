import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import logo from '../assets/images/logo.svg';
import Moment from 'react-moment';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class Article extends Component {
    url = Global.url;
    

    state = {
        article: {},
        status: null
    }

    deleteArticle = (id) => {
        swal({
            title: "¿Esta seguro que quiere eliminar este articulo?",
            text: "No podra recuperarse",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(this.url+'article/'+ id).then(response => {
                    console.log(response.data);
                    this.setState({
                        article: response.data.article,
                        status: 'deleted'
                    });
                }).catch(error => {
                    this.setState({
                        article: false,
                        status: 'success'
                    });
                });
                
                swal("Tu articulo ha sido eliminado", {
                    icon: "success",
                });

            } else {
              swal("Tu articulo no se ha borrado", "", "success");
            }
          });
        
    }

    getArticle = () => {
        const id = this.props.match.params.id;
        axios.get(this.url+'article/'+ id).then(response => {
            console.log(response.data);
            this.setState({
                article: response.data.article,
                status: 'success'
            });
        }).catch(error => {
            this.setState({
                article: false,
                status: 'success'
            });
        });
    }

    componentWillMount() {
        this.getArticle();
    }

    render() {
        var article = this.state.article;
        
        if (this.state.status === 'deleted') {
            return <Redirect to='/blog' />;
        }

        return (
            <div className="center">
                <section  id="content">
                   
                    {this.state.article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                            { 
                                article.image !== null ? (
                                    <img src={ this.url + 'get-image/'+article.image } alt={article.title} />
                                ): (
                                    <img src={ logo } alt={article.title} />
                                )
                            }
                            </div>
                            <h1 className="subheader">{article.title}</h1>
                            <span className="date"><Moment fromNow>{article.date}</Moment></span>
                            <p>{ article.content }</p>
                            <Link to={ "/blog/editar/" + article._id } className="btn btn-warning">Editar</Link>
                            <button className="btn btn-danger" onClick={
                                () => {
                                    this.deleteArticle(article._id)
                                }
                            }>Eliminar</button>
                            <div className="clearfix"></div>
                        </article>
                    }
                    {!this.state.article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">El artículo no existe</h2>
                            <p>Intentelo de nuevo mas tarde</p>
                        </div>
                    }
                    {!this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando</h2>
                            <p>Espere unos segundos</p>
                        </div>
                    }
                </section>
                <Sidebar/>
                <div className="clearfix"></div>
            </div>
        );
    }
}
export default Article