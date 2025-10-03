let vidas = 6;
let palabras = ["JAVASCRIPT", "HTML", "CSS", "PROGRAMACION", "ANIMALES", "GATOS", "PERROS", "FRUTA", "VERDURA", "CIUDAD", "PAIS", "MONUMENTO"];

let palabra = Math.floor(Math.random() * palabras.length);

// palabra correcta
let palabraCorrecta = palabras[palabra];

// palabra a adivinar 
let palabraAdivinar = [];

// letras que no estan en la palabra
let letrasNoEnPalabra = [];

// bucle para llenar el array de la palabra a adivinar con guiones bajos
for(let letter of palabraCorrecta){
    palabraAdivinar.push("_");
}
actualizarPantalla();

function actualizarPantalla(){
    let h2 = document.getElementById("palabra");
    let h3 = document.getElementById("vidas");
    let pre = document.getElementById("letrasNoEnPalabra");

    pre.textContent = "Letras que no estan en la palabra: " + letrasNoEnPalabra.join(" ");

    // actualizar el contenido de h2 y h3
    h2.textContent = "";
    h3.textContent = "Vidas: " + vidas;
    
    for(let letter of palabraAdivinar){
        h2.textContent += letter + " ";
    }
}


function handleSubmit(event){
    
    // evitar que se recargue la pagina
    event.preventDefault(); 
    
    // obtener la letra del formulario
    let letter = event.target.letter.value.toUpperCase();

    // si la persona elije una palabra en vez de una letra
    if(letter.length > 1){
        if(letter === palabraCorrecta){
            gano();
            for(let i = 0; i < palabraCorrecta.length; i++){
                palabraAdivinar[i] = palabraCorrecta[i];
            }
            actualizarPantalla();
            return;
        }  
        // si escribió más de una letra pero no acertó, tomamos solo la primera
        else letter = letter[0];
    }

    // si la letra ya fue elegida antes no hace nada y sale de la funcion
    if(letrasNoEnPalabra.includes(letter)) return;

    let fallo = true;

    // revisar si la letra esta en la palabra correcta
    for(let i = 0; i < palabraCorrecta.length; i++){
        if(letter == palabraCorrecta[i]){  // esto es si coincide
            palabraAdivinar[i] = letter;
            fallo = false;
        }
    }

    if(fallo){ // y esto es si no coincide y resta vida
        vidas--;
        letrasNoEnPalabra.push(letter);
    }

    actualizarPantalla();   

    if (vidas == 0) gameOver(); // si se quedan sin vidas llama a la funcion gameOver
    if(!palabraAdivinar.includes("_")) gano(); // si ya no hay guiones llama a la funcion gano

    // limpiar el formulario
    event.target.reset();
}


function gano(){
    document.querySelector("form > input").disabled = true; // esto es para que no se pueda seguir escribiendo luego de ganar

    let h1 = document.querySelector("h1");
    h1.textContent = "Muy bien, ganaste!";
}

function gameOver(){
    document.querySelector("form > input").disabled = true; // lo mismo que la funcion gano
    let h1 = document.querySelector("h1"); 
    h1.textContent = "Game over, la palabra era " + palabraCorrecta;
}
