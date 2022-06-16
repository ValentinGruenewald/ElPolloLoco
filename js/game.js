let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);


    console.log('My character is', world.character);
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == "39") {
        console.log('right');
        keyboard.RIGHT = true;
    }

    if (e.keyCode == "37") {
        console.log('left');
        keyboard.LEFT = true;
    }

    if (e.keyCode == "38") {
        console.log('up');
        keyboard.UP = true;
    }

    if (e.keyCode == "40") {
        console.log('down');
        keyboard.DOWN = true;
    }

    if (e.keyCode == "32") {
        console.log('space');
        keyboard.SPACE = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == "39") {
        console.log('rightnot');
        keyboard.RIGHT = false;
    }

    if (e.keyCode == "37") {
        console.log('leftnot');
        keyboard.LEFT = false;
    }

    if (e.keyCode == "38") {
        console.log('upnot');
        keyboard.UP = false;
    }

    if (e.keyCode == "40") {
        console.log('downnot');
        keyboard.DOWN = false;
    }

    if (e.keyCode == "32") {
        console.log('spacenot');
        keyboard.SPACE = false;
    }
});