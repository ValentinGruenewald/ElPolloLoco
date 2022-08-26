let restartIsReady = true;

intervalIds = [];
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopGame() {
    intervalIds.forEach(id => {
        clearInterval(id);
    });
    intervalIds = [];
    world.music.pause();
}

function startGame() {
    keyboard.ENTER = true;
    showRestartButton();
}

function restartGame() {
    showRestartButton();
    if (restartIsReady == true) {
        restartIsReady = false

        stopGame();
        world = new World(canvas, keyboard);
        keyboard.ENTER = true;
        loadLevel();

        setTimeout(() => {
            restartIsReady = true;
        }, 4000);
    }
}

function showRestartButton() {
    document.getElementById('instruction1').classList.add('d-none');
    document.getElementById('instruction2').classList.remove('d-none');
    document.getElementById('btnStart').classList.add('d-none');
    document.getElementById('btnRefresh').classList.remove('d-none');
}

function loadLevel() {
    world.level = new Level([
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken()
    ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Coin(0),
            new Coin(1),
            new Coin(2),
            new Coin(3),
            new Coin(4),
            new Bottle(0),
            new Bottle(1),
            new Bottle(2),
            new Bottle(3),
            new Bottle(4),
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ]
    );
}