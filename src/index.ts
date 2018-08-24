
import * as Mainloop from 'mainloop.js';
import GameScreen from './screens/game-screen';
import { Screen, Screens } from './screens/screen';

let screens: Screen[] = [];

let gameScreen = new GameScreen();
screens[Screens.GAME_SCREEN] = gameScreen;

let currentScreen = Screens.GAME_SCREEN;

function update(delta: number) {
    screens[currentScreen].update(delta);
}

function draw() {
    screens[currentScreen].draw();
}

gameScreen.init();
gameScreen.start();

Mainloop.setUpdate(update).setDraw(draw).start();
