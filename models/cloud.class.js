class Cloud extends MovableObject {

    width = 400;
    height = 150;

    
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 1000; //number between 0 and 1000
        this.y = Math.random() * 50;
        this.speed = Math.random() * 0.5;

        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 20);
    }

}

