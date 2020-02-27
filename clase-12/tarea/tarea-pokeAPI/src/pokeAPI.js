/// <reference types="jquery"/>

import { agregarInfoAlModal, mostrarModal, mostrarErrorModal } from './interfaz.js'

export function obtenerDatosPokemon (nombre) {
  mostrarModal()

  $.ajax({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${nombre}`,
    success: respuesta => {
      almacenarDatosPokemon(respuesta)
    },
    error: () => {
      mostrarErrorModal()
    }
  })
}

async function almacenarDatosPokemon (datos) {
  let datosTotalesPokemon

  $.ajax({
    method: 'GET',
    url: datos.species.url,
    success: descripcion => {
      datosTotalesPokemon = {
        name: datos.forms[0].name,
        front_image: datos.sprites.front_default,
        types: [],
        height: datos.height,
        weight: datos.weight,
        description: ''
      }

      Object.keys(datos.types).forEach(e => {
        datosTotalesPokemon.types.push(datos.types[e].type.name)
      })

      datosTotalesPokemon.description = obtenerEnIngles(descripcion)

      agregarInfoAlModal(datosTotalesPokemon)
    }
  })
}

function obtenerEnIngles (descripciones) {
  const cantidadDescrip = descripciones.flavor_text_entries.length
  for (let index = 0; index <= cantidadDescrip; index++) {
    if (descripciones.flavor_text_entries[index].language.name === 'en') {
      return descripciones.flavor_text_entries[index].flavor_text
    }
  }
}
