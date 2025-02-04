class Character extends MovableObject {

    height = 280;
    y = 150;
    speed = 4;
    thrownBottle = new ThrownBottle();
    timeOfDeath = 0;
    timeOfLastAction = 0;
    level_start_x = 0;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    world;
    walking_sound = new Audio('audio/walking.mp3');
    death_sound = new Audio('audio/death.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/character-hurt.mpeg');
    idle_sound = new Audio('audio/character-idle.mpeg');
    game_over = new Audio('audio/game-over.mpeg');



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.timeOfLastAction = new Date().getTime();
    }
    animate() {
        setStoppableInterval(() => {
            if (this.startGame == true) {
                this.walking_sound.pause();
                if (!this.isDead()) {
                    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                        this.moveRight();
                        this.idle_sound.pause();
                        this.otherDirection = false;
                        this.walking_sound.play();
                        this.timeOfLastAction = new Date().getTime();
                    }

                    if (this.world.keyboard.LEFT && this.x > this.level_start_x) {
                        this.moveLeft();
                        this.idle_sound.pause();
                        this.otherDirection = true;
                        this.walking_sound.play();
                        this.timeOfLastAction = new Date().getTime();
                    }

                    if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                        this.jump();
                        this.idle_sound.pause();
                        this.jumping_sound.play();
                        this.timeOfLastAction = new Date().getTime();
                    }

                    this.world.camera_x = -this.x + 200;
                }
            }
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.startGame == true) {
                if (this.isVisible()) {
                    if (this.isDead()) {
                        this.playAnimation(this.IMAGES_DEAD);
                        this.death_sound.play();
                        this.game_over.play();

                    } else if (this.isHurt()) {
                        this.playAnimation(this.IMAGES_HURT);
                        this.hurt_sound.play();
                    } else if (this.isAboveGround()) {
                        this.playAnimation(this.IMAGES_JUMPING);
                    } else {
                        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                            this.playAnimation(this.IMAGES_WALKING);
                        }
                        else if (new Date().getTime() - this.timeOfLastAction < 2000) {
                            this.playAnimation(this.IMAGES_IDLE);
                        } else {
                            this.playAnimation(this.IMAGES_LONG_IDLE);
                            this.idle_sound.play();

                        }
                    }
                } else {
                    this.loadImage(this.IMAGES_DEAD[6]);
                }
            }
        }, 50);

    }

    jump() {
        this.speedY = 20;
        this.y--;
    }
}