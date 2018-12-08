import * as PIXI from 'pixi.js';
import { Victor } from './libs';

var app = new PIXI.Application({ backgroundColor: 0xffffff });
var can = app.renderer.view;

can.style.position = 'fixed';
can.style.left = '0px';
can.style.top = '0px';

document.querySelector('body').appendChild(can);

function setFullscreenSize() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    app.renderer.resize(can.width, can.height);
}

setFullscreenSize();
window.addEventListener('resize', setFullscreenSize);

var cellSize = 50;
var speed = 1;
var snakePosition = new Victor(100, 100);
var snakeVelocity = new Victor(0, 0);

var snake = new PIXI.Graphics();
drawSnake();
app.stage.addChild(snake);

function drawSnake() {
    snake.clear();
    snake.beginFill(0, 1);
    snake.drawRect(0, 0, cellSize, cellSize);
    snake.endFill();
}

var keyIsDown: { [key: string]: boolean } = {};
window.addEventListener("keydown", (ev) => {
    keyIsDown[ev.code] = true;
});
window.addEventListener("keyup", (ev) => {
    keyIsDown[ev.code] = false;
});

function update() {
    var dt = app.ticker.elapsedMS;
    var dir = new Victor(0, 0);
    if (keyIsDown.KeyA) {
        dir.x -= 1;
    }
    if (keyIsDown.KeyD) {
        dir.x += 1;
    }
    if (keyIsDown.KeyW) {
        dir.y -= 1;
    }
    if (keyIsDown.KeyS) {
        dir.y += 1;
    }
    if (dir.lengthSq() > 0) {
        snakeVelocity.copy(dir.norm().multiplyScalar(dt * speed));
    } else {
        snakeVelocity.zero();
    }
    snakePosition.add(snakeVelocity);
    snake.position.x = snakePosition.x;
    snake.position.y = snakePosition.y;
}

function draw() {
    // drawSnake();
}

app.ticker.add(() => {
    update();
    draw();
});
