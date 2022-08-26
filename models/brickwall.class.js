class Brickwall extends MovableObject {

    width = 100;
    height = 250;


    constructor() {
        super().loadImage('img/5_background/brickwall.jpg');

        this.x = 929; //number between 0 and 1000
        this.y = -250;

        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            if (this.y < 168) {
                this.y += 20;
            } else {
                this.y = 168;
            }
        }, 20);
    }
}