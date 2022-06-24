import Brick from "./bricks.js"; 

const tileMap = new Brick();

function gameLoop() {
    // console.log("this might be ")
  tileMap.draw(canvas, ctx);
}
setInterval(gameLoop, 1000 / 60);