import Brick from "./bricks.js"; 

const tileMap = new Brick();

function gameLoop() {
    // console.log("this might be ")
    ctx.clearRect(0,0,canvas.clientHeight,canvas.width)
  tileMap.draw(canvas, ctx);
}
setInterval(gameLoop, 1000 / 60);