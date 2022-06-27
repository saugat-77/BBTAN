export default class Ball {
  constructor(canvas,ctx,r=10) 
    {
    this.canvas=canvas;
    this.ctx=ctx;
    this.px = canvas.width/ 2;
    this.py = canvas.height-2*r;
    this.dx = 1;
    this.dy = 1;
    this.r = r;
    this.speedX = 2;
    this.speedY = 2;
    this.count = 0;
    this.ballCount = 1;
    this.curX = 0;
    this.curY = 0;
    this.distance = 0;
    this.brickX = 0;
    this.brickY = 0;
    this.angx = 0;  
    this.botX=this.canvas.width/2;
    this.botY=containerHeight-165/2.4; 
    this.imgHeroHeight=275/2;
    this.imgHeroWidth=165/2; 
    this.imgHero = new Image();
    this.imgHero.src= "./assets/images/BBTAN-bot-game.png";
    
  }

  createBall() {
    this.px = canvas.width/ 2;
    this.py = canvas.height-2*this.r;

    // console.log(canvas.height)
    // console.log(canvas.width)

    ctx.arc(this.px - this.r,this.py - this.r,this.r,0,Math.PI * 2,false)
    ctx.fillRect(this.px - this.r,this.py - this.r,this.r,this.r);
    ctx.strokeStyle = "black";
    ctx.stroke();
    
  }
  
  
  drawBot(ctx){ //bot
    // ctx.drawImage(this.imgHero, this.botX, this.botY, this.imgHeroWidth, this.imgHeroHeight);
  }
  
  moveBall() {
    // console.log("inside moveball in ball.js");
    
    this.ctx.clearRect(0, 0, containerWidth, containerHeight);
    
    this.ctx.beginPath();
    this.px += this.speedX * this.dx;
    this.py += this.speedY * this.dy;
    this.ctx.arc(this.px, this.py, this.r, 0, Math.PI * 2, false);
    this.ctx.stroke();
    // this.collide()
    // console.log(this.px,this.py)

  }

  // currentPosition() {
  //   // console.log("inside currentPos in ball.js");

  //   this.px = this.px + this.speedX * this.dx;
  //   this.py = this.py + this.speedY * this.dy;

        
  //   // console.log(imgHero)
  //   // console.log("PX",this.px, this.py);
  // }

  // boundaryCheck() {
  //   if (this.py <= 0 + this.r) {
  //     // console.log("Top")
  //     this.dy = 1;
  //   }

  //   if (this.px >= containerWidth - this.r) {
  //     // console.log("Right")
  //     this.dx = -1;
  //   }

  //   if (this.px <= 0 + this.r) {
  //     // console.log("left")
  //     this.dx = 1;
  //   }

  //   if (this.py >= containerHeight - this.r) {
  //     this.dy = -1;
  //     this.count += 1;
  //     // console.log(this.py+this.r)

  //     // if (this.py==containerHeight+this.r){

  //     if (this.count > 4) {
  //       //no reason but 4 choti tala thokincha
  //       isMoving = false;
  //       this.ballCount += 1;
  //       this.slope();
  //       document.addEventListener("click", () => {
  //         isMoving = true;
  //         // console.log("PX",this.px, this.py);
  //       });

  //       // console.log(this.ballCount);
  //     }
  //     // }
  //   }
  // }

  // mousePointer() {
  //   this.ctx.onmouseup = function (e) {
  //     // position of mouse
  //     this.curX = e.clientX;
  //     this.curY = e.clientY;
  //     // console.log("CX",this.curX,this.curY);
  //   };
  // }

  // slope() {
  //   this.angX = getAngleDeg(this.px, this.py, this.curX, this.curY);
  //   this.dx = Math.cos(this.angX);
  //   this.dy = Math.sin(this.angX);
    
  //   // console.log(angX)
  // }

  // fallBricks() {
  //   let y = [1, 2, 3, 4, 5, 6];
  //   // console.log(x[rand(1,6)])

  //   for (let j=0;j<7;j++){}
  //   this.ctx.beginPath()

  //   for (let i=0;i<1;i++){
  //     this.brickX = i * this.brickSize
  //     this.ctx.strokeRect(this.brickX,this.brickY,this.brickSize,this.brickSize)
  //     // this.collide()
  //   }
  // }

  // collide() {
  //   function clamp(val, min, max) {
  //     return Math.max(min, Math.min(max, val));
  //   }

  //   // Find the closest point to the circle within the rectangle
  //   // Assumes axis alignment! ie rect must not be rotated
  //   let closestX = clamp(this.px, this.brickX, this.brickX + this.brickSize);
  //   let closestY = clamp(this.py, this.brickY, this.brickY + this.brickSize);

  //   // Calculate the distance between the circle's center and this closest point
  //   let distanceX = this.px - closestX;
  //   let distanceY = this.py - closestY;

  //   // If the distance is less than the circle's radius, an intersection occurs
  //   let distanceSquared = distanceX * distanceX + distanceY * distanceY;
  //   if (distanceSquared < this.r * this.r) {
  //     console.log("collided");
  //     // console.log("px", this.px, this.py);
  //   }
  // }
}
let isMoving = true;
const ball1 = new Ball(10, ctx);
ball1.createBall();

setInterval(() => {
  if (isMoving == true) {
    // ball1.fallBricks();
    // ball1.moveBall();
    // ball1.boundaryCheck();
    // ball1.currentPosition();
    // ball1.mousePointer();
  }
}, 1000 / 60);
