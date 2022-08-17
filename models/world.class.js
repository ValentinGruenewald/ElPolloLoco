class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    startScreen = new StartScreen();
    deathScreen = new DeathScreen();
    thrownBottle = [];
    lastThrow = 0;
    availableBottles = 0;
    startGame = false;
    endBossBattle = false;
    fullScreen = false;
    music = new Audio('audio/music.mpeg');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.showStartScreen();
        this.checkForGameStart();
    }

    showStartScreen() {
        this.addToMap(this.startScreen);
        let self = this;
        requestAnimationFrame(function () {
            self.showStartScreen();
        });
    }

    checkForGameStart() {
        setInterval(() => {
            if (this.keyboard.ENTER == true && this.startGame == false) {
                this.startGame = true
                this.music.play();
            }
            if (this.startGame == true) {
                this.startTheGame();
            }
        }, 50);
    }

    startTheGame() {
        this.level = level1;
        this.startGame = 2;
        this.startScreen.x = -5000;
        this.draw();
        this.run();
        this.setWorld();
        this.character.startGame = true;
    }

    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollections();
            this.checkThrow();
            this.checkFullScreen();
            this.checkForEndbossBattleStart();
            this.checkBottleHits();
            this.relocateBar();
        }, 25);
    }


    relocateBar() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                this.statusBarEndboss.x = enemy.x;
                this.statusBarEndboss.y = enemy.y - 30;
            }
        });
    }

    checkBottleHits() {
        this.thrownBottle.forEach((bottle) => {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    if (bottle.bottleHit(enemy)) {
                        bottle.x = -5000;
                        bottle.speed = 0;
                        enemy.hit();
                        this.statusBarEndboss.setPercentage((enemy.energy));
                        console.log(enemy.energy);
                    }
                }
            });
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.y < 100 && !this.character.isHurt() && enemy instanceof Chicken) { // if character kills the enemy during the collision
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
        if (this.keyboard.D && this.ThrowIsReady() && this.availableBottles > 0) {
            let bottle = new ThrownBottle(this.character.x + this.character.width / 2, this.character.y + this.character.height / 2, this.character.otherDirection);
            this.thrownBottle.push(bottle);
            this.lastThrow = new Date().getTime();
            this.availableBottles--;
            this.statusBarBottle.percentage -= 20;
            this.statusBarBottle.setPercentage(this.statusBarBottle.percentage);
        }
    }

    ThrowIsReady() {
        let timepassed = new Date().getTime() - this.lastThrow;
        timepassed = timepassed / 1000;
        return timepassed > 0.5;
    }

    checkFullScreen() {
        if (this.keyboard.F == true) {
            this.canvas.requestFullscreen();
        }
    }

    checkForEndbossBattleStart() {
        if (this.character.x > 1100 && this.endBossBattle == false) {
            this.endBossBattle = true;
            this.character.level_start_x = 1000;
            this.loadEndbossBattle();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundobjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.thrownBottle);
        this.addObjectsToMap(this.level.clouds);
        if (this.endBossBattle == true) {
            this.addToMap(this.statusBarEndboss);
        }

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
       // mo.drawFrame(this.ctx);

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

    loadEndbossBattle() {
        this.level = new Level([
            new Endboss()
        ],
            [
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Bottle(5),
                new Bottle(6),
                new Bottle(7),
                new Bottle(8),
            ],
            [
                new BackgroundObject('img/5_background/layers/air.png', -719),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
                new BackgroundObject('img/5_background/layers/air.png', 0),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
                new BackgroundObject('img/5_background/layers/air.png', 719),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
                new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
            ]
        );
    }
}

