/// <reference types="jquery"/>

export function corregirURL (cantPokemons) {
  const offset = cantPokemons - 40 - ($('.card').length)
  const URLcorregida = `https://pokeapi.co/api/v2/pokemon/?limit=40&offset=${offset}`

  return URLcorregida
}

export function testURLdañada (urlAnterior, urlSiguiente) {
  if (urlAnterior.indexOf('limit=40') === -1 && urlSiguiente === null) {
    return true
  }
}

export function obtenerURLpokemonUnico (nombre) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nombre}/`

  return url
}
