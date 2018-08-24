
import { Direction, toVictor } from './direction';
import * as _ from 'lodash';
import Victor = require('victor');

export default class Snake {
    
    body: Victor[];
    
    constructor(position: Victor, length :number, direction: Direction) {
        const directionCoordinates = toVictor(direction);
        this.body = [];
        for (let i = 0; i < length; i++) {
            this.body.push(position.clone());
            position.add(directionCoordinates);
        }
    }
}
