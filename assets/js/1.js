import BrickController from "./brickController.js"; 
import Ball from "./ball.js"

const brickController=new BrickController(canvas)
const ball1 =new Ball(canvas,ctx)


 function ballLoop(){
   requestAnimationFrame(ballLoop)

   if (isMoving == true) {
    ball1.moveBall();
    ball1.boundaryCheck(canvas);
  }
}
ballLoop()

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  brickController.draw(ctx);
  ball1.drawBot(ctx);
  ball1.createBall(); 
  requestAnimationFrame(gameLoop) 
}

gameLoop()