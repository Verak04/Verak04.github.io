
var cubo = [];
var color = ["#ffffff", "transparent"]
var cont = 0;
var cont2 = 0;
function armado_cubos(dificultad) {
    document.getElementById("juego_seguime").innerHTML = "<div id='cubos" + dificultad + "'></div>"
    while (cont < dificultad) {
        cubo[cont] = cont2;
        console.log(cubo[cont]);
        cont++;
        document.getElementById("cubos" + dificultad).innerHTML += "<div class='div_cubos' id='lugar" + cont + "'><button onclick='pulzarluz(" + cont + ")'></button><div>";
    }
}
function abrirSeguime(dificultad){
    localStorage.setItem("cubos",dificultad)
    window.location.href="./seguime.html"
};
var vacio = []
var cuboN = [];
var colorN = []
var segundos = [];
var p_cubo = [];
var vueltas = [];
vueltas[0] = 6;

function luz() {

    if (segundos[0] < vueltas[0]) {
        console.log(cuboN[segundos[0]]);
        console.log(colorN[segundos[0]]);
        document.getElementById("lugar" + cuboN[segundos[0]]).style.backgroundColor = colorN[segundos[0]];
        let numero1 = segundos[0]
        segundos[0] = numero1 + 1;
        setTimeout("luz(vueltas)", 500);
    }
}

function empezar(niveles, vueltas) {
    cuboN = [...vacio];
    colorN = [...vacio];

    while (cuboN.length < niveles) {
        let numero = Math.floor(Math.random() * (cubo.length + 1))
        if (numero != 0) {
            cuboN.push(numero);
            cuboN.push(numero);
        }
    }
    while (niveles > colorN.length) {
        colorN.push(color[0]);
        colorN.push(color[1]);
    }
    console.log(cuboN);
    segundos[0] = 0;
    p_cubo[0] = 0;
    luz(vueltas[0])
}

var cont_error = 0;
var cont_bien = 0;
function pulzarluz(cont) {
    console.log(cont);
    document.getElementById("lugar" + cont).style.backgroundColor = "#ffffff";
    setTimeout(() => {
        document.getElementById("lugar" + cont).style.backgroundColor = "transparent";
    }, 500)
    setTimeout(() => {
    if (cont === cuboN[p_cubo[0]]) {
        let numero = p_cubo[0]
        p_cubo[0] = numero + 2;
        cont_bien++;

    } else if (cont_error > 1) {
        setTimeout(()=>{ alert("Perdiste"),500});
        cont_error = 0;
        vueltas[0] = 2;
        window.location.href="./ingreso_seguime.html"
        

    } else {
        cont_error++;
        document.getElementById("mensaje").innerHTML = "<h2 class='error'>" + cont_error + " Error</h3>";
        document.getElementById("mensaje").innerHTML = "";
        cont_bien = 0;
        setTimeout(()=>{ alert("Error. Intentalo otra vez!"),500});
        setTimeout(()=>{ empezar(20, vueltas[0]),700});
    }

    if (cont_bien === (vueltas[0] / 2)) {
        cont_bien = 0;
        setTimeout(()=>{ alert("Siguiente nivel"),700})
        let numLuz = vueltas[0];
        vueltas[0] = numLuz + 2;
        setTimeout(()=>{ empezar(20, vueltas[0]),700});
        
    }}, 1000)
}
let cubos=localStorage.getItem("cubos");
armado_cubos(cubos);