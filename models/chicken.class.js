class Chicken extends MovableObject {

    y = 360;
    width = 60;
    height = 60;
    startGame = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    chicken_idle = new Audio('audio/chicken-idle.mpeg');
    chicken_death = new Audio('audio/chicken-death.mpeg');


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 400 + Math.random() * 500; //number between 200 and 700
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
        this.checkForDeath();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.x == -5000) {
            }
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    checkForDeath() {
        setInterval(() => {
            if (this.x < -1000) {
                if (this.x > -5100) {
                    this.chicken_death.play();
                    this.x = -6000;
                }
            }
        }, 50);
    }
}