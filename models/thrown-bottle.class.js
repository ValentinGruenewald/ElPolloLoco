class ThrownBottle extends MovableObject {
    y = 300;
    width = 50;
    height = 50;
    speed = 10;
    timeOfSplash = 0;
    IMAGES_SPINNING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]
    bottle_throw = new Audio('audio/bottle-throw.mpeg');
    bottle_splash = new Audio('audio/bottle-splash.mpeg');

    constructor(x, y, otherDirection) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_SPINNING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.animate();
        this.throwBottle(x, y, otherDirection);
        this.checkForSplash();
    }

    animate() {

        setStoppableInterval(() => {
            if (this.speed > 0) {
                this.playAnimation(this.IMAGES_SPINNING);
            } else {
                this.animateSplashOnce();
            }
        }, 1000 / 15);
    }


    throwBottle(x, y, otherDirection) {
        this.x = x;
        if (otherDirection == true) {
            this.x -= 50;
        }
        if (this.x > -100) {
            this.bottle_throw.play();
        }
        this.y = y;
        this.speedY = 20;
        this.applyGravity();
        this.lastThrow = new Date().getTime();
        setStoppableInterval(() => {
            if (otherDirection == false) {
                this.x += this.speed;
            } else {
                this.x -= this.speed;
            }
        }, 25);
    }

    checkForSplash() {
        setStoppableInterval(() => {
            if (this.timeOfSplash == 0) {
                if (this.speed == 0) {
                    this.timeOfSplash = new Date().getTime();
                }
            }
        }, 1);
    }

    animateSplashOnce() {
        let timespan = new Date().getTime() - this.timeOfSplash;
        if (timespan < 90) {
            this.playAnimation(this.IMAGES_SPLASH);
            this.bottle_splash.play();
        } else {
            this.x = -5000;
        }
    }
}