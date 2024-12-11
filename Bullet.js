export default class Bullet {
    constructor(canvas, x, y, velocity, bulletColor) {
        //Boiler Plate
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.bulletColor = bulletColor;

        this.width = 5;
        this.height = 20;
    }

    draw(ctx) {
        this.y -= this.velocity; //Negative to shoot upward
        ctx.fillStyle = this.bulletColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}