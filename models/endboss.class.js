class Endboss extends MovableObject {
    y = 45;
    height = 400;
    width = 275;
    energy = 100;
    timeOfDeath = 0;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1500;
        this.timeOfSpawn = new Date().getTime();
        this.y = -400;
        this.animate();
    }


    animate() {
        setInterval(() => {
            let timeAlive = (new Date().getTime() - this.timeOfSpawn) / 1000; // calculates the timespan from the spawn of the endboss until the current time
            if (!this.isDead()) {
                if (timeAlive > 10) {
                    this.x -= 2;
                } else if (timeAlive > 5) {
                    if (this.y < 45) {
                        this.y += 10;
                        this.x -= 10;
                    } else {
                        this.y = 45;
                    }
                } else if (timeAlive > 4) {
                    if (this.y > -200) {
                        this.y -= 20;
                        this.x += 3;
                    }
                } else if (timeAlive >= 0) {
                    if (this.y < 45) {
                        this.y += 10;
                        this.x -= 2;
                    } else {
                        this.y = 45;
                    }
                }
            }
        }, 1000 / 25);

        setInterval(() => {
            let timeAlive = (new Date().getTime() - this.timeOfSpawn) / 1000; // calculates the timespan from the spawn of the endboss until the current time
            if (this.isVisible()) {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else if (timeAlive > 10) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
                else if (timeAlive > 7) {
                    this.playAnimation(this.IMAGES_ALERT);
                } else if (timeAlive > 4) {
                    this.playAnimation(this.IMAGES_ATTACK);
                }
                else if (timeAlive >= 0) {
                    this.playAnimation(this.IMAGES_ALERT);
                }
            } else {
                this.x = -5000;
            }
        }, 1000 / 10);
    }
}
