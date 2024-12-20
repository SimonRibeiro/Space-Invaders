import { UI, Score, HiScore, Lives} from "./index.js";
import MotherShip from "./MotherShip.js";

export default class MotherShipController {
    motherShips = [];
    velocity = 2
    fireBulletTimer = 0
    motherShipTimer = (Math.floor(Math.random() * 5) * 100) + 300;

    constructor(canvas, motherShipBulletController, playerBulletController) {
        this.canvas = canvas;
        this.motherShipBulletController = motherShipBulletController;
        this.playerBulletController = playerBulletController;

        //this.motherShipDeathSound = new Audio("sounds/mothership-death.wav");
        //this.motherShipSound = new Audio("sounds/mothership.wav")
        this.enemyDeathSound = new Audio("sounds/enemy-death.wav");
        this.enemyDeathSound.volume = 0.05;

        this.createMotherShip();
    }

    draw(ctx) {
        this.createMotherShip();
        this.collisionDetection();
        this.drawMotherShip(ctx);
        this.fireBullet();
        //console.log(this.motherShips.length); 
    }

    collisionDetection() {
        this.motherShips.forEach((motherShip, index) => {
            if (this.playerBulletController.collideWith(motherShip)) {
                this.enemyDeathSound.currentTime = 0;
                this.enemyDeathSound.play();
                //this.motherShipDeathSound.currentTime = 0;
                //this.motherShipDeathSound.play();
                this.motherShips.splice(index, 1);

                //drop up-grade

                //refactor in imported function
                let preScore = UI.score % 1000;
                const points = (Math.floor(Math.random() * 3) * 100) + 100; (100-200-300)
                console.log(points);
                UI.score = UI.score + points;
                Score.textContent = UI.score
                if (UI.score>UI.hi) {
                    UI.hi = UI.score;
                    HiScore.textContent = UI.hi;
                }
                if (preScore >= UI.score % 1000) {
                    UI.lives++;
                    Lives.textContent = UI.lives;
                }
            }
        })
    }

    fireBullet() {
        if (this.motherShips.length > 0) {
            this.fireBulletTimer--;
            if (this.fireBulletTimer <= 0) {
                this.motherShips.forEach((motherShip) => {
                    this.motherShipBulletController.shoot(motherShip.x + (motherShip.width / 2), motherShip.y + motherShip.height, -4)
                })
                this.fireBulletTimer = Math.floor(Math.random() * 100);
            } 
        }
    }

    drawMotherShip(ctx) {
        if (this.motherShips.length > 0) {
            this.motherShips.forEach((motherShip, index) => {
                motherShip.move(this.velocity);
                motherShip.draw(ctx);
                //this.motherShipSound.currentTime = 0;
                //this.motherShipSound.play();
                if (this.motherShip.xStart === -75 && this.motherShip.x >= 600) {
                    this.motherShips.splice(index, 1);
                }
                if (this.motherShip.xStart === 600 && this.motherShip.x <= -75) {
                    this.motherShips.splice(index, 1);
                }
            })
        }
    }

    createMotherShip() {
        this.motherShipTimer--;
        if (this.motherShipTimer <= 0) {
            let xPosition = 0;
            const side = Math.random(); //random(0-1)
            if (side >= 0.5) {
                xPosition = 600; //right side
            } else {
                xPosition = -75; //left side - mothership width
            }
            this.motherShips.push(this.motherShip = new MotherShip(xPosition, 5))
            this.motherShipTimer = (Math.floor(Math.random() * 5) * 100) + 300;
        }
    }
}