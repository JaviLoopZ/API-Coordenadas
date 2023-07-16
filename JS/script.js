// Función para obtener la ubicación del usuario
function obtenerUbicacion() {
    // Se verifica si el navegador soporta la geolocalización
    if (navigator.geolocation) {
        //Se obtiene la ubicación del usuario
        navigator.geolocation.getCurrentPosition(obtenerHora);
    } else {
        console.log("La geolocalización no es soportada por este navegador.");
    }
}

function guardarDatos(latitud, longitud)
{
    // Se utiliza formData para enviar los valores al body del fetch
    const formData = new FormData();
    formData.append("latitud", latitud);
    formData.append("longitud", longitud);
    const url = "./PHP/GuardarDatos.php";
    fetch(url,{
        method: "POST",
        body: formData
    })
    .then(response =>{
        if(!response.ok){
            throw new Error("La respuesta del servidor no es válida.");
        }
        return response.text();
    })
    .then(responseText =>{
        console.log("Respuesta del servidor: " + responseText);
    })
    .catch(error =>{
        console.log("Error al enviar los datos a la base de datos: " + error);
    });
}

// Función para obtener la hora de acuerdo a la ubicación
function obtenerHora(posicion) {
    //Se obtienen las coordenadas de latitud y longitud
    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;

    //Se hace la solicitud a la API
    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=FTRTM0STVO72&format=json&by=position&lat=${latitud}&lng=${longitud}`;
    fetch(url)
    .then(response =>{
        if(!response.ok){
            throw new Error("La respuesta del servidor no es válida.");
        }
        return response.json();
    })
    .then(datos_ubicacion =>{
        //Se imprimen los datos de la hora
        const hora = datos_ubicacion.formatted;
        const solo_hora = hora.split(' ')[1];
        console.log("hora: " + solo_hora);
        guardarDatos(latitud, longitud);

    });
}

obtenerUbicacion();

