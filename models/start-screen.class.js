class StartScreen extends DrawableObject {

    image = [
        'img/9_intro_outro_screens/start/startscreen_1.png'
    ];

    
    constructor() {
        super();
        this.loadImage(this.image);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }

    
}