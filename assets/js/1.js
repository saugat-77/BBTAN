import BrickController from "./brickController.js"; 
import Brick from "./bricks.js"; 
import Ball from "./ball.js"

// const tileMap = new Brick();
// const brickController=new BrickController(canvas,tileMap)
const brickController=new BrickController(canvas)
const player =new Ball(canvas,3)
// const brick 
// const ball
// let val=color()

function gameLoop() {
  brickController.draw(canvas, ctx);
  player.drawBot(ctx)
  
}
setInterval(gameLoop, 1000 / 60);
