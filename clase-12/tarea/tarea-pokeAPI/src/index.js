/// <reference types="jquery"/>

let URLprimera="https://pokeapi.co/api/v2/pokemon/"
let URLsegunda


function agregarTarjetas(URL){
    $.ajax({
        method: "GET",
        url: URL,
        success: respuesta => {

            const contenedorTarjetas = $("#contenerdor-cartas-padre")

            Object.values(respuesta.results).forEach(e=>{
                
                agregarCartaPokemon(e)  
            })

            URLsegunda=respuesta.next


            if($(".card").length===20){
                agregarTarjetas(URLsegunda)
            }
            
            if($(".card").length===40){
                mostrarPokemon()
            }
            


        },
    })
}

function agregarCartaPokemon(pokemon){

    const cartaHTML = $(`<div class="col">
        <div class="card border-primary">
            <div class="card-body" id="carta-pokemon">${pokemon.name.toUpperCase()}</div>
        </div>
    </div>`)

    $("#contenerdor-cartas-padre").append(cartaHTML)
}

function mostrarPokemon(){
    $(".card").click(e=>{
        //crear carta del pokemon y hacer un get de los datos e introducirlos en la carta, mostrar la carta
    })
}

agregarTarjetas(URLprimera)



