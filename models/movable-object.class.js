class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    

    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                this.y = 150;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrownBottle) {
            if (this.y > 370) {
                this.speedY = 0;
                this.speed = 0;
            }
            return true;
        } else {
            return this.y < 150
        }
    }

    isColliding(mo) {
        if (mo instanceof Chicken) {
            return this.x + this.width - 20 > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height
        } else {
            return this.x + 30 > mo.x &&
                this.x + 30 < mo.x + mo.width &&
                this.y + this.height > mo.y &&
                this.y < mo.y + mo.height
        }
    }

    bottleHit(mo) {
        return this.x + 30 > mo.x &&
            this.x + 30 < mo.x + mo.width &&
            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height
    }

    isCollecting(mo) {
        if (mo instanceof Coin) {
            return this.x > mo.x &&
                this.x + this.width < mo.x + mo.width &&
                this.y + 0.75 * this.height > mo.y &&
                this.y < mo.y - 20;
        }

        if (mo instanceof Bottle) {
            return this.x + this.width > mo.x + mo.width - 10 &&
                this.x < mo.x &&
                this.y > 100;
        }
    }

    hit() {
        if (this instanceof Endboss) {
            this.energy -= 25;
        } else {
            this.energy -= 0.5;
        }

        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        if (this instanceof Endboss) {
            return timepassed < 0.5;
        } else {
            return timepassed < 0.2;
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isVisible() {
        if (!this.isDead()) {
            return true
        }

        if (this.isDead() && this.timeOfDeath == 0) { // is activated when character dies
            this.timeOfDeath = new Date().getTime();
        }

        let timepassed = new Date().getTime() - this.timeOfDeath;

        if (timepassed < 200) {
            return true
        } else {
            if (this instanceof Character) {
                this.world.deathScreen.x = 0;
            }
            return false
        }
    }

    killChicken(enemy) {
        enemy.x = -5000;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img.src = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }
}