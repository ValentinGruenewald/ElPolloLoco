class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    deathScreen = new DeathScreen();
    thrownBottle = [];
    lastThrow = 0;
    availableBottles = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollections();
            this.checkThrow();
        }, 25);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.y < 100 && !this.character.isHurt()) { // if character kills the enemy during the collision
                    this.character.killChicken(enemy);
                    this.character.speedY = 20;
                } else {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                    console.log(this.character.energy);
                }
            }
        });

    }

    checkCollections() {
        this.level.clouds.forEach((collectable) => {
            if (this.character.isCollecting(collectable) && collectable instanceof Coin) {
                collectable.x = -5000;
                this.statusBarCoin.percentage += 20;
                this.statusBarCoin.setPercentage(this.statusBarCoin.percentage);
            }
            if (this.character.isCollecting(collectable) && collectable instanceof Bottle) {
                collectable.x = -5000;
                this.availableBottles++;
                this.statusBarBottle.percentage += 20;
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentage);
            }
        });
    }

    checkThrow() {
        if (this.keyboard.D && this.character.otherDirection == false && this.throwIsReady() && this.availableBottles > 0) {
            let bottle = new ThrownBottle(this.character.x + this.character.width / 2, this.character.y + this.character.height / 2);
            this.thrownBottle.push(bottle);
            this.lastThrow = new Date().getTime();
            this.availableBottles--;
            this.statusBarBottle.percentage -= 20;
            this.statusBarBottle.setPercentage(this.statusBarBottle.percentage);
        }
    }

    throwIsReady() {
        let timepassed = new Date().getTime() - this.lastThrow;
        timepassed = timepassed / 1000;
        return timepassed > 0.5;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundobjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.thrownBottle);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects -------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.deathScreen);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);


        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

}

