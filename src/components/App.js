import React, { Component } from 'react';
import Products from './products/products'
import Buscador from './buscador/buscador'
import Paginacion from './paginacion/paginacion'


import '../dist/main.css'


class App extends Component{

        constructor(props){
                super(props);
                this.state=({
                        productos:[],
                        resultados:undefined,
                        pagina:1
                })
        }


        async componentDidMount(){

                this.busqueda="batman"
                var res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=95ad37d6&s=${this.busqueda}&page=1`)
                .then((obj)=>{
                        return obj.json()
                }).catch(()=>{
                        console.log("Error al cargar la api")
                })

                this.setState({
                        productos:res.Search
                })

        }

        Buscar_peliculas=async(busqueda)=>{
                this.busqueda=busqueda;
                var res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=95ad37d6&s=${this.busqueda}&page=1`)
                .then((obj)=>{
                        return obj.json()
                }).catch(()=>{
                        console.log("Error al cargar la api")
                })

                 this.setState({
                         productos:res.Search,
                         resultados:res.totalResults,
                         pagina:1,
                 })
        }

        cambiar_pagina=async(value)=>{
                 if(value){
                         this.setState((nex)=>({
                                 pagina: nex.pagina +1 ,
                         }))
                 }else{
                         this.setState((nex)=>({
                                 pagina:nex.pagina - 1,
                         }))
                 }


        }

        shouldComponentUpdate=async(nextProps, nextState)=>{

                if(this.state.pagina !== nextState.pagina && nextState.pagina > 0){
                        var res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=95ad37d6&s=${this.busqueda}&page=${nextState.pagina}`)
                        .then((obj)=>{
                                return obj.json()
                        }).catch(()=>{
                                console.log("Error al cargar la api")
                        })
        
                         this.setState({
                                 productos:res.Search,
                                 resultados:res.totalResults, 
                         })
                }
                return true
        }





        render(){

        return (
                <div style={{backgroundColor:"rgb(0, 0, 50)"}}>
                        <Buscador Buscar={this.Buscar_peliculas} />
                        <Products productos={this.state.productos} />
                        <Paginacion cambiar={this.cambiar_pagina} pagina={this.state.pagina} productos={this.state.productos ? this.state.productos.length:0} />
                </div>
                );

        }       


}
 
export default App;