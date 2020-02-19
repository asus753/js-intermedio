/// <reference types="jquery"/>
import { URLparaPokemon } from './index(nuevo).js'

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
  $('.card').click(() => {
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
  })
}
