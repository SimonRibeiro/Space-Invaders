export default class MotherShip {
    constructor(x,y){
        this.width = 75;//image dimensions
        this.height = 33;

        this.x = x;
        this.y = y;
        this.xStart = x;

        this.image = new Image();
        this.image.src = "images/mothership.png"
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(velocity){
        if (this.xStart === -75) { //start left
            this.x += velocity //go right
        } else { //start right
            this.x -= velocity //go left
        }

    } 
}