import Victor = require('victor');

export enum Direction {
    LEFT,
    RIGHT,
    UP,
    DOWN
}

const OPPOSITE_DIRECTION = [
    Direction.RIGHT,
    Direction.LEFT,
    Direction.DOWN,
    Direction.UP,
];

const DIRECTIONS_COORDINATES: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

export function toVictor(d: Direction) {
    return Victor.fromArray(DIRECTIONS_COORDINATES[d]);
}

export function getOppositeDirection(direction: Direction) {
    return OPPOSITE_DIRECTION[direction];
}
