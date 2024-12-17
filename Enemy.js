export default class Enemy {
    constructor(x, y, imageNumber){ //, frameIndex, pts
        this.width = 44; //image dimensions
        this.height = 32; //image dimensions

        this.x = x;
        this.y = y;

        this.image = new Image();
        this.image.src = `images/enemy${imageNumber}.png`; //.${frameIndex}

        //pts
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity;
    }

/*  collideWith(sprite) {
        if (this.x + this.width > sprite.x &&
            this.x < sprite.x + sprite.width &&
            this.y + this.height > sprite.y &&
            this.y < sprite.y + sprite.height
        ) {
            return true;
        } else {
            return false;
        }
    } 
    ==> refactor with the bullet collider ; for scrolling only ? */

    reachBase(canvas) {
        if (this.y + this.height > canvas.height - 75) { //Same pop-off as Player (make a variable ?)
            return true;
        } else {
            return false;
        }
    }
}