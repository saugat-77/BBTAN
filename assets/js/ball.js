class Ball {
  constructor(
    r=10,
    ctx,
    px = containerWidth,
    py = containerHeight,
    speedX = 2,
    speedY = 2,
    dx = 1,
    dy = 1,
    count = 0,
    ballCount = 1,
    curX = 0,
    curY = 0,
    brickSize = 63,
    distance = 0,
    brickX = 0,
    brickY = 0,
    angx = 0
  ) {
    this.px = px / 2;
    this.py = py;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.speedX = speedX;
    this.speedY = speedY;
    this.count = count;
    this.ballCount = ballCount;
    this.curX = curX;
    this.curY = curY;
    this.brickSize = brickSize;
    this.distance = distance;
    this.brickX = brickX;
    this.brickY = brickY;
    this.angx = angx;
    this.ctx = ctx;
  }

  createBall() {
    // console.log("inside createball in ball.js");
    this.ctx.arc(
      this.px - this.r,
      this.py - this.r,
      this.r,
      0,
      Math.PI * 2,
      false
    );

    this.ctx.strokeStyle = "black";
    
    this.ctx.stroke();
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

  }

  currentPosition() {
    // console.log("inside currentPos in ball.js");

    this.px = this.px + this.speedX * this.dx;
    this.py = this.py + this.speedY * this.dy;


    const imgHero = new Image();
    imgHero.src = "assets/images/BBTAN-bot-game.png";
    
    // console.log(imgHero)
    // console.log("PX",this.px, this.py);
  }

  boundaryCheck() {
    if (this.py <= 0 + this.r) {
      // console.log("Top")
      this.dy = 1;
    }

    if (this.px >= containerWidth - this.r) {
      // console.log("Right")
      this.dx = -1;
    }

    if (this.px <= 0 + this.r) {
      // console.log("left")
      this.dx = 1;
    }

    if (this.py >= containerHeight - this.r) {
      this.dy = -1;
      this.count += 1;
      // console.log(this.py+this.r)

      // if (this.py==containerHeight+this.r){

      if (this.count > 4) {
        //no reason but 4 choti tala thokincha
        isMoving = false;
        this.ballCount += 1;
        this.slope();
        document.addEventListener("click", () => {
          isMoving = true;
          // console.log("PX",this.px, this.py);
        });

        // console.log(this.ballCount);
      }
      // }
    }
  }

  mousePointer() {
    this.ctx.onmouseup = function (e) {
      // position of mouse
      this.curX = e.clientX;
      this.curY = e.clientY;
      // console.log("CX",this.curX,this.curY);
    };
  }

  slope() {
    this.angX = getAngleDeg(this.px, this.py, this.curX, this.curY);
    this.dx = Math.cos(this.angX);
    this.dy = Math.sin(this.angX);
    
    // console.log(angX)
  }

  fallBricks() {
    let y = [1, 2, 3, 4, 5, 6];
    // console.log(x[rand(1,6)])

    for (let j=0;j<7;j++){}
    this.ctx.beginPath()

    for (let i=0;i<1;i++){
      this.brickX = i * this.brickSize
      this.ctx.strokeRect(this.brickX,this.brickY,this.brickSize,this.brickSize)
      // this.collide()
    }
  }

  collide() {
    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    // Find the closest point to the circle within the rectangle
    // Assumes axis alignment! ie rect must not be rotated
    let closestX = clamp(this.px, this.brickX, this.brickX + this.brickSize);
    let closestY = clamp(this.py, this.brickY, this.brickY + this.brickSize);

    // Calculate the distance between the circle's center and this closest point
    let distanceX = this.px - closestX;
    let distanceY = this.py - closestY;

    // If the distance is less than the circle's radius, an intersection occurs
    let distanceSquared = distanceX * distanceX + distanceY * distanceY;
    if (distanceSquared < this.r * this.r) {
      console.log("collided");
      // console.log("px", this.px, this.py);
    }
  }
}
let isMoving = true;
const ball1 = new Ball(10, ctx);
ball1.createBall();

setInterval(() => {
  if (isMoving == true) {
    // ball1.fallBricks();
    ball1.moveBall();
    // ball1.boundaryCheck();
    // ball1.currentPosition();
    // ball1.mousePointer();
  }
}, 1000 / 60);
