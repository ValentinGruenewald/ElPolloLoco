class Bottle extends MovableObject {
    width = 50;
    height = 50;
    array_x = [400, 450, 620, 700, 800, 1600, 1650, 1700, 1730];
    collect_bottle = new Audio('audio/bottle-collect.mpeg');


    constructor(i) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

        this.y = 372;
        this.x = this.array_x[i];
        this.checkForCollection();
    }

    animate() {
        setInterval(() => {
            if (Math.random() > 0.5) {
                this.y++;
            } else {
                this.y--;
            }
        }, 1000 / 25);

    }

    checkForCollection() {
        setInterval(() => {
            if (this.x == -5000) {
                this.x = -6000;
                this.collect_bottle.play();
            }
        }, 50);
    }
}