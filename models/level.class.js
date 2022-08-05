class Level {
    enemies;
    collectables;
    backgroundobjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundobjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundobjects = backgroundobjects;
    }
}