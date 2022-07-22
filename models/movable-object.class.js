class MovableObject {
    x = 120;
    y = 265;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    speed = 0.15;
    currentImage = 0;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                this.y = 150;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 150
    }


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img.src = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}