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
