/// <reference types="jquery"/>
import {
  mostrarCargandoPagina,
  agregarCartaPokemon,
  manejarBotones,
  setNumeroPagina,
  mostrarErrorServidor
} from './interfaz.js'
import { obtenerDatosPokemon } from './pokeAPI.js'
import { corregirURL, testURLdanada } from './url.js'

const URLprimera = 'https://pokeapi.co/api/v2/pokemon/?limit=40'

let cantidadTotalPokemons
let URLanterior
let URLsiguiente

export async function cargarCartas (url) {
  mostrarCargandoPagina()
  $.ajax({
    method: 'GET',
    url: url,
    success: respuesta => {
      if (cantidadTotalPokemons == null) {
        cantidadTotalPokemons = respuesta.count
      }

      Object.values(respuesta.results).forEach(e => {
        agregarCartaPokemon(e)
      })

      manejarBotones(respuesta.previous, respuesta.next)
      URLanterior = respuesta.previous
      URLsiguiente = respuesta.next

      $('#cargando').detach()
      definirManejadorClickCarta()
    },
    error: () => {
      mostrarErrorServidor()
    }
  })
}

function definirManejadorClickCarta () {
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
  if (testURLdanada(URLanterior, URLsiguiente)) {
    setNumeroPagina(e.target.innerText)
    cargarCartas(corregirURL(cantidadTotalPokemons))
  } else {
    $('#contenedor-cartas-padre').empty()
    setNumeroPagina(e.target.innerText)
    cargarCartas(URLanterior)
  }
})

cargarCartas(URLprimera)

$('#boton-buscar').click(() => {
  const nombrePasado = $('#input-pokemon').val().toLowerCase()
  obtenerDatosPokemon(nombrePasado)
})
