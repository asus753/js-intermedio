/// <reference types="jquery"/>

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

export function AgregarTarjetasCambios (respuesta) {
  Object.keys(respuesta.rates).forEach(moneda => {
    if (moneda !== respuesta.base) {
      $('#devolucion-monedas').append(
        $(`<div class="col">
                              <div class="card text-center border-dark">
                                  <p style="margin: 12px;">
                                      <strong>${moneda} :</strong>
                                      <label style="margin: 0px;">${respuesta.rates[moneda].toFixed(2)}</label>
                                  </p>
                              </div>
                      </div>`))
    }
  })
}

export const errorFetch = $(`<div class="alert alert-danger" role="alert" id="datos-incorrectos">
  No pudimos obtener los datos de esa fecha y con esa base. Lo sentimos </div>`
)



export function agragarGifCargando () {
  const gif = $(`<div class="text-center" id="gif">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`)

  $('body').append(gif)
}
