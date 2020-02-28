/// <reference types="jquery"/>

let contadorPagina = 1

export function mostrarCargandoPagina () {
  if ($('#cargando').text() === '') {
    $('.container').append('<h3 class="centrado" id="cargando">Loading...</h3>')
  }
}

export function agregarCartaPokemon (pokemon) {
  const nombrePokemon = $(`<div class="col">
          <div class="card border-primary">
              <div class="card-body centrado" id="carta-pokemon">${pokemon.name.toUpperCase()}</div>
          </div>
      </div>`)

  $('#contenedor-cartas-padre').append(nombrePokemon)
}

export function manejarBotones (URLanterior, URLsiguiente) {
  if (URLanterior === null) { accesoBotones($('#padre-anterior'), 'desactivar') } else { accesoBotones($('#padre-anterior'), 'activar') }

  if (URLsiguiente === null) { accesoBotones($('#padre-siguiente'), 'desactivar') } else { accesoBotones($('#padre-siguiente'), 'activar') }
}

function accesoBotones (boton, eleccion) {
  if (eleccion === 'activar') {
    boton.removeClass('disabled')
    boton.removeClass('noClick')
  }

  if (eleccion === 'desactivar') {
    boton.addClass('disabled')
    boton.addClass('noClick')
  }
}

export function setNumeroPagina (direccion) {
  if (direccion === 'Next') {
    contadorPagina++
    $('#pagina').text(`Page ${contadorPagina}`)
  } else if (direccion === 'Previous') {
    contadorPagina--
    $('#pagina').text(`Page ${contadorPagina}`)
  }
}

export function mostrarErrorServidor () {
  $('#cargando').text('Sorry, the server is down.')
  $('#navegation').detach()
  $('#pagina').detach()
}
