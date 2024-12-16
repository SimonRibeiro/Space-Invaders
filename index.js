import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/space.png";

let playerBulletController = new BulletController(canvas, 5, "red", true); //(Where, Max number of bullets on screen, color, enable sound)
let enemyBulletController = new BulletController(canvas, 4, "white", false); 
let enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController); //Declares an instance of the Controller
let player = new Player(canvas, 3, playerBulletController); //2nd argument is velocity

const Score = document.querySelector(".Score")
const HiScore = document.querySelector(".Hi-Score")
let score = {
    current: 0,
    hi: 0
}

let isGameOver = false;
let didWin = false;
let spacePressed = false;

function game(){
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displayGameOver() { 
    if (isGameOver) {
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = " #20ff20";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
    return;
}

function checkGameOver() {
    if (isGameOver) {
        if (spacePressed) {
            resetGame();
            return;
        }
        return; //return directly from function
    }

    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }

    //if (enemyController.collideWith(player)) { ==> For scolling levels
    if (enemyController.reachBase(canvas)) {
        isGameOver = true;
    }

    if (enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}

function resetGame() {
    if (!didWin) {
        score.current = 0
        Score.textContent = score.current
    }
    isGameOver = false;
    didWin = false;

    playerBulletController = new BulletController(canvas, 5, "red", true); //(Where, Max number of bullets on screen, color, enable sound)
    enemyBulletController = new BulletController(canvas, 4, "white", false); 
    enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController); //Declares an instance of the Controller
    player = new Player(canvas, 3, playerBulletController); //2nd argument is velocity
}

function keydown() { 
    if (event.code == "Space") {
        spacePressed = true;
    }
};
function keyup() { 
    if (event.code == "Space") {
        spacePressed = false;
    }
};
document.addEventListener("keydown", keydown); //All lower case
document.addEventListener("keyup", keyup);

export {score, Score, HiScore}

setInterval(game, 1000/60) //Calling function 60 times every 1000ms (1s)