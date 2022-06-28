import BrickController from "./brickController.js"; 
import Brick from "./bricks.js"; 
import Ball from "./ball.js"

// const tileMap = new Brick();
// const brickController=new BrickController(canvas,tileMap)
const brickController=new BrickController(canvas)
const ball1 =new Ball(canvas,canvas.height,canvas.width)
console.log(brickController)
// ball1.createBall();


setInterval(() => {
  if (isMoving == true) {
    // ball1.fallBricks();
    ball1.moveBall();
    ball1.boundaryCheck();
    // ball1.currentPosition();
    // ball1.mousePointer();
  }
}, 1000 / 120);

function gameLoop() {
  brickController.draw(canvas, ctx);
  ball1.drawBot(ctx);
  ball1.createBall();  
}
setInterval(gameLoop, 1000 / 60);
