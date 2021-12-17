import Snake from './snake.js';
import Apple from './apple.js';
import KeyboardListener from './listeners/keyboardListener.js';
import ScoreRenderer from './renderers/scoreRenderer.js';
import SnakeRenderer from './renderers/snakeRenderer.js';
import AppleRenderer from './renderers/appleRenderer.js';

const canvas = document.getElementById("canvas");
const { width, height } = canvas;

// game logic
const snake1 = new Snake(20, 20, 20, width, height, "blue");
const snake2 = new Snake(120, 20, 20, width, height, "red");
const snake3 = new Snake(220, 20, 20, width, height, "yellow");
const snake4 = new Snake(320, 20, 20, width, height, "green");
const game = {
    snakes: [snake1, snake2, snake3, snake4],
    apple: new Apple([snake1, snake2, snake3, snake4], 20),
}
 
function update() {
    for (let snake of game.snakes) {
        if (!snake.move()) {
            snake.die();
        }

        if (snake.eat(game.apple)) {
            game.apple = new Apple([snake1, snake2, snake3, snake4], 20);
        }
    }
}

// display logic

let lastFrameTimestamp;
const maxFPS = 15;
const scoreRenderer = new ScoreRenderer(game, canvas);
const appleRenderer = new AppleRenderer(game, canvas);
const snakeRenderer = new SnakeRenderer(game, canvas);

window.onload = function () {
    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    if (timestamp < lastFrameTimestamp + (1000 / maxFPS)) {
        requestAnimationFrame(gameLoop);
        return;
    }

    lastFrameTimestamp = timestamp;
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function draw() {
    snakeRenderer.draw();
    scoreRenderer.draw();
    appleRenderer.draw();
}

// input logic
const keyboardListener = new KeyboardListener();

window.addEventListener("keydown", function (event) {
    keyboardListener.listenArrows(event, snake1);
    keyboardListener.listenASDW(event, snake2);
    keyboardListener.listenFGHT(event, snake3);
    keyboardListener.listenJKLI(event, snake4);
});


