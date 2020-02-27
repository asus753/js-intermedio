/// <reference types="jquery"/>
import {
  mostrarCargando,
  agregarCartaPokemon,
  manejarBotones,
  setNumeroPagina
} from './interfaz.js'
import { obtenerDatosPokemon } from './pokeAPI.js'
import { corregirURL, testURLdañada } from './varios.js'

export const URLparaPokemon = 'https://pokeapi.co/api/v2/pokemon/'
const URLprimera = 'https://pokeapi.co/api/v2/pokemon/?limit=40'

let CantidadTotalPokemons
let URLanterior
let URLsiguiente

export async function cargarCartas (url) {
  mostrarCargando()
  $.ajax({
    method: 'GET',
    url: url,
    success: respuesta => {
      if (CantidadTotalPokemons == null) {
        CantidadTotalPokemons = respuesta.count
      }

      Object.values(respuesta.results).forEach(e => {
        agregarCartaPokemon(e)
      })

      manejarBotones(respuesta.previous, respuesta.next)
      URLanterior = respuesta.previous
      URLsiguiente = respuesta.next

      $('#cargando').detach()
      clickCarta()
    },
    error: () => {
      // Meter todo esto dentro de una funcion
      $('#cargando').text('Lo sentimos, el servidor se encuentra caido.')
      $('#navegation').detach()
      $('#pagina').detach()
    }
  })
}

async function clickCarta () {
  $('.card').click((e) => {
    const nombrePokemon = e.target.innerText.toLowerCase()
    obtenerDatosPokemon(nombrePokemon)
  })
}

$('#padre-siguiente').click((e) => {
  $('#contenedor-cartas-padre').empty()
  setNumeroPagina(e.target.innerText)
  cargarCartas(URLsiguiente)
})

$('#padre-anterior').click((e) => {
  if (testURLdañada(URLanterior, URLsiguiente)) {
    $('#contenedor-cartas-padre').empty()
    setNumeroPagina(e.target.innerText)
    cargarCartas(corregirURL(CantidadTotalPokemons))
  } else {
    $('#contenedor-cartas-padre').empty()
    setNumeroPagina(e.target.innerText)
    cargarCartas(URLanterior)
  }
})

cargarCartas(URLprimera)

$('#boton-buscar').click(() => {
  const nombrePasado = $('#search-pokemon').val().toLowerCase()
  obtenerDatosPokemon(nombrePasado)
})

// Revisar nombres y ubicacion de funciones
