var datos = 0; //variable global
var numero = 0;
var cantidad = [];

async function apirandomuser (){
    numero = 0;
    cantidad = document.getElementById("cantidad").value; //Cantidad Total
    const respuesta = await fetch("https://randomuser.me/api?results="+cantidad);
    datos = await respuesta.json();
    muestra();  
}
function anterior(){
     numero--;
     if (numero < 0){
        numero = 0;
     }
     muestra();
}
function siguiente(){
    numero++;
    if(numero  == cantidad){
        numero--;
    }
    muestra();
}

function muestra(){
    console.log("Arreglo posición: "+numero);
    let foto = document.getElementById("foto");
    let nombre = document.getElementById("nombre");
    let telefono = document.getElementById("telefono");
    foto.setAttribute("src",datos.results[numero].picture.large);
    nombre.innerHTML=datos.results[numero].name.first+" "+datos.results[numero].name.last;
    telefono.innerHTML=datos.results[numero].phone;
}