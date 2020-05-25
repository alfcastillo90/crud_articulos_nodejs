import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import logo from '../assets/images/logo.svg';

class EditArticle extends Component {
    articleId = null;
    url = Global.url;

    contentRef = React.createRef();
    titleRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
    }

    getArticle = (id) => {
       
        axios.get(this.url+'article/'+ id).then(response => {
            console.log(response.data);
            this.setState({
                article: response.data.article
            });
        }).catch(error => {
            this.setState({
                article: false,
                status: 'success'
            });
        });
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    saveArticle = (e) => {
        
        e.preventDefault();
        this.changeState();

        if (this.validator.allValid()) { 
            axios.put(this.url + 'article/'+this.articleId, this.state.article).then(res => {
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: 'waiting'
                    });
    
                    if(this.state.selectedFile != null ) {
                        const articleId = this.state.article._id;
                        const formData = new FormData();
                        
                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        );
                        
                        axios.post(this.url + 'upload-image/' + articleId, formData).then(res => {
                            if (res.data.article) {
                                this.setState({
                                    article: res.data.article,
                                    status: 'success'
                                });
                            } else {
                                this.setState({
                                    article: res.data.article,
                                    status: 'failed'
                                });
                            }
                        })
                    } else {
                        this.setState({
                            status: 'success'
                        });
                    }

                    swal(
                        'Articulo actualizado',
                        'el articulo ha sido actualizado con exito',
                        'success'
                    );

                } else {
                    this.setState({
                        article: res.data.article,
                        status: 'failed'
                    })

                    swal(
                        'No se pudo realizar la operación',
                        'ocurrio un error en el registro',
                        'error'
                    );
                }
            }).catch(error => {
                console.log(error)
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
            this.setState({
                status:'failed'
            });
            
             swal(
                'No se pudo realizar la operación',
                'Los campos titulo y contenido son obligatorios',
                'error'
            );
        }
        
    }

    componentWillMount() {
        this.articleId = this.props.match.params.id;

        this.getArticle(this.articleId);

        this.validator = new SimpleReactValidator(
            {
                messages: {
                    required: 'Este campo es obligatorio.'
                }
            }
        );
    }

    render() {
        if(this.state.status === 'success') {
            return <Redirect to='/blog' />;
        }
        const article = this.state.article;

        return (
          <div className="center">
              <section id="content">
                <h1 className="subheader">Editar Artículo</h1>
                {this.state.article.title &&
                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input 
                                type="text" 
                                name="title" 
                                ref={ this.titleRef }  
                                onChange={ this.changeState }
                                defaultValue={ article.title }/>
                            {this.validator.message('title', this.state.article.title, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea 
                                name="content" 
                                ref={ this.contentRef } 
                                onChange={ this.changeState }
                                defaultValue={ article.content }></textarea>
                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file">Imagen</label>
                            <input type="file" 
                                name="file0" 
                                onChange= { this.fileChange }/>
                            <div className="image-wrap">
                            { 
                                article.image !== null ? (
                                    <img src={ this.url + 'get-image/'+article.image } alt={article.title} className="thumb"/>
                                ): (
                                    <img src={ logo } alt={article.title} className="thumb"/>
                                )
                            }
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                }
                {!this.state.article.title &&
                    <h1 className="subheader">Cargando</h1>
                }
              </section>
              <Sidebar />
          </div>  
        );
    }
}

export default EditArticle;