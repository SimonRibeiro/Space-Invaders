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
        //this.shootSound = new Audio("sounds/enemyShoot.wav"); ==> Add to Player.js, Enemy.js ... And pass "shootSound" on to BulletController insted of "soundEnabled" ?
        //this.shootSound.volume = 0.1;
    }

    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => bullet.y + bullet.height > 0 && bullet.y <= this.canvas.height) //Remove playerBullets once off the screen; add ennemyBullets
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
            
            if (this.soundEnabled) { //Remove if statement
                this.shootSound.currentTime = 0; //Reset in case the sound is already being played
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
            }
    }
}