import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = []; //Arraw of all the bullets created
    timeTillNextBulletAllowed = 0; //Needs to be 0 so first press is allowed to shoot

    constructor(canvas, maxBulletsAtATime, bulletColor, shootSoundNumber) {
        //Boiler Plate
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;

        this.shootSoundNumber = shootSoundNumber;
        this.shootSound = new Audio(`sounds/shoot${this.shootSoundNumber}.wav`);
    }

    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => bullet.y + bullet.height > 0 && bullet.y <= this.canvas.height) //Remove playerBullets once off the screen; and ennemyBullets
        //console.log(this.bullets.length)
        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
        //console.log(this.timeTillNextBulletAllowed)
    }

    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) => bullet.collideWith(sprite)); //Return a negative number if hit none
        if (bulletThatHitSpriteIndex >= 0) {
            this.bullets.splice(bulletThatHitSpriteIndex, 1); //remove bullet that hit
            return true;
        }
        return false;
    }
    
    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) { //timeTillNextBulletAllowed = 0 is set as default
        if (
            this.timeTillNextBulletAllowed <= 0 && //When set to positive value, gets decremented at each call of draw to create gap between bullets
            this.bullets.length < this.maxBulletsAtATime //this.bullets.lenght undefined ??? Arraw must be shorter than set maximum
        ) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            
            if (this.shootSoundNumber === 1) {
                this.shootSound.volume = 0.1;
            }
            this.shootSound.currentTime = 0; //Reset in case the sound is already being played
            this.shootSound.play();

            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
            }
    }
}