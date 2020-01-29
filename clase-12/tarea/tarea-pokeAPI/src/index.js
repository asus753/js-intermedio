/// <reference types="jquery"/>

const URL="https://pokeapi.co/api/v2/pokemon/"


function agregarTarjetas(){
    $.ajax({
        method: "GET",
        url: URL,
        success: respuesta => {
            //console.log(respuesta)

            const contenedorTarjetas = $("#contenerdor-cartas-padre")

            Object.values(respuesta.results).forEach(e=>{
                
                obtenerDatosPokemon(e)
                //agregarCartaPokemon(e)
                
                
            })

        },
    })
}

agregarTarjetas()

function obtenerDatosPokemon(pokemon){
    let datosPokemon={
        nombre: pokemon.name,
        foto: "",
        type: [],
    }

    const URLpokemon = pokemon.url

    $.ajax({
        method: "GET",
        url: URLpokemon,
        success: respuesta => {

            datosPokemon.foto=respuesta.sprites.front_default

            Object.values(respuesta.types).forEach(slotType => {
                
                datosPokemon.type.push(slotType.type.name)
                
            })

            agregarCartaPokemon(datosPokemon)
        },
    })

}



function agregarCartaPokemon(datosPokemon){


    const cartaHTML = $(`<div class="col" id="contenedor-cartas-hijo">
        <div class="card" id="carta">    
            <img src=${datosPokemon.foto} class="card-image-top pokemon" alt=${datosPokemon.nombre}>
            <div class="card-body">
                <h5 class="card-tittle">${datosPokemon.nombre}</h5>
                <p class="card-text">${datosPokemon.type}</p>
                <a href="#" class="btn btn-primary">Ver</a>
            </div>
        </div>    
    </div>`)


    $("#contenerdor-cartas-padre").append(cartaHTML)
}

