class Ball {
  constructor(
    r,
    px = containerWidth,
    py = containerHeight,
    speedX = 2,
    speedY = 2,
    dx = 1,
    dy = 1,
    count = 0,
    ballCount = 1,
    curX=0,
    curY=0,
    bricksize=50,
    boxSize=63,
    distance=0,
    brickX=0,
    brickY=0
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
    this.curX=curX;
    this.curY=curY;
    this.canvas = document.querySelector(".canvas");
    this.ctx = this.canvas.getContext("2d");
    this.bricksize=bricksize;
    this.boxSize=boxSize;
    this.distance=distance;
    this.brickX=brickX;
    this.brickY=brickY;
  }

  createBall() {
    this.ctx.arc(
      this.px - this.r,
      this.py - this.r,
      this.r,
      0,
      Math.PI * 2,
      false
    );

    this.ctx.strokeStyle = "blue";
    this.ctx.stroke();
    
  }

  moveBall() {
    this.ctx.beginPath();
    this.px += this.speedX * this.dx;
    this.py += this.speedY * this.dy;
    this.ctx.arc(this.px, this.py, this.r, 0, Math.PI * 2, false);
    this.ctx.stroke();
    // this.ctx.clearRect(0,0,containerWidth,containerHeight)
  }

  currentPosition() {
    this.px = this.px +this.speedX * this.dx;
    this.py =this.py + this.speedY * this.dy;
    // console.log("PX",this.px, this.py);

  }

  boundaryCheck() {
    if (this.px >= containerWidth - this.r) {
      this.dx = -1;
    }
    if (this.py >= containerHeight - this.r) {
      this.dy = -1;
      this.count += 1;
      // console.log(this.py+this.r)

      // if (this.py==containerHeight+this.r){
        // console.log("fasas")

      if (this.count > 4) {
        //no reason but 4 choti tala thokincha
        isMoving = false;
        this.ballCount += 1;
        document.addEventListener("click",  ()=> {
          isMoving = true;
          // console.log("PX",this.px, this.py);
          this.slope();

        });

        // console.log(this.ballCount);
      }
    // }
  }
    if (this.px <= 0 + this.r) {
      this.dx = 1;
    }
    if (this.py <= 0 + this.r) {
      this.dy = 1;
    }
  }

  mousePointer(){
    this.canvas.onmouseup=function
    (e)
    {
      // position of mouse
      this.curX=e.clientX;
      this.curY=e.clientY;
      // console.log("CX",this.curX,this.curY);
    }
  }

  slope(){
    let angX=getAngleDeg(this.px,this.py,this.curX,this.curY)
    this.dx=Math.cos(angX)
    this.dy=Math.sin(angX)
    // console.log(angX)
  }

  fallBricks(){
    let y=[1,2,3,4,5,6]
    // console.log(x[rand(1,6)])
    this.ctx.beginPath()
  
    // for (let j=0;j<7;j++){}

      for (let i=0;i<7;i++){
        this.brickX = i * this.boxSize
        // this.brickY= this.boxSize * (j+1)
        this.ctx.strokeRect(this.brickX,this.brickY,this.boxSize,this.boxSize)
        // console.log("position Bricks",this.brickX,this.brickY)
        this.collide()
      }
       
  }

  collide(){

    this.distance=getDistance(this.brickX+this.brickX,this.brickY+this.brickY,this.px,this.py)
    if(this.distance<50){
      console.log('hhahahaha')

    }
    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val))
    }
    
    // Find the closest point to the circle within the rectangle
    // Assumes axis alignment! ie rect must not be rotated
    var closestX = clamp(this.px, this.brickX, this.brickX + this.bricksize);
    var closestY = clamp(this.py, this.brickY, this.brickY + this.bricksize);
    
    // Calculate the distance between the circle's center and this closest point
    var distanceX = this.px - closestX;
    var distanceY = this.py - closestY;
    
    // If the distance is less than the circle's radius, an intersection occurs
    var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    if( distanceSquared < (circle.Radius * circle.Radius)){
      console.log("collided")
    };
      // console.log(this.distance)

  }

}
let isMoving = true;
const ball1 = new Ball(10);
ball1.createBall();

setInterval(() => {
  if (isMoving == true) {
      ball1.fallBricks()
      ball1.moveBall();
      ball1.boundaryCheck();
      ball1.currentPosition();
      ball1.mousePointer();
    }
  }, 1000 / 60);
  
