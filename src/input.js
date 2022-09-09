// Input
var pressed = {};
var typedCallbacks = {};
/*function keyPress(e){
  if (typedCallbacks[e.code]){
    typedCallbacks[e.code]();
  }
}*/
//window.onkeydown = e => pressed[e.code] = true;
//window.onkeyup = e => pressed[e.code] = false;
//window.addEventListener("keypress", keyPress);
//window.addEventListener("keydown", e => {if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) e.preventDefault();});
function isDown(keyCode){
  return /*pressed[keyCode] ||*/ currentSoft == keyCode;
};
function typed(keyCode, callback){
  typedCallbacks[keyCode] = callback;   
}

// Touch Soft Keys
var currentSoft;
var pressedCallbacks = {};

var canvas = document.querySelector('canvas');
canvas.onclick = e => {
  if (gState != 2 && gState != 3) {
    typedCallbacks['Enter']()
    return;
  }
  pk = sk(e);
  pk && typedCallbacks[pk] && typedCallbacks[pk]();
}

// Soft Keys
sk = e => {
  x = (e.pageX - canvas.offsetLeft) * canvasScale;
  y = (e.pageY - canvas.offsetTop) * canvasScale;
  if (y < 100)
      return 'KeyX';
  if (x < W / 2) {
    return 'Enter';
  }
  return 'KeyZ';
}

canvas.onpointerdown = e => {
  pk = sk(e);
  if (pk) { currentSoft = pk; }
}

canvas.onpointerup = e => {
  currentSoft = false;
}