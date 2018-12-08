import { Victor } from "./libs";

enum Direction {
    LEFT, RIGHT,
    UP, DOWN,
    NONE,
}

const oppositeDirections = {
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT,
    [Direction.DOWN]: Direction.UP,
    [Direction.UP]: Direction.DOWN,
    [Direction.NONE]: Direction.NONE,
};

const dir2Victor = {
    [Direction.LEFT]: new Victor(-1, 0),
    [Direction.RIGHT]: new Victor(1, 0),
    [Direction.DOWN]: new Victor(0, 1),
    [Direction.UP]: new Victor(0, -1),
    [Direction.NONE]: new Victor(0, 0),
};

export function getOppositeDirection(dir: Direction) {
    return oppositeDirections[dir];
}

export function getVictorByDirection(dir: Direction) {
    return dir2Victor[dir];
}

export default Direction;
