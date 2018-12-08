import { Victor, PIXI } from "./libs";
import Game from "./game";
import app from "./app";

export default class Apple {
    position: Victor = new Victor(0, 0);
    game: Game;
    graphics: PIXI.Graphics = new PIXI.Graphics();
    constructor(game: Game) {
        this.game = game;
        app.stage.addChild(this.graphics);
    }
    setRandomPosition() {
        for (var i = 0; i < 100; i++) {
            var pos = this.game.getRandomPosition();
            if (!this.game.snake.isPosInBody(pos)) {
                this.position = pos;
                break;
            }
        }
    }
    draw() {
        var g = this.graphics;
        var csz = this.game.cellSize;
        g.clear();
        g.beginFill(0xff0000, 1);
        g.drawRect(csz * this.position.x, csz * this.position.y, csz, csz);
        g.endFill();
    }
}
