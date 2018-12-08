import * as PIXI from 'pixi.js'

var app = new PIXI.Application({ backgroundColor: 0xffffff });
var can = app.renderer.view;

can.style.position = 'fixed';
can.style.left = '0px';
can.style.top = '0px';

document.querySelector('body').appendChild(can);

function setFullscreenSize() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    app.renderer.resize(can.width, can.height);
}

setFullscreenSize();
window.addEventListener('resize', setFullscreenSize);

var line = new PIXI.Graphics(true);
app.stage.addChild(line);

app.ticker.add(() => {
    line.clear();
    line.lineStyle(1, 0, 1);
    line.moveTo(0, 0);
    line.lineTo(can.width, can.height);
});
