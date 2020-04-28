export class CambiosMoneda {
  constructor (respuestaAPIExchanges) {
    this.cambios = respuestaAPIExchanges
  }
}

export class CambioMonedaUnica {
  constructor (moneda, valor){
    this.moneda = moneda
    this.valor = valor
  }
}
