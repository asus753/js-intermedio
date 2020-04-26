/// <reference types="jquery"/>

import { obtenerNombresBases } from './exchangesAPI.js'
import {
  añadirBases,
  ObtenerURL,
  VaciarDatosPrevios,
  AgregarTarjetasCambios,
  errorFetch,
  agragarGifCargando
} from './interfaz.js'

function configurarSelector () {
  obtenerNombresBases(añadirBases)
}

configurarSelector()

$('#convertir').click(async () => {
  VaciarDatosPrevios()
  agragarGifCargando()

  $.ajax({
    method: 'GET',
    url: ObtenerURL(),
    success: respuesta => {
      $('#gif').detach()
      AgregarTarjetasCambios(respuesta)
    },
    error: () => {
      $('form').append(errorFetch)
    }
  })
})
