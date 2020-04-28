/// <reference types="jquery"/>
import { CambiosMoneda, CambioMonedaUnica} from './clases.js'

export function añadirBases (respuestaJSON) {
  const lista = $('#listado-bases')

  function agregarBaseDefault (base) {
    const optionMoneda = $(`<option>${base}</option>`)

    lista.append(optionMoneda)
  }
  agregarBaseDefault(respuestaJSON.base)

  Object.keys(respuestaJSON.rates).forEach(e => {
    const optionMoneda = $(`<option>${e}</option>`)

    lista.append(optionMoneda)
  })
  $('#selected-base').detach()
}

export function ObtenerURL () {
  const fecha = $('#fecha').val()
  const monedaBase = $('#listado-bases').val()
  const URL = `https://api.exchangeratesapi.io/${fecha}?base=${monedaBase}`

  return URL
}

export function VaciarDatosPrevios () {
  $('#devolucion-monedas').empty()
  if ($('#datos-incorrectos')) {
    $('#datos-incorrectos').detach()
  }
}

export function AgregarTarjetasCambios (cambios) {
  const exchanges = new CambiosMoneda(cambios)
  
  Object.entries(exchanges.cambios).forEach(([moneda, valor]) => {
    const exchangeUnico = new CambioMonedaUnica(moneda, valor)

    $('#devolucion-monedas').append(
      $(`<div class="col">
          <div class="card text-center border-dark">
            <p style="margin: 12px;">
              <strong>${exchangeUnico.moneda} :</strong>
              <label style="margin: 0px;">${exchangeUnico.valor.toFixed(2)}</label>
            </p>
          </div>
      </div>`)
    )
  })

export const errorFetch = $(`<div class="alert alert-danger" role="alert" id="datos-incorrectos">
No pudimos obtener los datos de esa fecha y con esa base. Lo sentimos </div>`)

export function agragarGifCargando () {
  const gif = $(`<div class="text-center" id="gif">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`)

  $('body').append(gif)
}
