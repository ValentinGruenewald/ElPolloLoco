class Coin extends MovableObject {
    y = 300;
    width = 150;
    height = 150;
    array_x = [400, 500, 600, 650, 700];
    collect_coin = new Audio('audio/coin-collect.mpeg');


    constructor(i) {
        super().loadImage('img/8_coin/coin_1.png');

        this.y = 100 + Math.random() * 200; //number between 0 and 500
        this.x = this.array_x[i]; //number between 0 and 500
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
                this.collect_coin.play();
            }
        }, 50);
    }
}