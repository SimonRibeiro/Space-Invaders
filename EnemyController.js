import Enemy from "./Enemy.js";
export default class EnemyController {
    enemyMap = [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 2, 3, 3, 3, 3, 2, 1, 1],
        [1, 1, 2, 3, 3, 3, 3, 2, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ]; //Arraw of enemy Numbers
    enemyRows = []; //Arraw of enemy Objects

    constructor(canvas) {
        this.canvas = canvas;
        this.createEnemies();
    }

    draw(ctx) {
        this.drawEnemies(ctx);
    }

    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy) => { //Makes one flat Arraw to loop over from enemyRows
            enemy.draw(ctx); //Makes each enemy draw itself
        });
    }

    createEnemies() { //Converts enemy Numbers to enemy Objects
        this.enemyMap.forEach((row, rowIndex) => { //forEach instead of map function to convert an Arraw into an other (Allows empty spaces)
            this.enemyRows[rowIndex] = []; //Adds as much rows in enemyMap, to enemyRows
            row.forEach((enemyNumber, enemyIndex) => {
                if(enemyNumber >0){ //Skips 0s (empty spaces)
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)) //enemyIndex: column(x-position); rowIndex: row(y-position); enemyNumber: Type
                }
            })
        })
    }
}