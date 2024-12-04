export default class Player {
    constructor(canvas, velocity) {
        this.canvas = canvas;
        this.velocity = velocity;

        this.width = 50; //Image dimension
        this.height = 48; //Idem
        
        this.x = (this.canvas.width / 2) - (this.width / 2); //Starting position in the middle of the screen
        this.y = this.canvas.height - 75; //Slight pop-off the bottom

        this.image = new Image();
        this.image.src = "images/player.png"
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}