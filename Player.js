export default class Player {
    rightPressed = false;
    leftPressed = false;

    constructor(canvas, velocity) {
        this.canvas = canvas;
        this.velocity = velocity;

        this.width = 50; //Image dimension
        this.height = 48; //Idem

        this.x = (this.canvas.width / 2) - (this.width / 2); //Starting position in the middle of the screen
        this.y = this.canvas.height - 75; //Slight pop-off the bottom

        this.image = new Image();
        this.image.src = "images/player.png";

        document.addEventListener("keydown", this.keydown); //All lower case
        document.addEventListener("keyup", this.keyup);
    }

    draw(ctx) {
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWithWalls() {
        if (this.x < 0) {  //Left boundary
            this.x = 0; //Prevents x from getting smaller than 0
        }

        if (this.x > this.canvas.width - this.width) { //Right boundary
            this.x = this.canvas.width - this.width;
        }
    }
    
    move() {
        if (this.rightPressed) {
            this.x += this.velocity;
        } else if (this.leftPressed) {
            this.x += -this.velocity
        }
    }
    
    keydown = event => { //Needs to be in arrow function format for the this proprety to function correctly
        if (event.code == "ArrowRight") {
            this.rightPressed = true;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = true;
        }
    }

    keyup = event => {
        if (event.code == "ArrowRight") {
            this.rightPressed = false;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = false;
        }
    }
}