import SeaGull from './SeaGull';
let canvas, canvasContext;
let seaguls = [];

const images = [
]

window.onload = () => {
    load();
}

window.onresize = resize;

function resize() {
    canvas.height = document.body.offsetHeight;
    canvas.width = document.body.offsetWidth;
}

function load() {
    canvas = document.getElementById('canvas');
    canvasContext = canvas.getContext('2d');
    let fps = 30;
    resize();
    setInterval(updateAll, 1000 / fps);

    seaguls.push(new SeaGull({ x: 0, y: 0, toX: canvas.width, toY: canvas.height }));
}

function updateAll() {
    canvasContext.fillStyle = '#000';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    seaguls.forEach(seagul => seagul.render(canvasContext));
}
