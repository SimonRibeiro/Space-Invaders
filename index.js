import EnemyController from "./EnemyController.js";
import MotherShipController from "./MotherShipController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/space.png";

//let motherShipController = undefined;

//needs to reset
let enemyVelocity = 1;
//let motherShipTimer = 500;

let playerBulletController = new BulletController(canvas, 5, "red", 1); //(Where, Max number of bullets on screen, color, shootSoundNumber)
let enemyBulletController = new BulletController(canvas, 4, "white", 2);
let motherShipBulletController = new BulletController(canvas, 3, " #20ff20", 4);
let enemyController = new EnemyController(canvas, enemyVelocity, enemyBulletController, playerBulletController); //Declares an instance of the Controller
let motherShipController = new MotherShipController(canvas, motherShipBulletController, playerBulletController);
let player = new Player(canvas, 3, playerBulletController); //2nd argument is velocity; 

const Score = document.querySelector(".Score");
const HiScore = document.querySelector(".Hi-Score");
const Lives = document.querySelector(".Lives");
let UI = {
    score: 0,
    hi: 0,
    lives: 1
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
        //motherShipSpawn();
        motherShipController.draw(ctx); //Just exclude createMotherShip from constructor instead ?
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
        motherShipBulletController.draw(ctx);
    }
}

/* function motherShipSpawn() {
    motherShipTimer--;
    if (motherShipTimer == 0) {
        motherShipController = new MotherShipController(canvas, motherShipBulletController, playerBulletController);
    }
} */

function displayGameOver() { 
    if (isGameOver) {
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = " #20ff20";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);

        //let GamerOver audio = new Audio (didWin ? "winMusic" : "loseMusic")
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

    if (enemyBulletController.collideWith(player) || motherShipBulletController.collideWith(player)) {
        UI.lives--;
        Lives.textContent = UI.lives;
        //play player hit sound
        //makes sprite blink
    }

    if (enemyController.reachBase(canvas)) {//if (enemyController.collideWith(player)) { ==> For scolling levels
        UI.lives--;
        Lives.textContent = UI.lives;
        isGameOver = true; //moyen de faire repartir les aliens du haut sans les tous les resapwn ?
    }

    if (UI.lives <= 0)  {
        isGameOver = true;
    }

    if (enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}

function resetGame() {
    if (UI.lives <= 0) {
        UI.score = 0;
        UI.lives = 1;
        Score.textContent = UI.score;
        Lives.textContent = UI.lives;
        enemyVelocity = 1
    } 
    if (didWin) {
        enemyVelocity = enemyVelocity + 0.1;
    }
    isGameOver = false;
    didWin = false;

    playerBulletController = new BulletController(canvas, 5, "red", 1);
    enemyBulletController = new BulletController(canvas, 4, "white", 2);
    motherShipBulletController = new BulletController(canvas, 3, " #20ff20", 4);
    enemyController = new EnemyController(canvas, enemyVelocity, enemyBulletController, playerBulletController);
    // if (UI.lives > 0) only rest position ? (without: prevents player from going to next wave witch would be more challenging)
    motherShipController = new MotherShipController(canvas, motherShipBulletController, playerBulletController);
    //call function to count timer before declaring motherShipController
    //motherShipTimer = 500;
    player = new Player(canvas, 3, playerBulletController);

}

function keydown() { 
    if (event.code == "Space") { // || "Enter" ? ou juste "Enter" ? => for pause function
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

export {UI, Score, HiScore, Lives}

setInterval(game, 1000/60) //Calling function 60 times every 1000ms (1s)