// "Physics" (LOL)

function dist(a,b) {
  return Math.abs(a.x-b.x) + Math.abs(a.y-b.y);
}

function rdist(a, b) {
  var aa = a.x - b.x;
  var bb = a.y - b.y;
  return Math.sqrt( aa*aa + bb*bb );
}

function collide(a, b) {
  if (rdist(a,b) < a.size + b.size) {
    a.collide(b);
  }
}