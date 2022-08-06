class Bottle extends MovableObject {
    width = 50;
    height = 50;
    array_x = [400, 500, 600, 700, 900];


    constructor(i) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

        this.y = 372;
        this.x = this.array_x[i];
    }

    animate() {
        setInterval(() => {
            if (Math.random() > 0.5) {
                this.y++;
            } else {
                this.y--;
            }
        }, 1000/25);

    }
}