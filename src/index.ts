import app from './app';
import Game from './game';

var game = new Game();
game.init();
game.bindEvents();
game.startNewGame();

app.ticker.add(() => {
    game.update();
    game.draw();
});
