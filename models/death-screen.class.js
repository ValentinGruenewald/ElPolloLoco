class DeathScreen extends DrawableObject {

    image = [
        'img/9_intro_outro_screens/game_over/game over.png'
    ];

    
    constructor() {
        super();
        this.loadImage(this.image);
        this.x = -5000;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}