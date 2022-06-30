// import {tilemapfunc} from "./func.js"
import Collide from "./collide.js";
const collide1=new Collide()

export default class Ball {
  constructor(canvas,ctx, r = 6) {
    this.canvas = canvas;
    this.ctx = ctx;    
    this.r = r;
    this.px = canvas.width / 2;
    this.py = canvas.height - 2 * this.r;
    // this.dx = 1;
    // this.dy = -1;
    this.speedX = 7;
    this.speedY = 7;
    this.count = 0;
    this.ballCount = 1;
    this.curX = 0;
    this.curY = 0;
    this.distance = 0;
    // this.brickX = 0;
    // this.brickY = 0;
    this.angx = 0;
    this.botX = canvas.width / 2;
    this.botY = canvas.height - 165 / 2.4;
    this.imgHeroHeight = 275 / 2;
    this.imgHeroWidth = 165 / 2;
    this.imgHero = new Image();
    this.imgHero.src = "./assets/images/BBTAN-bot-game.png";
  }

  createBall() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.px - this.r,
      this.py - this.r,
      this.r,
      0,
      Math.PI * 2,
      false
    );
    // ctx.fillRect(this.px - this.r,this.py - this.r,this.r,this.r);
    this.ctx.stroke();
    // this.ctx.strokeStyle="red"
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    // this.ctx.fillColor(this.px, this.py, this.r)
    // this.ctx.clearArc(this.px - this.r,this.py - this.r,this.r,this.r)
  }

  drawBot(ctx){ //bot
    ctx.drawImage(this.imgHero, this.botX, this.botY, this.imgHeroWidth, this.imgHeroHeight);
  }

  moveBall() {
    // console.log("inside moveball in ball.js");
    this.ctx.beginPath();
    this.px += this.speedX * dx;
    this.py += this.speedY * dy;
    this.ctx.clearRect(0, 0, this.canvas.width, containerHeight);
    // console.log(this.py)
    collide1.moveBall(this.px,this.py)

  }

  currentPosition() {
      // console.log("inside currentPos in ball.js");

    this.px = this.px + this.speedX * dx;
    this.py = this.py + this.speedY * dy;
    return [this.px,this.py]

  }

  boundaryCheck() {
    if (this.py <=  2 * this.r) {
      // console.log("Top")
      dy = 1;
    }

    if (this.px >= this.canvas.width - this.r) {
      // console.log("Right")
      dx = -1;
    }

    if (this.px <= 0 + 2 * this.r) {
      // console.log("left")
      dx = 1;
    }

    if (this.py >= containerHeight - 2 * this.r) {

      // console.log("hahaha ")
      this.botX = this.px + this.speedX * dx;

      dy = -1;
      // console.log("inside check",this.px,this.py)
     

      // this.count += 1;
      // if (this.py==containerHeight+this.r){
        // console.log(this.px,this.py)

      // if (this.count > 0) {
        this.mousePointer(canvas,this.px,this.py);
        isMoving = false;
        this.ballCount += 1;
        health+=1
        // this.mousePointer(canvas);
        this.slope();

        document.addEventListener("click", () => {
          isMoving = true;
        });
        collide1.brickPos()

      }

    // }
  }

  mousePointer(canvas,px,py) {
    canvas.addEventListener("mousedown", function (e) {

      this.curX = e.clientX;
      this.curY = e.clientY;
      console.log("mouse Pointer", this.curX, this.curY);
      console.log("ball position", px, py);

    });
  }

  slope() {
    // this.angX = getAngleDeg(this.px, this.py, this.curX, this.curY);
    // console.log("cursor from slope",this.curX,this.curY)
    // dx = Math.cos(this.angX);
    // dy = Math.sin(this.angX);
    // console.log(angX)
  }

}


