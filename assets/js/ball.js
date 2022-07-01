import Collide from "./collide.js";
const collide1=new Collide()

export default class Ball {
  constructor(canvas,ctx, r = 6) {
    this.canvas = canvas;
    this.ctx = ctx;    
    this.r = r;
    this.px = canvas.width / 4;
    this.py = canvas.height - 2 * this.r;
    this.speedX = 3;
    this.speedY = 3;
    this.count = 0;
    this.ballCount = 1;
    this.curX = 0;
    this.curY = 0;
    this.distance = 0;
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
    this.ctx.stroke();
    this.ctx.fillStyle = "white";
    this.ctx.fill();
  }

  drawBot(ctx){
    ctx.drawImage(this.imgHero, this.botX, this.botY, this.imgHeroWidth, this.imgHeroHeight);
  }

  moveBall() {

    canvas.addEventListener("click",  (e)=> {
      this.curX = e.clientX;
      this.curY = e.clientY;
    
      });

    
    this.ctx.beginPath();
    this.px += this.speedX * dx;
    this.py += this.speedY * dy;
    this.ctx.clearRect(0, 0, this.canvas.width, containerHeight);



    collide1.moveBall(this.px,this.py)
    return ballPosition;

  }

 

  boundaryCheck() {
    if (this.py <=  2 * this.r) {
      dy = 1;
    }

    if (this.px >= this.canvas.width - this.r) {
      dx = -1;
    }

    if (this.px <= 0 + 2 * this.r) {
      dx = 1;
    }

    if (this.py >= containerHeight - 2 * this.r) {
      this.botX = this.px + this.speedX * dx;
      dy = -1;
      
      this.mousePointer(this.canvas)

        isMoving = false;
        this.ballCount += 1;
        health+=1
        this.slope();

        document.addEventListener("mousedown", () => {
          isMoving = true;
        });
        collide1.brickPos()

      }

  }

  mousePointer(canvas) {
    canvas.addEventListener("click",  (e)=> {
    this.curX = e.clientX;
    this.curY = e.clientY;
  //   // this.slope()
  //   console.log("cursor",this.curX,this.curY)  //need current value here
  //   console.log("ball position mouse",this.px,this.py);
  
    });
  }

  slope() {
    // this.angX = getAngleDeg(this.px, 553, this.curX, this.curY);
    // console.log("cursor from slope",this.curX,this.curY)
    // dx = Math.cos(this.angX);
    // dy = Math.sin(this.angX);
    // console.log(angX)
  }

}