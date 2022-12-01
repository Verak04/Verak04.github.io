var puntaje = 0;
var personaje_perfil = ["../img/tarjetas/imagen1.jfif", "../img/tarjetas/imagen5.png", "../img/tarjetas/imagen11.jpg", "../img/tarjetas/imagen10.png", "../img/tarjetas/imagen8.jfif", "../img/tarjetas/imagen6.jfif", "../img/tarjetas/imagen2.jfif", "../img/tarjetas/imagen14.jpg"];

var usuario = "";

function ingreso() {
    usuario = document.getElementById("letra").value;
    localStorage.setItem("nombre",usuario);
    document.getElementById("ingreso").innerHTML = "<h1>" + usuario.toUpperCase() + "</h1><h2>Elegí tu personaje de perfil:</h2> <ul id='foto_perfil'></ul>"
    for (let i in personaje_perfil) {
        let posicion=i;
        document.getElementById("foto_perfil").innerHTML += "<li> <button class='imagen' onclick='ahorcado2("+posicion+")'><img src=" + personaje_perfil[i] + " alt=''></button></li>"
    }
    localStorage.setItem("puntaje",0);
}

function ahorcado2(posicion) {
    localStorage.setItem("imagen",personaje_perfil[posicion]);
    window.location.href = "./ahorcado.html";
};



//-----------------------------------------------------------------------------------------------------------------
var palabras = ["ABOGADO", "ANGEL", "ENOJADO", "CALABAZA", "VOLADOR", "JIRAFA", "LIBRO", "RELAMPAGO", "DESMAYO", "CONCEBIR", "VERTICE", "SUCUMBIR", "BARBERO", "DICCIONARIO", "ELEFANTE", "HERMANO", "HOSPITAL", "DESARROLLADOR", "DESTORNILLADOR", "ELECTRICO", "ASCENSOR", "ADAPTACION", "AGUDO", "ANTIBIOTICO", "CIRCULACION", "PLASTICO", "GENERAR", "NUMERO",];

/*Elección aleatoria de la palabra (posicion del array)*/
var palabra1 = palabras[Math.floor(Math.random() * palabras.length)];

/*Palabra convertida en array*/
var palabra_ahorcado = palabra1.split('');

/*Creación de la cantidad de espacios que tiene la palabra*/
for (let i in palabra_ahorcado) {
    let ide = "posicion" + i;
    console.log(ide);
    document.getElementById("ahorcado").innerHTML += "<li id='" + ide + "'>_</li>";
}

usuario=localStorage.getItem("nombre");
document.getElementById("jugador_perfil").innerHTML="<h2 class='nombre_jugador'>"+usuario.toLowerCase()+"</h2>";
puntaje=localStorage.getItem("puntaje");
document.getElementById("puntaje").innerHTML = "<h3>" + Number(puntaje) + "</h3>";
let imagen=localStorage.getItem("imagen");
document.getElementById("jugador_perfil").innerHTML+="<img class='imagen2' src=" + imagen+ " alt=''>";

var cont = 0;
var cont_correcto = 0;
var cont_error = 0;
var cant_palabras = palabra_ahorcado.length - 1;
var palabraIngresadaCorreta = [];
palabraIngresadaCorreta[0] = " "


console.log(palabra_ahorcado);
//Ingreso de letra.
function ahorcado() {
    
    letra_ingresada = document.getElementById("letra").value;
    console.log(letra_ingresada);
    cont = 0;
    let cont2 = 0;
    //Comprueba que la letra ingresada "correcta" no sea repetida.
    while (cont2 < palabraIngresadaCorreta.length) {
        if (letra_ingresada.toUpperCase() === palabraIngresadaCorreta[cont2]) {
            swal({
                title: 'Letra repetida',
                showConfirmButton: false,
                timer: 10000,
            })
            break;
        } else {
            cont2++;
            console.log(cont2)
        }
    }

    //si la letra "correcta" no fue ingresada entra al for y se realiza la comparación con cada una de las letras
    if (cont2 >= palabraIngresadaCorreta.length) {
        for (let i in palabra_ahorcado) {

            if (palabra_ahorcado[i] === letra_ingresada.toUpperCase()) {
                cont_correcto++;
                puntaje = parseInt(puntaje) + 30; //puntaje por cada letra adivinada
                document.getElementById("puntaje").innerHTML = "<h3>" + puntaje + "</h3>";
                var ide = "posicion" + i;
                var palabra_correcta = document.createElement(ide);
                palabra_correcta.innerHTML = "<li id='" + ide + "'>" + palabra_ahorcado[i] + "</li>";
                document.getElementById(ide).parentNode.replaceChild(palabra_correcta, document.getElementById(ide));
                palabraIngresadaCorreta.push(palabra_ahorcado[i]);
            }
            else {
                cont++;
            }
        }
    }

    //Conteo de los aciertos.
    if (cont_correcto > cant_palabras) {
        puntaje = parseInt(puntaje) + 150;//Suma del puntaje de la palabra total adivinada.
        swal({
            title:  'Felicitaciones ' + usuario.toLocaleUpperCase() + '! Sumas a tu puntaje '+puntaje,
            showConfirmButton: false,
            timer: 10000,
        })
        document.getElementById("puntaje").innerHTML = "<h3>" + puntaje + "</h3>";
        localStorage.setItem("puntaje",puntaje);
        location.reload();
    }
    //Conteo de los errores
    else if (cont > cant_palabras) {
        cont_error++;
        let imagen = "error_" + cont_error;
        puntaje = parseInt(puntaje) - 10;//resta de puntaje por cada error.
        document.getElementById("puntaje").innerHTML = "<h3>" + puntaje + "</h3>";
        document.getElementById("dibujo").innerHTML = "<img src='../img/" + imagen + ".png' alt=''></img>"
        if (cont_error > 4) {
            puntaje = parseInt(puntaje) - 100; //Resta de puntaje por no adivinar la palabra.
            swal({
                title: 'Perdiste!. Puntaje total ' + puntaje,
                showConfirmButton: false,
                timer: 10000,
            })
            document.getElementById("puntaje").innerHTML = "<h3>" + puntaje + "</h3>";
           localStorage.setItem("puntaje",puntaje);
            location.reload();
        }
    }
    return
};
