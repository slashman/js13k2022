class GO {
  constructor(app, lists) {
    this.app = SHAPES[app];
    this.dv = this.av = 0;
    this.rotation = 0;
    this.turnScale = 0;
    mobs.push(this);
    lists.forEach(l => l.push(this));
    this.lists = lists;
  }
  // update
  u(d) {
    this.dv += this.av * d;
    this._dx = Math.cos(this.rotation) * this.dv;
    this._dy = Math.sin(this.rotation) * this.dv;
    this.x += this._dx * d;
    this.y += this._dy * d;
  }

  destroy() {
    this.dead = true;
  }
}

// Add things extending GO here

class Food extends GO {
  constructor (emoji, lists) {
    super('ledOff', lists);
    this.emoji = emoji;
    this.arcCounter = 0;
  }

  u (d) {
    if (this.arcCounter > 1) {
      this.destroy();
      return;
    }

    let arcLength = 100;
    this.x = W/2 - arcLength + this.arcCounter * arcLength;
    let paraa = 0.02;
    let parah = W/2 - arcLength / 2;
    let parak = 5;
    this.y = paraa * Math.pow(this.x-parah,2) + parak;
    this.y += 100;

    this.arcCounter += d;
  }

  specialRender (c) {
    c.fillText(this.emoji, this.x, this.y);
  }
}