const font = (s) => s + 'px Courier New';

let W = canvas.width;
let H = canvas.height;
let canvasScale,mo;

(function() {
  window.addEventListener('resize', resizeCanvas, false);
  function resizeCanvas() {
    ih = window.innerHeight;
    iw = window.innerWidth;
    if (ih > iw) {
      // Portrait
      rat = iw / ih;
      ih = Math.max(Math.min(ih, 1000), 800);
      iw = ih * rat;
      mo = true;
    } else {
      rat = ih / iw;
      iw = Math.max(Math.min(iw, 1000), 1200);
      ih = iw * rat;
      mo = false;
    }
    canvasScale = ih / canvas.scrollHeight;
    canvas.width = iw;
    canvas.height = ih;
    W = canvas.width;
    H = canvas.height;
  }
  
  resizeCanvas();
})();

var gState = 0;

// RAF
var time = 0;
function raf(fn) {
  function rf(fn) {
    return window.requestAnimationFrame(function() {
      var now = Date.now();
      var elapsed = now - time;
      if (elapsed > 999) {
        elapsed = 1 / 60;
      } else {
        elapsed /= 1000;
      }
      time = now;
      fn(elapsed);
    });
  }
  return rf(function tick(elapsed) {
    fn(elapsed);
    rf(tick);
  });
}

// Game Loop
var layers = [[],[],[]];
var mobs = [];
var sfx = [];

var ctx = canvas.getContext('2d');
function renderMob(m, flip) {
  if (m.dead) return;
  if (m.specialRender) {
    m.specialRender(ctx);
  } else {
    Renderer.renderShapes(ctx, m.app, m.x, m.y, m.scale, 1, m.rotation, 49, 49, m.camera);
  }
}
raf(function(d) {
  ctx.fillStyle = '#012247';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  layers.forEach(l => l.forEach(m => {
    m.u && m.u(d);
    renderMob(m);
    renderMob(m, true); // TODO: Only if m.flipped
  }))

  sfx.forEach(s => {
    s.update(d);
    s.render(ctx);
  });
  renderUI(ctx, d);
});