
var can = document.createElement('canvas');
var ctx = can.getContext('2d');

can.style.position = 'fixed';
can.style.left = '0px';
can.style.top = '0px';

document.querySelector('body').appendChild(can);

function setFullscreenSize() {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
}

setFullscreenSize();
window.addEventListener('resize', setFullscreenSize);

function goAnim() {
    var [w, h] = [can.width, can.height];
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, h);
    ctx.stroke();
    requestAnimationFrame(goAnim);
}

requestAnimationFrame(goAnim);
