/// <reference types="jquery"/>

import { mostrarModal } from './interfaz.js'

export function buscarCartas (url, funcionAgregarlas) {
  $.ajax({
    method: 'GET',
    url: url,
    success: respuesta => {
      Object.values(respuesta.results).forEach(e => {
        
      })
      $('#cargando').detach()
      
    },
    error: () => {
      $('#cargando').text('Lo sentimos, el servidor se encuentra caido.')
      $('#navegation').detach()
      $('#pagina').detach()
    }
  })
}
