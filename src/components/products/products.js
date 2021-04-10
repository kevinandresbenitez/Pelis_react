import React, { Component } from 'react';


class Productos extends Component {
    constructor(props) {
        super(props);
        this.state = ({ 
            modal_id:false,
         })
    }

    componentDidMount(){
        this.cerrar_detalles();
    }


    cerrar_detalles(){
        var modal =document.getElementById("modal_products");
        var overlay=document.getElementsByClassName("overlay");
        overlay[0].style.display='none'
        modal.style.animation='quitar_modal 0.4s';
        modal.style.display = "none";
    }

    async detalles_product(id){
        var modal =document.getElementById("modal_products");
        var overlay=document.getElementsByClassName("overlay");
        overlay[0].style.display='block'


        modal.style.animation='mostrar_modal 0.4s';
        modal.style.display = "inline-flex";

        var detalles_product = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=95ad37d6`)
            .then((res)=>{
                return res.json()
            })
            .catch(()=>{
                console.log("Erro al mostrar los detalles de la pelicula")
            })



            

        this.setState({modal:detalles_product});
    }



    render() { 
        console.log(this.state.modal)
        return (


            <div className='cont_products'>

                {this.props.productos ? this.props.productos.map((obj,ind)=>{
                return(
                        <button className='items_products' key={ind} onClick={()=>{this.detalles_product(obj.imdbID)}}>
                            <div>
                            <img src={obj.Poster} alt={"Imagen"+ind} ></img>

                            </div>

                            <div>

                                <p>{obj.Title}</p>
                                <div>
                                <h3>Año:{obj.Year ? obj.Year :"2002"}</h3>
                                <h3>Tipo:{obj.Type ? obj.Type :"Accion"}</h3>
                                </div>

                                
                            </div>

                    </button>                
                )
                }):<h1 style={{color:"white",fontSize:"2.9rem",textAlign:"center",height:"600px"}}>No se encontraron resultados</h1>}


                <div  className='modal_products' id='modal_products'>
                    <div>
                        <img src={this.state.modal  ? this.state.modal.Poster:null} alt='Poster'></img>                    
                    </div>

                    <div>
                        {!this.state.modal ? null :                        
                            <div>
                                <div>
                                    <h1>{this.state.modal.Title}</h1>
                                </div>

                                <div>     
                                    <p><strong>Tipo:</strong>{this.state.modal.Type}</p>
                                    <p><strong>Fecha:</strong>{this.state.modal.Year}</p>
                                    <p><strong>Pais:</strong>{this.state.modal.Country}</p>
                                    <p><strong>Genero:</strong>{this.state.modal.Genre}</p>
                                    <p><strong>Lenguaje:</strong>{this.state.modal.Language}</p>
                                    <p><strong>Director:</strong>{this.state.modal.Director}</p>
                                    <p><strong>Actores:</strong>{this.state.modal.Actors}</p>
                                    <p><strong>Produccion:</strong>{this.state.modal.Production}</p>
                                    <p><strong>Sinopsis:</strong>{this.state.modal.Plot}</p>
                                </div>

                            </div>                                            
                        }
                    </div>

                    <button onClick={this.cerrar_detalles}><strong>&#88;</strong> </button>
                </div>




                <div className='overlay'>

                </div>


            </div>
                
            





        );
    }
}
 
export default Productos;