/// <reference types="jquery"/>

let contadorPagina = 1

export function mostrarCargando () {
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

export function mostrarModal () {
  const modalPokemon = $(`<div class="modal fade" id="modal-pokemon" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title centrado-modal" id="exampleModalCenterTitle">Cargando...</h5>
        </div>
        </div>
    </div>
    </div>`)

  $('body').prepend(modalPokemon)

  $('#modal-pokemon').modal('show')
}

export async function agregarInfoAlModal (datosPokemon) {
  $('.modal-title').text(datosPokemon.name)

  if (datosPokemon.front_image !== null) {
    $('.modal-content').append(`<div class="modal-body">
                          <img src=${datosPokemon.front_image} alt=${datosPokemon.name} id="img-pokemon"></img>
                      </div>`)
  } else {
    $('.modal-content').append(`<div class="modal-body centrado-modal">
                          <strong>Imagen no disponible</strong>
                      </div>`)
  }

  $('.modal-content').append(`<div class="modal-body">${datosPokemon.description}</div>`)

  $('.modal-content').append(`<div class="modal-body centrado" id="stats">
                        <b>Height: </b><label>${datosPokemon.height}</label>
                            <b>Weight: </b><label>${datosPokemon.weight}</label>
                    </div>"`)

  $('.modal-content').append('<div class="modal-body centrado" id="types"></div>')
  $('#types').append('<h5>Type: </h5>')
  datosPokemon.types.forEach((e) => {
    $('#types').append(`<img class="type-img" title=${e} src="types_images/${e}.jpg">`)
  })

  $('.modal-content').append(`<div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>`)
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

export function mostrarErrorModal () {
  $('#exampleModalCenterTitle').text('Lo sentimos, no pudimos obtener ese pokemon')
}
