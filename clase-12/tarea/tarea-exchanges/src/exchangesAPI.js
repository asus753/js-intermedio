/// <reference types="jquery"/>

export function obtenerNombresBases (funcionAgregarBases) {
  $.ajax({
    method: 'GET',
    url: 'https://api.exchangeratesapi.io/latest',
    success: respuesta => {
      funcionAgregarBases(respuesta)
    },
    error: () => {
      const alerta = $(`<div class="alert alert-danger" role="alert">
            La base de datos se escuentra caida, intentalo mas tarde. Lo sentimos </div>`)

      $('form').append(alerta)
    }
  })
}
