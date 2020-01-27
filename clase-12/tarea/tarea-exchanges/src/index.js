/// <reference types="jquery"/>



$.ajax({
    method: "GET",
    url: "https://api.exchangeratesapi.io/latest",
    success: respuesta => {
        añadirBases(respuesta)
    },
    error: error=>{
        const alerta=$(`<div class="alert alert-danger" role="alert" id="datos-incorrectos">
        La base de datos se escuentra caida, intentalo mas tarde. Lo sentimos </div>`)

        $("form").append(alerta)
    }

})



$("#convertir").click(()=>{
    $("#devolucion-monedas").empty()

    const fecha=$("#fecha").val()
    const monedaBase=$("#listado-bases").val()

    const URL=`https://api.exchangeratesapi.io/${fecha}?base=${monedaBase}`

    if(validarInputs(fecha, monedaBase)){

        if($("#datos-incorrectos")){
            $("#datos-incorrectos").detach()
        }

        $.ajax({
            method: "GET",
            url: URL,
            success: respuesta => {
                Object.keys(respuesta.rates).forEach(moneda => {
    
                    $("#devolucion-monedas").append(
                        $(`<li>${moneda}: ${respuesta.rates[moneda]}</li>`))
                })
            },
            error: error => {
                const alerta=$(`<div class="alert alert-danger" role="alert" id="datos-incorrectos">
                No pudimos obtener los datos de esa fecha y con esa base. Lo sentimos </div>`)
        
                $("form").append(alerta)
            }
        })

    }else{

        $("#datos-incorrectos").detach()

        const alerta=$(`<div class="alert alert-danger" role="alert" id="datos-incorrectos">
        Los datos ingresados son incorrectos. Intentelo nuevamente </div>`)

        $("form").append(alerta)
         
    }
        
        
})

function añadirBases(respuestaJSON){
    const lista = $("#listado-bases")

    function agregarBase(base){
        const optionMoneda = $(`<option>${base}</option>`)

        lista.append(optionMoneda)
    }

    agregarBase(respuestaJSON.base)

    Object.keys(respuestaJSON.rates).forEach(e => {
        const optionMoneda = $(`<option>${e}</option>`)

        lista.append(optionMoneda)
    })
}

function validarInputs(fecha, moneda){
    if(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(fecha) && moneda.length===3){
        return true
    }
}
