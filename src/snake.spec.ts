
import Snake from './snake';

import Victor = require('victor');
import { expect } from 'chai';
import 'mocha';
import { toVictor, Direction } from './direction';

describe('Snake', () => {

    describe('getLength', () => {

        it('should return length of snake', () => {
            let snake = new Snake(new Victor(0, 0), 3, Direction.DOWN);
            expect(snake.getLength()).to.equal(3);
        });

    });

});
