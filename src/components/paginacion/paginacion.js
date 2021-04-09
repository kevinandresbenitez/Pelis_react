


export default function Paginacion (props){


    function paginacion(valor){
        props.cambiar(valor)
    }


    return(
        <div className='cont_pagination'>

            {props.pagina > 1 ?  <button onClick={()=>{paginacion(false)}}>Anterior</button>:false }
            {props.productos > 9 ? <button onClick={()=>{paginacion(true)}}>Siguiente</button> :false}



        </div>
    )


}