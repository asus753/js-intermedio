/// <reference types="jquery"/>

$.ajax({
  method: 'GET',
  url: 'https://api.exchangeratesapi.io/latest',
  success: respuesta => {
    añadirBases(respuesta)
  },
  error: () => {
    const alerta = $(`<div class="alert alert-danger" role="alert">
        La base de datos se escuentra caida, intentalo mas tarde. Lo sentimos </div>`)

    $('form').append(alerta)
  }

})

$('#convertir').click(() => {
  $('#devolucion-monedas').empty()

  const fecha = $('#fecha').val()
  const monedaBase = $('#listado-bases').val()

  const URL = `https://api.exchangeratesapi.io/${fecha}?base=${monedaBase}`

  if (monedaBase.length === 3) {
    if ($('#datos-incorrectos')) {
      $('#datos-incorrectos').detach()
    }

    $.ajax({
      method: 'GET',
      url: URL,
      success: respuesta => {
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
      },
      error: () => {
        const alerta = $(`<div class="alert alert-danger" role="alert" id="datos-incorrectos">
                No pudimos obtener los datos de esa fecha y con esa base. Lo sentimos </div>`)

        $('form').append(alerta)
      }
    })
  } else {
    $('#datos-incorrectos').detach()

    const alerta = $(`<div class="alert alert-danger" role="alert" id="datos-incorrectos">
        Los datos ingresados son incorrectos. Intentelo nuevamente </div>`)

    $('form').append(alerta)
  }
})

function añadirBases (respuestaJSON) {
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
}
