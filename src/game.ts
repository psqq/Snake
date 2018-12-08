import Snake from "./snake";
import { Victor } from "./libs";
import app, { appView, appEmmiter } from "./app";
import Direction from "./direction";
import Apple from "./apple";
import { randInt } from "./utils";

export default class Game {
    cellSize: number = 30;
    snake: Snake;
    apple: Apple;
    fieldSize: Victor = new Victor(0, 0);
    constructor() {
        this.snake = new Snake(this);
        this.apple = new Apple(this);
    }
    startNewGame() {
        this.snake.clear();
        var w = this.fieldSize.x, h = this.fieldSize.y;
        var head = new Victor(w / 2, h / 2);
        this.snake.setHeadPosition(head);
        this.snake.grow(2);
        this.apple.setRandomPosition();
    }
    getRandomPosition(): Victor {
        var x = randInt(0, this.fieldSize.x);
        var y = randInt(0, this.fieldSize.y);
        return new Victor(x, y);
    }
    updateGameFieldSize() {
        this.fieldSize.x = Math.floor(appView.width / this.cellSize);
        this.fieldSize.y = Math.floor(appView.height / this.cellSize);
    }
    init() {
        this.updateGameFieldSize();
        appEmmiter.on('resize', () => this.updateGameFieldSize());
    }
    bindEvents() {
        window.addEventListener("keydown", (ev) => {
            if (!this.snake) {
                return;
            }
            if (ev.code === "KeyA") {
                this.snake.setMoveDir(Direction.LEFT);
            }
            if (ev.code === "KeyD") {
                this.snake.setMoveDir(Direction.RIGHT);
            }
            if (ev.code === "KeyW") {
                this.snake.setMoveDir(Direction.UP);
            }
            if (ev.code === "KeyS") {
                this.snake.setMoveDir(Direction.DOWN);
            }
        });
    }
    draw() {
        this.snake.draw();
        this.apple.draw();
    }
    update() {
        this.snake.update();
        var body = this.snake.getBody();
        var head = body[0];
        var w = this.fieldSize.x, h = this.fieldSize.y;
        if (head.x < 0 || head.y < 0 || head.x >= w || head.y >= h) {
            this.startNewGame();
            return;
        }
        if (head.isEqualTo(this.apple.position)) {
            this.snake.grow();
            this.apple.setRandomPosition();
            this.snake.incSpeed(0.5);
        }
    }
}
