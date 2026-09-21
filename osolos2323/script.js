// --- LÓGICA DE LAS FLORES INTERACTIVAS ---
const flores = document.querySelectorAll('.bloque-flor');

flores.forEach(flor => {
    flor.addEventListener('mouseenter', activarVaiven);
    flor.addEventListener('touchstart', activarVaiven);
});

function activarVaiven(elemento) {
    const objetivo = elemento.currentTarget;
    objetivo.classList.add('mover-flor');
    setTimeout(() => {
        objetivo.classList.remove('mover-flor');
    }, 1200);
}


// --- LÓGICA DEL PARPADEO DEL OSO ---
const ojos = document.querySelectorAll('.ojo-animado');

function parpadearOso() {
    ojos.forEach(ojo => ojo.classList.add('parpadear'));
    
    setTimeout(() => {
        ojos.forEach(ojo => ojo.classList.remove('parpadear'));
    }, 150);

    const proximoParpadeo = Math.random() * (5000 - 2000) + 2000;
    setTimeout(parpadearOso, proximoParpadeo);
}

parpadearOso();


// --- LÓGICA DE LA CARTA Y LLUVIA DE CORAZONES ---
const btnAbrir = document.getElementById('btnAbrirCarta');
const btnCerrar = document.getElementById('btnCerrarCarta');
const overlay = document.getElementById('overlayCarta');
let intervaloCorazones; // Guarda el bucle para poder apagarlo

// Lista de colores bonitos para los corazones
const coloresCorazones = ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffccd5', '#ff85a1', '#ff0a54'];

function crearCorazon() {
    const corazon = document.createElement('div');
    corazon.classList.add('corazon-flotante');
    
    // Posición horizontal aleatoria
    corazon.style.left = Math.random() * 100 + 'vw';
    
    // Tamaño aleatorio
    const tamano = Math.random() * (22 - 10) + 10;
    corazon.style.width = tamano + 'px';
    corazon.style.height = tamano + 'px';
    
    // Color aleatorio de la lista
    corazon.style.backgroundColor = coloresCorazones[Math.floor(Math.random() * coloresCorazones.length)];
    
    // Velocidad y retraso aleatorio para romper la simetría
    corazon.style.animationDuration = Math.random() * (7 - 4) + 4 + 's';
    corazon.style.animationDelay = Math.random() * 2 + 's';

    document.body.appendChild(corazon);

    // Lo eliminamos del HTML cuando termine de flotar para no ralentizar la página
    setTimeout(() => {
        corazon.remove();
    }, 7000);
}

// Abrir carta y encender los corazones
btnAbrir.addEventListener('click', () => {
    overlay.classList.add('activo');
    
    // Genera ráfagas de corazones al instante
    for(let i=0; i<15; i++) { crearCorazon(); }
    
    // Mantiene la lluvia creando un corazón cada 250 milisegundos
    intervaloCorazones = setInterval(crearCorazon, 250);
});

// Cerrar carta y apagar los corazones
function cerrarCarta() {
    overlay.classList.remove('activo');
    clearInterval(intervaloCorazones); // Frena la creación de nuevos corazones
}

btnCerrar.addEventListener('click', cerrarCarta);

overlay.addEventListener('click', (evento) => {
    if (evento.target === overlay) {
        cerrarCarta();
    }
});