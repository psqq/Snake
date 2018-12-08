import * as PIXI from 'pixi.js';

var app = new PIXI.Application({ backgroundColor: 0xffffff });
export default app;

var appEmmiter = new PIXI.utils.EventEmitter();
var appView = app.renderer.view;
export { appView, appEmmiter };

appView.style.position = 'fixed';
appView.style.left = '0px';
appView.style.top = '0px';

document.querySelector('body').appendChild(appView);

function setFullscreenSize() {
    appView.width = window.innerWidth;
    appView.height = window.innerHeight;
    app.renderer.resize(appView.width, appView.height);
    appEmmiter.emit('resize');
}

setFullscreenSize();
window.addEventListener('resize', setFullscreenSize);
