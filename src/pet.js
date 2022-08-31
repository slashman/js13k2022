const LEVELS = [
    { shape: 'egg', scale: 0.3, nextLevelThreshold: 15 },
    { shape: 'fox', scale: 0.5, nextLevelThreshold: 30 },
    { shape: 'fox', scale: 1, nextLevelThreshold: 60 },
    { shape: 'fox', scale: 1.3, nextLevelThreshold: 90 },
]

class Pet extends GO {
    constructor (lists) {
        super('egg', lists);
        this.reset();
    }

    reset () {
        this.health = 100;
        this.hunger = 0;
        this.lifetime = 0;
        this.nextPoop = 5;
        this.hasPoop = false;
        this.dirtyCounter = 0;
        this.nextLevelThreshold = 0;
        this.level = 0;
        this.setupForLevel();
    }

    checkEvo () {
        if (this.level < LEVELS.length && this.lifetime > this.nextLevelThreshold) {
            this.level++;
            this.setupForLevel();
        }
    }

    setupForLevel () {
        this.app = SHAPES[LEVELS[this.level].shape];
        this.scale = LEVELS[this.level].scale;
        this.nextLevelThreshold = LEVELS[this.level].nextLevelThreshold;
    }

    u(d) {
        if (gState == 2) {
            this.lifetime += d * 3;
            this.checkEvo();
            this.hunger += d * 5;
            this.nextPoop -= d;
            if (this.nextPoop < 0) {
                this.nextPoop = rands.range(10, 20); // TODO: Scale by level
                if (!this.hasPoop) {
                    this.hasPoop = true;
                    this.dirtyCounter = 2;
                }
            }
            if (this.hunger > 5) {
                this.health -= d * 10; 
            }
            if (this.hasPoop) {
                this.dirtyCounter -= d;
                if (this.dirtyCounter < 0) {
                    this.health -= d * 20; 
                }
            }
            if (this.health <= 0) {
                this.health = 0;
                this.die();
            }
        }
    }

    feed () {
        if (this.hunger < 5) {
            this.health -= 10;
            this.hunger = 0;
            return;
        }
        this.hunger -= 5;
    }

    clean () {
        if (this.hasPoop) {
            this.hasPoop = false;
            this.dirtyCounter = 0;
        }
    }

    die () {
        gState = 3;
    }

}