import { Victor, PIXI } from "./libs";
import Direction, { getVictorByDirection, getOppositeDirection } from "./direction";
import app from './app';
import Game from "./game";

export default class Snake {
    body: Victor[];
    moveDir: Direction;
    stepInterval: number = 500;
    idleTime: number = 0;
    game: Game;
    graphics: PIXI.Graphics = new PIXI.Graphics();
    constructor(game: Game) {
        this.game = game;
        this.clear();
        app.stage.addChild(this.graphics);
    }
    isPosInBody(pos: Victor) {
        for (var bp of this.body) {
            if (bp.isEqualTo(pos)) {
                return true;
            }
        }
        return false;
    }
    clear() {
        this.body = [];
        this.moveDir = Direction.LEFT;
        this.setSpeed(2);
    }
    setHeadPosition(pos: Victor) {
        pos.x = Math.floor(pos.x);
        pos.y = Math.floor(pos.y);
        this.body[0] = pos;
    }
    getSpeed() { return 1000 / this.stepInterval; }
    setSpeed(value: number) {
        this.stepInterval = 1000 / value;
    }
    incSpeed(value: number) {
        this.setSpeed(this.getSpeed() + value);
    }
    getBody() {
        return this.body;
    }
    setMoveDir(dir: Direction) {
        this.moveDir = dir;
    }
    private getGrowDirection(): Victor {
        if (this.body.length === 1) {
            return getVictorByDirection(getOppositeDirection(this.moveDir));
        } else {
            var last = this.body[this.body.length - 1];
            var beforeLast = this.body[this.body.length - 2];
            return last.clone().subtract(beforeLast);
        }
    }
    grow(len: number = 1) {
        var v = this.getGrowDirection();
        while (len > 0) {
            var last = this.body[this.body.length - 1];
            this.body.push(last.clone().add(v));
            len -= 1;
        }
    }
    step() {
        var v = getVictorByDirection(this.moveDir);
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i] = this.body[i - 1];
        }
        this.body[0] = this.body[0].clone().add(v);
    }
    update() {
        var dt = app.ticker.elapsedMS;
        this.idleTime += dt;
        if (this.idleTime > this.stepInterval) {
            this.idleTime = 0;
            this.step();
        }
    }
    draw() {
        var g = this.graphics;
        var csz = this.game.cellSize;
        g.clear();
        g.beginFill(0);
        for (var bp of this.body) {
            g.drawRect(bp.x * csz, bp.y * csz, csz, csz);
        }
        g.endFill();
    }
}
