import Victor = require('victor');

export enum Direction {
    LEFT, RIGHT, UP, DOWN
}

const DIRECTIONS_COORDINATES: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

export function toVictor(d: Direction) {
    return Victor.fromArray(DIRECTIONS_COORDINATES[d]);
}
