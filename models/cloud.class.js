class Cloud extends MovableObject {

    y = 20;
    width = 400;
    height = 150;

    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500; //number between 0 and 500

        this.animate();
    }

    animate() {
        this.moveLeft();
    }

}

