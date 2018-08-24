import * as $ from 'jquery';
import * as Mainloop from 'mainloop.js';
import Snake from './snake';
import Timer from './timer';
import Victor = require('victor');
import { Direction } from './direction';
import GameCanvas from './game-canvas';

let gameCanvas = new GameCanvas();

let snake = new Snake(new Victor(10, 10), 3, Direction.DOWN);
let snakeUpdater = new Timer(
    1000,
    () => {
        debugger;
        snake.makeStep();
    },
    true
);

snakeUpdater.start();

let updateDelta: number;

function update(delta: number) {
    updateDelta = delta;
    snakeUpdater.update(delta);
}

function draw() {
    gameCanvas.clear();
    for(let bodyPart of snake.body.values()) {
        gameCanvas.fillCell(bodyPart);
    }
}

function end(fps: number, panic: boolean) {
    $(".fps").text(`FPS: ${fps}; updateDelta: ${updateDelta}`);
}

Mainloop.setUpdate(update).setDraw(draw).setEnd(end).start();
