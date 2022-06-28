export default class Ball {
  constructor(canvas,canvasHeight,canvasWidth,r=8) 
    {
    this.canvas=canvas;
    this.ctx=ctx;
    this.r = r;
    this.px = canvasWidth/2;
    this.py = canvasHeight-2*this.r;
    this.dx = 1;
    this.dy = -1;
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
    this.botX=canvasWidth/2;
    this.botY=containerHeight-165/2.4; 
    this.imgHeroHeight=275/2;
    this.imgHeroWidth=165/2; 
    this.imgHero = new Image();
    this.imgHero.src= "./assets/images/BBTAN-bot-game.png";
    
  }
  
  createBall() {
    
    ctx.arc(this.px - this.r,this.py - this.r,this.r,0,Math.PI * 2,false)
    // ctx.fillRect(this.px - this.r,this.py - this.r,this.r,this.r);
    this.ctx.stroke();
    // this.ctx.strokeStyle="red"
    // this.ctx.fillStyle = "blue";
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
    this.px += this.speedX * this.dx;
    this.py += this.speedY * this.dy;
    // this.ctx.arc(this.px, this.py, this.r, 0, Math.PI * 2, false);
    this.ctx.clearRect(0, 0, this.canvas.width, containerHeight);
    // this.ctx.stroke();
    // this.ctx.clearStroke()
    // ctx.fill();
    // ctx.fillStyle = "black";
    // this.collide()
    // console.log(this.px,this.py)

  }

  currentPosition() {
  //   // console.log("inside currentPos in ball.js");

    this.px = this.px + this.speedX * this.dx;
    this.py = this.py + this.speedY * this.dy;

        
  //   // console.log(imgHero)
    console.log("PX",this.px, this.py);
  }

  boundaryCheck() {
    if (this.py <= 0 + 2*this.r) {
      // console.log("Top")
      this.dy = 1;
    }

    if (this.px >= this.canvas.width - 2*this.r) {
      // console.log("Right")
      this.dx = -1;
    }

    if (this.px <= 0 + 2*this.r) {
      // console.log("left")
      this.dx = 1;
    }

    if (this.py >= containerHeight - 2*this.r) {
      this.dy = -1;
      this.count += 1;
      // if (this.py==containerHeight+this.r){

      if (this.count >0) {
        isMoving = false;
        this.ballCount += 1;
        this.mousePointer()
        this.slope();

        document.addEventListener("click", () => {
          isMoving = true;
          // console.log("PX",this.px, this.py);
        });

        for (let i = tileMap.length-1 ; i >=0; i--) {
            if (i == tileMap.length - 1) {
              tileMap[i] = [];
            } else {
              tileMap[i + 1] = tileMap[i];
            }
          }
          tileMap[0] = arr();
          // console.log(tileMap);


        // console.log(this.ballCount);
      }
      // }
    }
  }

  mousePointer() {
    console.log(ctx)
    canvas.addEventListener('click' ,function (e) {
      console.log("mayalu")
      // position of mouse
      this.curX = e.clientX;
      this.curY = e.clientY;
      console.log("mouse Pointer",this.curX,this.curY);
    });
  }

  slope() {

    this.angX = getAngleDeg(this.px, this.py, this.curX, this.curY);
    // console.log("cursor from slope",this.curX,this.curY)
    // this.dx = Math.cos(this.angX);
    // this.dy = Math.sin(this.angX);
    // console.log(angX)
  }

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

  collide() {
    // function clamp(val, min, max) {
    //   return Math.max(min, Math.min(max, val));
    // }

    // // Find the closest point to the circle within the rectangle
    // // Assumes axis alignment! ie rect must not be rotated
    // let closestX = clamp(this.px, this.brickX, this.brickX + this.brickSize);
    // let closestY = clamp(this.py, this.brickY, this.brickY + this.brickSize);

    // // Calculate the distance between the circle's center and this closest point
    // let distanceX = this.px - closestX;
    // let distanceY = this.py - closestY;

    // // If the distance is less than the circle's radius, an intersection occurs
    // let distanceSquared = distanceX * distanceX + distanceY * distanceY;
    // if (distanceSquared < this.r * this.r) {
    //   console.log("collided");
    //   // console.log("px", this.px, this.py);
    // }

  }
}
