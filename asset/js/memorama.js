const Carta =
    class Carta {
        #numero = undefined;
        #imagen = undefined;
        #color = undefined;
        constructor(numero, imagen, color) {
            this.#numero = numero;
            this.#imagen = imagen;
            this.#color = color;
        }
        getNumero() {
            return this.#numero;
        }
        getImagen() {
            return this.#imagen;
        }
        getColor() {
            return this.#color;
        }
        setNumero(numero) {
            this.#numero = numero;
        }
        setImagen(imagen) {
            this.#imagen = imagen;
        }
        setColor(color) {
            this.#color = color;
        }
        toStrin() {
            return "Numero de carta: " + this.#numero + " Imagen de carta: " + this.#imagen + " Color de carta: " + this.#color;
        }
    }

var numero = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var imagen = ["../img/tarjetas/imagen1.jfif", "../img/tarjetas/imagen2.jfif", "../img/tarjetas/imagen3.png", "../img/tarjetas/imagen4.jfif", "../img/tarjetas/imagen5.png", "../img/tarjetas/imagen6.jfif", "../img/tarjetas/imagen7.png", "../img/tarjetas/imagen8.jfif", "../img/tarjetas/imagen10.png", "../img/tarjetas/imagen11.jpg", "../img/tarjetas/imagen12.jpg", "../img/tarjetas/imagen14.jpg"];


function nombre_usuario(num1, num2) {
    document.getElementById("formulario_usuario").innerHTML = "<div id='div_usuario'><form action=''><h3>Nombre:</h3><input type='text' id='nombre_usuario'> <button onclick='nombre_memorama(),armado_cartas(" + num1 + "),posicion_cartas(" + num2 + "),cronometro(" + num1 + "," + num1 + "," + num2 + ")' id='botonJugar'>Jugar</button></form></div>";
}

var usuario_memorama = "";
function nombre_memorama() {
    usuario_memorama = document.getElementById("nombre_usuario").value;
}

var color = ["rojo", "azul", "verde", "rosa", "verde2", "naranja", "amarillo", "negro", "violeta"];

var cont = 0;
var cartas = [];

//armado de cartas aleatoriamente.(numero, imagen y color de carta)
function armado_cartas(dificultad) {
    while (cont < dificultad) {
        let imag = imagen[Math.floor(Math.random() * imagen.length)];
        let col = color[Math.floor(Math.random() * color.length)];
        cartas[cont] = new Carta(numero[cont], imag, col);
        cont++;
    }
    cont = 0;
    //duplicado de cartas.
    while (cont < dificultad) {
        cartas.push(cartas[cont]);
        cont++;
    }
}

var cartasN = [] //array para guardar la posiciones aleatorias de las cartas.

function posicion_cartas(dificultad) {
    document.getElementById("juego").innerHTML = "<div id='tiempo_memorama'><div><h3>" + usuario_memorama + "</h3></div><div id='cronometro'></div></div>"

    //posicion de cartas.
    while (cartasN.length < dificultad) {
        cartasN.push(Math.floor(Math.random() * cartas.length));
        cartasN = [...new Set(cartasN)];
    }

    cont = 0;
    document.getElementById("juego").innerHTML += "<div id='juego" + dificultad + "' display='grid' grid-template-columns='repeat(" + dificultad + ", 1fr)'></div>"
    while (cont < dificultad) {
        document.getElementById("juego" + dificultad).innerHTML += "<div id='carta" + cont + "'><ul class='adivinando'><li></li><li><button class='adivinando' onclick='juego(" + cont + "," + cont + "),seleccionarCarta(" + cont + "),comparacionCarta(" + cont + "," + dificultad + ")'><img class='imagen_carta2' src='../img/tarjetas/logoCarta.png' alt=''></button></li><li></li></ul></div>";
        cont++;
    }
}

//vista de carta seleccionada por el usuario.
function juego(num, cont) {
    var carta_elegida = document.createElement("div");
    carta_elegida.setAttribute("id", "carta" + cont);
    carta_elegida.innerHTML += "<ul id='" + cartas[cartasN[num]].getColor() + "' class='adivinando'><li>" + cartas[cartasN[num]].getNumero() + "</li><li><img class='imagen_carta' src='" + cartas[cartasN[num]].getImagen() + "' alt=''></li></ul>";
    document.getElementById("carta" + cont).parentNode.replaceChild(carta_elegida, document.getElementById("carta" + cont));
}

var cartaSeleccionada = [];
var posicionCarta = [];
function seleccionarCarta(cont) {
    var pDc = cont;
    cartaSeleccionada.push(cartas[cartasN[pDc]]);
    posicionCarta.push(pDc);
}

var correctas = 0;
function comparacionCarta(cont, dificultad) {
    let num = cartaSeleccionada.length - 1;
    let num1 = cartaSeleccionada.length - 2;
    let num2 = cartaSeleccionada.length - 1;
    if (num % 2 != 0) {
        let pDc1 = posicionCarta[posicionCarta.length - 2];
        let pDc2 = posicionCarta[posicionCarta.length - 1]
        if (cartaSeleccionada[num1] === cartaSeleccionada[num2]) {
            correctas++;
        }
        else {
            setTimeout(() => {
                let carta_error1 = document.createElement("div");
                carta_error1.setAttribute("id", "carta" + pDc1);
                carta_error1.innerHTML += "<ul class='adivinando'><li></li><li><button class='adivinando' onclick='juego(" + pDc1 + "," + pDc1 + "),seleccionarCarta(" + pDc1 + "),comparacionCarta(" + pDc1 + "," + dificultad + ")'><img class='imagen_carta2' src='../img/tarjetas/logoCarta.png' alt=''></button></li><li></li></ul>";
                document.getElementById("carta" + pDc1).parentNode.replaceChild(carta_error1, document.getElementById("carta" + pDc1));

                let carta_error2 = document.createElement("div");
                carta_error2.setAttribute("id", "carta" + pDc2);
                carta_error2.innerHTML += "<ul class='adivinando'><li></li><li><button class='adivinando' onclick='juego(" + pDc2 + "," + pDc2 + "),seleccionarCarta(" + pDc2 + "),comparacionCarta(" + pDc2 + "," + dificultad + ")'><img class='imagen_carta2' src='../img/tarjetas/logoCarta.png' alt=''></button></li><li></li></ul>";
                document.getElementById("carta" + pDc2).parentNode.replaceChild(carta_error2, document.getElementById("carta" + pDc2));
            }, 1000);

        }
    }
}

var segundos = 0;
var minutos = 0;
var tiempoMenor=1000;
function cronometro(numero) {
    document.getElementById("cronometro").innerHTML = "<h3>" + minutos + ":" + segundos + "</h3>"
    if (numero != correctas) {
        if (segundos == 60) {
            minutos++;
            setTimeout("cronometro()", 1000);
            segundos = 0;
        } else {
            segundos++;
            setTimeout("cronometro(" + numero + ")", 1000);
        }
    }
    else {
        swal({
            icon: "success",
            title: 'Felicitaciones ' + usuario_memorama.toLocaleUpperCase() + '! Tu tiempo fue de ' + minutos + ':' + segundos,
            showConfirmButton: false,
            timer: 4000,
            background: 'rgba(63,255,106,0.69)',
            border: '3px solid white'
        })
        location.reload();
    }
}
