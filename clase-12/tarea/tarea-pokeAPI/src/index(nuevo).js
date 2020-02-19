/// <reference types="jquery"/>
import { mostrarCargando, agregarCartaPokemon } from './interfaz.js'
import { buscarCartas } from './pokeAPI.js'

export const URLparaPokemon = 'https://pokeapi.co/api/v2/pokemon/'
const URLprimera = 'https://pokeapi.co/api/v2/pokemon/?limit=40'

// let contadorPaginacion = 1

async function cargarCartas () {
  mostrarCargando()
  buscarCartas(URLprimera, agregarCartaPokemon)
}

cargarCartas()
