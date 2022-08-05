class Coin extends MovableObject {
    y = 300;
    width = 150;
    height = 150;


    constructor() {
        super().loadImage('img/8_coin/coin_1.png');

        this.y = 0 + Math.random() * 500; //number between 0 and 500
        this.x = 0 + Math.random() * 500; //number between 0 and 500

    }

    animate() {
        let i = 0;
        setInterval(() => {
            console.log(i);
            if (i < 0) {
                this.moveDown();
                i+= 20;
            }
            if (0 < i < 500) {
                this.moveUp();
                i+= 20;
            }
            if (i == 500) {
                i = -500;
            }
        }, 1);
    }

    moveUp() {
        this.y -= 1;
    }

    moveDown() {
        this.y += 2.5;
    }



}