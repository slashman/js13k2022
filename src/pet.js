const LEVELS = [
    { shape: 'egg', scale: 3, nextLevelThreshold: 15 },
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
        this.poopQuantity = 0;
        this.dirtyCounter = 0;
        this.nextLevelThreshold = 0;
        this.happyCounter = 4;
        this.level = 0;
        this.setupForLevel();
    }

    checkEvo () {
        if (this.level < LEVELS.length - 1 && this.lifetime > this.nextLevelThreshold) {
            this.level++;
            this.setupForLevel();
            this.happyCounter = 4;
            this.hunger = 0;
        }
    }

    setupForLevel () {
        this.app = SHAPES[LEVELS[this.level].shape];
        this.scale = LEVELS[this.level].scale;
        this.nextLevelThreshold = LEVELS[this.level].nextLevelThreshold;
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

            this.lifetime += d * 3;

            this.checkEvo();
            this.hunger += d * 5;
            this.nextPoop -= d;
            if (this.nextPoop < 0) {
                this.nextPoop = rands.range(10, 20); // TODO: Scale by level
                if (!this.poopQuantity) {
                    this.poopQuantity = 5;
                    this.dirtyCounter = 2;
                }
            }
            this.deathCause = "OVERSTUFFED";
            if (this.hunger > 5) {
                this.health -= d * 10;
                this.deathCause = "STARVED";
            }
            if (this.poopQuantity > 0) {
                this.dirtyCounter -= d;
                if (this.dirtyCounter < 0) {
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
        if (this.happyCounter > 0) {
            return;
        }
        if (this.hunger < 5) {
            this.health -= 10;
            this.hunger = 0;
            return;
        }
        this.hunger -= 5;
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
        petsHistory.push({
            lifetime: this.lifetime
        });
        petsHistory.sort((a,b) => { return b.lifetime - a.lifetime});
        if (petsHistory.length > 10) {
            petsHistory.length = 10;
        }
        localStorage.setItem("deathgotchi.history", JSON.stringify(petsHistory));
        gState = 3;
    }

}