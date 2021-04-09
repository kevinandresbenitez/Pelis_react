import React from 'react';


export default function Buscador (props){



    function Buscar(){

        var busqueda =document.getElementById("Buscador").value;

        if(busqueda.length > 3){
            props.Buscar(busqueda)
            
        }

    }




    return(
         


        <div className='cont_buscador'>
                <div>
                    <h1>Buscar</h1>
                    <input type='search' id='Buscador' onKeyDown={(event)=>{ if(event.key === "Enter"){Buscar()}  }} ></input>
                    <button onClick={()=>{Buscar()}}>Buscar</button>
                </div>

        </div>
    )
    



    


}