/// <reference types="jquery"/>

const URLparaPokemon = 'https://pokeapi.co/api/v2/pokemon/'

const URLprimera = 'https://pokeapi.co/api/v2/pokemon/?limit=40'

let URLsiguiente
let URLanterior

let contadorPaginacion = 1

let cantidadTotalPokemons

function agregarTarjetas (URL) {
  if ($('#cargando').text() === '') {
    $('.container').append('<h3 class="centrado" id="cargando">Loading...</h3>')
  }

  $.ajax({
    method: 'GET',
    url: URL,
    success: respuesta => {
      cantidadTotalPokemons = respuesta.count

      Object.values(respuesta.results).forEach(e => {
        agregarCartaPokemon(e)
      })

      if ($('.card').length === 40) {
        $('#cargando').detach()
        definirClickCarta()

        URLsiguiente = respuesta.next
        URLanterior = respuesta.previous
      }
    },
    error: () => {
      $('#cargando').text('Lo sentimos, el servidor se encuentra caido.')
      $('#navegation').detach()
      $('#pagina').detach()
    }
  })
}

function agregarCartaPokemon (pokemon) {
  const nombrePokemon = $(`<div class="col">
        <div class="card border-primary">
            <div class="card-body centrado" id="carta-pokemon">${pokemon.name.toUpperCase()}</div>
        </div>
    </div>`)

  $('#contenedor-cartas-padre').append(nombrePokemon)
}

function mostrarInfoPokemon (nombrePokemon) {
  const URLpokemon = `${URLparaPokemon}${nombrePokemon}/`

  const modalPokemon = $(`<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title centrado-modal" id="exampleModalCenterTitle">Cargando...</h5>
        </div>
        </div>
    </div>
    </div>`)

  $('body').prepend(modalPokemon)

  $('#exampleModalCenter').modal('show')

  obtenerDatosPokemon(URLpokemon)
}

function definirClickCarta () {
  $('.card').click((e) => {
    mostrarInfoPokemon(e.target.innerText.toLowerCase())
  })
}

function obtenerDatosPokemon (urlPokemon) {
  let datosTotalesPokemon

  $.ajax({
    method: 'GET',
    url: urlPokemon,
    success: respuesta => {
      datosTotalesPokemon = {
        name: respuesta.forms[0].name,
        front_image: respuesta.sprites.front_default,
        types: [],
        height: respuesta.height,
        weight: respuesta.weight,
        description: ''
      }

      Object.keys(respuesta.types).forEach(e => {
        datosTotalesPokemon.types.push(respuesta.types[e].type.name)
      })

      $.ajax({
        method: 'GET',
        url: respuesta.species.url,
        success: respuesta => {
          for (let index = respuesta.flavor_text_entries.length - 1; index >= 0; index--) {
            if (respuesta.flavor_text_entries[index].language.name === 'en') {
              datosTotalesPokemon.description = respuesta.flavor_text_entries[index].flavor_text
            }
          }

          $('.modal-title').text(datosTotalesPokemon.name)

          $('.modal-content').append(`<div class="modal-body">
                        <img src=${datosTotalesPokemon.front_image} alt=${datosTotalesPokemon.name} id="img-pokemon"></img>
                    </div>`)

          $('.modal-content').append(`<div class="modal-body">${datosTotalesPokemon.description}</div>`)

          $('.modal-content').append(`<div class="modal-body centrado" id="stats">
                        <b>Height: </b><label>${datosTotalesPokemon.height}</label>
                            <b>Weight: </b><label>${datosTotalesPokemon.weight}</label>
                    </div>"`)

          $('.modal-content').append('<div class="modal-body centrado" id="types"></div>')
          $('#types').append('<h5>Type: </h5>')
          datosTotalesPokemon.types.forEach((e) => {
            $('#types').append(`<img class="type-img" title=${e} src="types_images/${e}.jpg">`)
          })

          $('.modal-content').append(`<div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>`)
        }
      })
    },
    error: () => {
      $('.modal-title').text('No hemos podido encontrar ese pokemon, revise el nombre y reintentelo')
      $('.modal-content').append(`<div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>`)
    }
  })
}

$('.page-link').click((boton) => {
  if (boton.target.text === 'Next') {
    $('#contenedor-cartas-padre').empty()
    $('#padre-anterior').removeClass('disabled')
    contadorPaginacion++

    agregarTarjetas(URLsiguiente)

    if (contadorPaginacion === Math.ceil(cantidadTotalPokemons / 40)) {

      $('#cargando').remove()

      $('#padre-siguiente').addClass('disabled')
    }

    $('#pagina').text(`Page ${contadorPaginacion}`)
  } else if (boton.target.text === 'Previous') {
    $('#contenedor-cartas-padre').empty()
    $('#padre-anterior').removeClass('disabled')
    contadorPaginacion--

    if (contadorPaginacion === 1) { $('#padre-anterior').addClass('disabled') }

    agregarTarjetas(URLanterior)

    $('#pagina').text(`Page ${contadorPaginacion}`)
  }
})

$('#boton-buscar').click(() => {
  const nombrePokemon = $('#search-pokemon').val().toLowerCase()

  mostrarInfoPokemon(nombrePokemon)
})

agregarTarjetas(URLprimera)
