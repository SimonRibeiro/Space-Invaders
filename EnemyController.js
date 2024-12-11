import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController {
    enemyMap = [
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 2, 3, 3, 3, 3, 2, 1, 1],
        [1, 1, 2, 3, 3, 3, 3, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ]; //Arraw of enemy Numbers
    enemyRows = []; //Arraw of enemy Objects

    currentDirection = MovingDirection.right; //First direction defenition
    xVelocity = 0; //Currently defined, will change on direction change
    yVelocity = 0; //idem
    defaultXVelocity = 1; //Must be turned negative for moving left
    defaultYVelocity = 1; //Can be increased so enemies moves faster downwards than sideways
    moveDownTimerDefault = 30; //Value to count down before changing direction
    moveDownTimer = this.moveDownTimerDefault; //Actual timer to be reset after each countdown
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;

    constructor(canvas, enemyBulletController, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.createEnemies();
    }

    draw(ctx) {
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();
    }

    collisionDetection() {
        this.enemyRows.forEach((enemyRow) => { //loop over rows
            enemyRow.forEach((enemy, enemyIndex) => { //loop over enemies in each row
                if (this.playerBulletController.collideWith(enemy)) {
                    //play enemy-death.wav
                    enemyRow.splice(enemyIndex, 1); //remove 1 enemy from the number of the index
                }
            });
        });
        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0); //Keeps only rows that aren't empty
    }
    
    fireBullet() {
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length); //round down(random(0-1) * total) = random index in the total
            const enemy = allEnemies[enemyIndex];
            this.enemyBulletController.shoot(enemy.x + (enemy.width / 2), enemy.y + enemy.height, -3); //Negative value for velocity because of the way the BulletController is built
            console.log(enemyIndex);
        }
    }
    
    resetMoveDownTimer() {
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }
    
    decrementMoveDownTimer() {
        if(
            this.currentDirection === MovingDirection.downLeft || 
            this.currentDirection === MovingDirection.downRight
        ) {
            this.moveDownTimer--;
        }
    }
    
    updateVelocityAndDirection() {
        for (const enemyRow of this.enemyRows) {
            if (this.currentDirection == MovingDirection.right) {
                this.xVelocity = this.defaultXVelocity; //Start moving right
                this.yVelocity = 0; //Stop moving down
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) { //Right boundary
                    this.currentDirection = MovingDirection.downLeft; //Start moving down and start decrementing the timer
                    break;
                }
            } else if (this.currentDirection === MovingDirection.downLeft) {
                if (this.moveDown(MovingDirection.left)) { //True if direction as changed
                    break;
                }
            } else if (this.currentDirection === MovingDirection.left) {
                this.xVelocity = -this.defaultXVelocity; //Negative to move left
                this.yVelocity = 0; //Will move diagonally if not set back to 0
                const leftMostEnemy = enemyRow[0];
                if (leftMostEnemy.x <= 0) { //Left boundary
                    this.currentDirection = MovingDirection.downRight; //Start moving down and start decrementing the timer
                    break;
                }
            } else if (this.currentDirection === MovingDirection.downRight) {
                if (this.moveDown(MovingDirection.right)) { //True if direction as changed
                    break;
                }
            }
        }
    }

    moveDown(newDirection) { //Same method for downLeft and downRight
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDownTimer <= 0) { //Change direction when timer is over
            this.currentDirection = newDirection;
            return true; //Boolean used by the if-statement to break out of the loop in updateVelocityAndDirection
        }
        return false;
    }
    
    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy) => { //Makes one flat Arraw to loop over from enemyRows
            enemy.move(this.xVelocity, this.yVelocity); //Modifies positions for each looped over enemy according to currently defined velocity
            enemy.draw(ctx); //Makes each enemy draw itself
        });
    }

    createEnemies() { //Converts enemy Numbers to enemy Objects
        this.enemyMap.forEach((row, rowIndex) => { //forEach instead of map function to convert an Arraw into an other (Allows empty spaces)
            this.enemyRows[rowIndex] = []; //Adds as much rows in enemyMap, to enemyRows
            row.forEach((enemyNumber, enemyIndex) => {
                if (enemyNumber >0) { //Skips 0s (empty spaces)
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)) //enemyIndex: column(x-position); rowIndex: row(y-position); enemyNumber: Type
                }
            })
        })
    }
}