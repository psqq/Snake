import * as $ from 'jquery';
import Victor = require('victor');
import Random = require('random-js');

export default class GameCanvas {
    private readonly WIDTH_IN_CELLS = 20;
    private readonly HEIGHT_IN_CELLS = 20;
    private readonly CELL_SIZE = 10;

    private canvas: JQuery;
    private context: CanvasRenderingContext2D;

    constructor() {
        this.canvas = $(".gameCanvas");
        this.context = (this.canvas.get(0) as HTMLCanvasElement).getContext('2d');
        this.setMinimumSize();
    }

    private setMinimumSize() {
        this.canvas.attr({
            width: this.WIDTH_IN_CELLS * this.CELL_SIZE,
            height: this.HEIGHT_IN_CELLS * this.CELL_SIZE
        });
    }

    private getCanvasContext(): CanvasRenderingContext2D {
        return this.context;
    }

    isInField(position: Victor): boolean {
        return position.x >= 0
            && position.y >= 0
            && position.x < this.getWidthInCells()
            && position.y < this.getHeightInCells();
    }

    getRandomPosition() {
        let random = new Random();
        return new Victor(
            random.integer(0, this.WIDTH_IN_CELLS - 1),
            random.integer(0, this.HEIGHT_IN_CELLS - 1),
        );
    }

    getWidthInCells() { return this.WIDTH_IN_CELLS; }

    getHeightInCells() { return this.HEIGHT_IN_CELLS; }

    fillCell(position: Victor, color = "black") {
        this.context.fillStyle = color;
        this.context.fillRect(
            position.x * this.CELL_SIZE, position.y * this.CELL_SIZE,
            this.CELL_SIZE, this.CELL_SIZE
        );
    }

    clear() {
        this.context.fillStyle = 'white';
        this.context.fillRect(
            0, 0,
            parseInt(this.canvas.attr('width')), parseInt(this.canvas.attr('height'))
        );
    }
}
