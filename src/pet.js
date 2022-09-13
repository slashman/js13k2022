let gabyMode = false;

const LEVELS = [
    [
        { shape: 'egg', scale: 2, nextLevelThreshold: 15 },
        { shape: 'fox', scale: 0.5, nextLevelThreshold: 30 },
        { shape: 'fox', scale: 0.75, nextLevelThreshold: 60 },
        { shape: 'fox', scale: 1, nextLevelThreshold: 90, hat: '🧢'},
        { shape: 'fox', scale: 1.3, nextLevelThreshold: 120, hat: '🧢' },
        { shape: 'fox', scale: 1.3, nextLevelThreshold: 160, hat: '🎩'},
        { shape: 'fox', scale: 1.3, nextLevelThreshold: 190, hat: '👑' },
    ],
    [
        { shape: 'lizardEgg', scale: 2, nextLevelThreshold: 25 },
        { shape: 'lizard', scale: 0.3, nextLevelThreshold: 40 },
        { shape: 'lizard', scale: 0.5, nextLevelThreshold: 80 },
        { shape: 'lizard', scale: 0.8, nextLevelThreshold: 120, hat: '👒'},
        { shape: 'lizard', scale: 0.9, nextLevelThreshold: 160, hat: '🎓' },
        { shape: 'lizard', scale: 1, nextLevelThreshold: 180},
        { shape: 'lizard', scale: 1, nextLevelThreshold: 220, hat: '👑' },
    ]
]

const foods = [
    ['🍼','🍌','🍎','🥕'],
    ['🍇','🍈','🍉','🍊','🍋','🍍','🥭','🍏','🍐','🍑','🍒','🍓','🥝','🍅','🥥'],
    ['🥑','🍆','🥔','🌽','🥒','🥦','🍄'],
    ['🍞','🥐','🥨','🥞','🧀','🍔','🍟','🍕','🌭','🥪','🌮','🌯'],
    ['🍱','🍙','🍚','🍛','🍝','🍣','🍥','🦀','🦞','🦐','🦑'],
    ['🍦','🍧','🍨','🍩','🍪','🍰','🧁','🥧','🍬','🍯','☕'],
    ['🍺','🥂','🍸','🍹','🍷']
];

class Pet extends GO {
    constructor (eggIndex, lists) {
        super('egg', lists);
        this.levels = LEVELS[eggIndex];
        this.reset();
    }

    reset () {
        this.health = 100;
        this.hunger = 0;
        this.lifetime = 0;
        this.nextPoop = 5;
        this.poopQuantity = 0;
        this.dirtyCounter = 0;
        this.nextLevelThreshold = 0;
        if (gabyMode) {
            this.happyCounter = 0;
        } else {
            this.happyCounter = 4;
        }
        this.boopCounter = 0.7;
        this.boopPhaseUp = false;
        this.sparklesOn = false;
        this.level = 0;
        this.hat = undefined;
        this.setupForLevel();
        seeded = LCG(13312 + selectedEgg * 20);
    }

    checkEvo () {
        if (this.level < this.levels.length - 1 && this.lifetime > this.nextLevelThreshold) {
            if (gabyMode) {
                this.sparklesOn = true;
            } else {
                this.doTheEvo();
            }
        }
    }

    doTheEvo () {
        playSound(3 + this.level % 2);
        this.level++;
        this.setupForLevel();
        if (gabyMode) {
            this.sparklesOn = false;
            this.happyCounter = 0;
        } else {
            this.happyCounter = 4;
        }
        this.hunger = 0;
    }

    setupForLevel () {
        this.app = SHAPES[this.levels[this.level].shape];
        this.scale = this.levels[this.level].scale;
        this.nextLevelThreshold = this.levels[this.level].nextLevelThreshold;
        this.hat = this.levels[this.level].hat;
    }

    u(d) {
        this.x = W/2;
        if (gState == 2) {
            if (this.happyCounter > 0) {
                this.happyCounter -= d;
                if (this.happyCounter < 0) {
                    this.happyCounter = 0;
                }
                return;
            }
            this.boopCounter -= d;
            if (this.boopCounter < 0) {
                this.boopCounter = 1;
                if (this.boopPhaseUp) {
                    this.y = 175;
                } else {
                    this.y = 180;
                }
                this.boopPhaseUp = !this.boopPhaseUp;
            }

            if (!gabyMode) {
                this.lifetime += d * 3;
            }

            this.checkEvo();
            if (gabyMode) {
                this.hunger += d;
                if (this.hunger > 6) {
                    this.hunger = 6;
                }
            } else {
                this.hunger += d * (5 + this.level / 2);
            }
            this.nextPoop -= d;
            if (this.nextPoop < 0) {
                this.nextPoop = rands.range(selectedEgg == 0 ? 10 : 5, 15);
                if (!this.poopQuantity) {
                    this.poopQuantity = rands.range(selectedEgg == 0 ? 2 : 4, 5);
                    this.dirtyCounter = 2;
                }
            }
            this.deathCause = "OVERSTUFFED";
            if (this.hunger > 5 && !gabyMode) {
                this.health -= d * 10;
                this.deathCause = "STARVED";
            }
            if (this.poopQuantity > 0) {
                this.dirtyCounter -= d;
                if (this.dirtyCounter < 0 && !gabyMode) {
                    this.health -= d * 20; 
                    this.deathCause = "POISONED";
                }
            }
            if (this.health <= 0) {
                this.health = 0;
                this.die();
            }
        }
    }

    feed () {
        if (this.happyCounter > 0 || this.sparklesOn) {
            return;
        }
        var maxFood = Math.min(this.level + 1, foods.length);
        let food = foods[rand.range(0, maxFood)];
        food = food[rand.range(0, food.length)];
        new Food(food, [layers[1]]);
        if (this.hunger < 5 && !gabyMode) {
            playSound(5);
            this.health -= 10;
            this.hunger = 0;
            return;
        }
        if (gabyMode) {
            if (this.poopQuantity == 0) {
                this.lifetime += 0.2;
            }
        }
        playSound(1);
        this.hunger -= 5;
        if (this.hunger < 0) { this.hunger = 0; }
    }

    clean () {
        if (this.happyCounter > 0) {
            return;
        }
        if (this.poopQuantity > 0) {
            this.poopQuantity -= 1;
            if (this.poopQuantity <= 0) {
                this.dirtyCounter = 0;
            }
        }
    }

    die () {
        playSound(2);
        petsHistory[selectedEgg].push({
            lifetime: this.lifetime
        });
        petsHistory[selectedEgg].sort((a,b) => { return b.lifetime - a.lifetime});
        if (petsHistory[selectedEgg].length > 10) {
            petsHistory[selectedEgg].length = 10;
        }
        localStorage.setItem("deathgotchi.history.2", JSON.stringify(petsHistory));
        gState = 3;
    }

    postRender (ctx) {
        if (this.level == 0) return;
        if (selectedEgg == 0) {
            var eyeShape = this.health == 0 ? SHAPES.eyeDead : this.boopPhaseUp ? SHAPES.eyeNormal : SHAPES.eyeBlink;
            Renderer.renderShapes(ctx,
                eyeShape,
                this.x, this.y, this.scale, 1, this.rotation, 50, 50, this.camera, 'fixedToCamera');
        }
        if (this.hat) {
            ctx.font = font(24);
            ctx.textAlign="center"; 
            ctx.fillStyle= "#000";
            ctx.fillText(this.hat, this.x, this.y - 20 * this.scale);
        }
    }

}