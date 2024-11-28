import EnemyController from "./EnemyController.js";
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/space.png";

const enemyController = new EnemyController(canvas); //Declares an instance of the Controller

function game(){
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    enemyController.draw(ctx);
}

setInterval(game, 1000/60) //Calling function 60 times every 1000ms (1s)