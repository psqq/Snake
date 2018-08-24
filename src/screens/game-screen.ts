
import Snake from '../snake';
import Timer from '../timer';
import Victor = require('victor');
import { Direction } from '../direction';
import GameCanvas from '../game-canvas';
import * as Mousetrap from 'mousetrap';
import { Screen, Screens } from './screen';


export default class GameScreen extends Screen {

    gameCanvas: GameCanvas;
    snake: Snake;
    snakeTimer: Timer;

    constructor() {
        super();
        this.gameCanvas = new GameCanvas();
        this.snakeTimer = new Timer(300, this.onSnakeTimerTick.bind(this), true);
    }

    init() {
        this.snake = new Snake(new Victor(10, 10), 3, Direction.DOWN);
        this.snakeTimer.stop();
        this.bindEvents();
    }

    bindEvents() {
        Mousetrap.bind(['a', 'left'], () => this.snake.setDirectionToMove(Direction.LEFT));
        Mousetrap.bind(['d', 'right'], () => this.snake.setDirectionToMove(Direction.RIGHT));
        Mousetrap.bind(['w', 'up'], () => this.snake.setDirectionToMove(Direction.UP));
        Mousetrap.bind(['s', 'down'], () => this.snake.setDirectionToMove(Direction.DOWN));
    }

    unbindEvents() {
        Mousetrap.reset();
    }

    onSnakeTimerTick() {
        let nextHeadPosition = this.snake.getNextHeadPosition();
        if (nextHeadPosition.x < 0 || nextHeadPosition.y < 0
            || nextHeadPosition.x >= this.gameCanvas.getHeightInCells()
            || nextHeadPosition.y >= this.gameCanvas.getHeightInCells()) {
            this.snakeTimer.stop();
        } else {
            this.snake.makeStep();
        }
    }

    start() {
        this.snakeTimer.start();
    }

    pause() {
        this.snakeTimer.pause();
    }

    stop() {
        this.unbindEvents();
        this.init();
    }

    update(delta: number) {
        this.snakeTimer.update(delta);
    }

    draw() {
        this.gameCanvas.clear();
        for (let bodyPart of this.snake.body.values()) {
            this.gameCanvas.fillCell(bodyPart);
        }
    }
}
