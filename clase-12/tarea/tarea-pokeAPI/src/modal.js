/// <reference types="jquery"/>

export async function agregarInfoAlModal (datosPokemon) {
  $('.modal-title').text(datosPokemon.name)

  if (datosPokemon.front_image !== null) {
    $('.modal-content').append(`<div class="modal-body">
                            <img src=${datosPokemon.front_image} alt=${datosPokemon.name} id="img-pokemon"></img>
                        </div>`)
  } else {
    $('.modal-content').append(`<div class="modal-body centrado-modal">
                            <strong>Image not available</strong>
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

export function mostrarModal () {
  const modalPokemon = $(`<div class="modal fade" id="modal-pokemon" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title centrado-modal">Loading...</h5>
          </div>
          </div>
      </div>
      </div>`)

  $('body').prepend(modalPokemon)

  $('#modal-pokemon').modal('show')
}

export function mostrarErrorModal () {
  $('.modal-title').text("Sorry, we couldn't get that pokemon")
}
