import BrickController from "./brickController.js"; 
import Brick from "./bricks.js"; 

const tileMap = new Brick();
const brickController=new BrickController(canvas)

// let val=color()

function gameLoop() {
  // console.log(canvas.width)
  // console.log(canvas.height)
  // console.log(ctx.clearRect(0,0,canvas.containerHeight,canvas.containerWidth))
  brickController.draw(canvas, ctx);
  // console.log(tileMap.draw(canvas, ctx))
  // ctx.fillStyle="orange";
  // ctx.clearRect(0,0,canvas.height,canvas.width)
  // console.log( ctx.clearRect(0,0,canvas.height,canvas.width))
}
setInterval(gameLoop, 1000 / 60);
