import BrickController from "./brickController.js"; 
import Brick from "./bricks.js"; 
import Ball from "./ball.js"
const brickController=new BrickController(canvas)
const ball1 =new Ball(canvas,ctx)
// export default ball1

// const tileMap = new Brick();
// const brickController=new BrickController(canvas,tileMap)
// console.log(brickController)
// ball1.createBall();


 function ballLoop(){
   requestAnimationFrame(ballLoop)

   if (isMoving == true) {
    ball1.moveBall();
    ball1.boundaryCheck(canvas);
    // ball1.currentPosition();
  }
}
ballLoop()
// console.log(ball1.createBall());  

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  brickController.draw(canvas, ctx);
  ball1.drawBot(ctx);
  ball1.createBall(); 
  requestAnimationFrame(gameLoop)
  
}
gameLoop()