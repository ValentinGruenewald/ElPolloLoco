let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bindBtsPressEvents();
}

function bindBtsPressEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    })

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    })

    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (world.character.timeOfDeath == 0 && world.victorious == false) {
            keyboard.D = true;
        }
    })

    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    })

    document.getElementById('btnStart').addEventListener('touchstart', (e) => {
        e.preventDefault();
        setTimeout(() => {
            keyboard.ENTER = true;
            showRestartButton();
        }, 100);
    })

    document.getElementById('btnStart').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.ENTER = false;
    })
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == "39") {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == "37") {
        keyboard.LEFT = true;
    }

    if (e.keyCode == "38") {
        keyboard.UP = true;
    }

    if (e.keyCode == "40") {
        keyboard.DOWN = true;
    }

    if (e.keyCode == "32") {
        keyboard.SPACE = true;
    }


    if (e.keyCode == "68") {
        if (world.character.timeOfDeath == 0 && world.victorious == false) {
            keyboard.D = true;
        }
    }

    if (e.keyCode == "13") {
        keyboard.ENTER = true;
        showRestartButton();
    }

    if (e.keyCode == "70") {
        keyboard.F = true;
    }

    if (e.keyCode == "82") {
        keyboard.R = true;
        restartGame();
    }

});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == "39") {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == "37") {
        keyboard.LEFT = false;
    }

    if (e.keyCode == "38") {
        keyboard.UP = false;
    }

    if (e.keyCode == "40") {
        keyboard.DOWN = false;
    }

    if (e.keyCode == "32") {
        keyboard.SPACE = false;
    }

    if (e.keyCode == "68") {
        keyboard.D = false;
    }

    if (e.keyCode == "13") {
        keyboard.ENTER = false;
    }

    if (e.keyCode == "70") {
        keyboard.F = false;
    }

    if (e.keyCode == "82") {
        keyboard.R = false;
    }
});