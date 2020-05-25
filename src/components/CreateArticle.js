import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

class CreateArticle extends Component {
    
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
                content: this.contentRef.current.value
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
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
            axios.post(this.url + 'save', this.state.article).then(res => {
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
                        'Articulo registrado',
                        'el articulo ha sido registrado con exito',
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

        return (
          <div className="center">
              <section id="content">
                  <h1 className="subheader">Crear Artículo</h1>
                  <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={ this.titleRef }  onChange={ this.changeState }/>
                            {this.validator.message('title', this.state.article.title, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={ this.contentRef } onChange={ this.changeState }></textarea>
                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file">Imagen</label>
                            <input type="file" name="file0" onChange= { this.fileChange }/>
                        </div>
                        <div className="clearfix"></div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                </form>
              </section>
              <Sidebar />
          </div>  
        );
    }
}

export default CreateArticle;