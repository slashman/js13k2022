// Random
var rand = {
  int: function(max) {
    return Math.random() * (max || 0xfffffff) | 0;
  },
  range: function(min, max) {
    return this.int(max - min) + min;
  },
  b(p = 50) {
    return this.range(0,100)<p;
  }
};

// 1993 Park-Miller LCG, https://gist.github.com/blixt/f17b47c62508be59987b
function LCG(s) {
  return function() {
    s = Math.imul(16807, s) | 0 % 2147483647;
    return (s & 2147483647) / 2147483648;
  }
}

var seeded = LCG(13312);

var rands = {
  int: function(max) {
    return seeded() * (max || 0xfffffff) | 0;
  },
  range: function(min, max) {
    if (min === max) {
      return min;
    }
    return this.int(max - min) + min;
  },
  b() {
    return this.range(0,100)<50;
  }
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(seeded() * 16)];
  }
  return color;
}