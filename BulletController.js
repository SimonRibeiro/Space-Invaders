import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = []; //Arraw of all the bullets created
    timeTillNextBulletAllowed = 0; //Needs to be 0 so first press is allowed to shoot

    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
        //Boiler Plate
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("sounds/shoot.wav");
        this.shootSound.volume = 0.1;
    }

    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => bullet.y + bullet.height > 0) //Remove bullet from the array once it is off the screen; add "&& bullet.y <= this.canvas.height" for ennemy bullets?
        console.log(this.bullets.length)
        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
        //console.log(this.timeTillNextBulletAllowed)
    }

    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) { //timeTillNextBulletAllowed = 0 is set as default
        
        if (
            this.timeTillNextBulletAllowed <= 0 && //When set to positive value, gets decremented at each call of draw to create gap between bullets
            this.bullets.length < this.maxBulletsAtATime //this.bullets.lenght undefined ??? Arraw must be shorter than set maximum
        ) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0; //Reset in case the sound is already being played
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
            }
    }
}