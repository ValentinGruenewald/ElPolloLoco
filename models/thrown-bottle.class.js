class ThrownBottle extends MovableObject {
    y = 300;
    width = 50;
    height = 50;
    IMAGES_SPINNING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_SPINNING);

        this.x = x;
        this.y = y;
        this.animate();
        this.throwBottle(x, y);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPINNING);
        }, 1000 / 15);
    }


    throwBottle(x, y) {
            this.x = x;
            this.y = y;
            this.speedY = 20;
            this.applyGravity();
            this.lastThrow = new Date().getTime();
            setInterval(() => {
                this.x += 10;
            }, 25);

    }
}