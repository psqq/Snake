import * as $ from 'jquery';
import Victor = require('victor');

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

    getWidthInCells() { return this.WIDTH_IN_CELLS; }

    getHeightInCells() { return this.HEIGHT_IN_CELLS; }

    fillCell(position: Victor) {
        this.context.fillStyle = 'black';
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
