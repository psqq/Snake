
import {
    Direction,
    toVictor,
    getOppositeDirection
} from './direction';
import * as _ from 'lodash';
import Victor = require('victor');

export default class Snake {

    private _body: Victor[];
    private directionToMove: Direction;

    constructor(position: Victor, length: number, directionToGrow: Direction) {
        const directionToGrowCoordinates = toVictor(directionToGrow);
        this._body = [position.clone()];
        this.directionToMove = getOppositeDirection(directionToGrow);
        for (let i = 1; i < length; i++) {
            position.add(directionToGrowCoordinates);
            this._body.push(position.clone());
        }
    }

    get body(): Readonly<Victor[]> {
        return this._body;
    }

    getHead(): Victor {
        return this._body[0].clone();
    }

    getLength(): number {
        return this._body.length;
    }
    
    isInSnake(position: Victor) : boolean {
        for(let bodyPart of this._body) {
            if (position.isEqualTo(bodyPart)) {
                return true;
            }
        }
        return false;
    }

    setDirectionToMove(directionToMove: Direction): boolean {
        if (this._body.length > 1) {
            let nextPositionAfterMoving = this._body[0].clone().add(toVictor(directionToMove));
            if (nextPositionAfterMoving.isEqualTo(this._body[1])) {
                return false;
            }
        }
        this.directionToMove = directionToMove;
        return true;
    }

    getNextHeadPosition(): Victor {
        return this._body[0].clone().add(toVictor(this.directionToMove));
    }

    makeStep() {
        for (let i = this._body.length - 1; i > 0; i--) {
            this._body[i] = this._body[i-1];
        }
        this._body[0] = this._body[0].clone().add(toVictor(this.directionToMove));
    }
}
