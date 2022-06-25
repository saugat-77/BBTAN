// x=[1,2,3,4,5,6,7]
// rand(1,6(this include eauta ball paune wala power also))   1 box is always khaliand this
// 9*7 ko block banam and mathi ko chai khalo hola

export default class Brick {
  constructor(bricksize=63) {
    this.bricksize = bricksize;
    this.avatar = this.image("avatar.webp");
    this.black = this.image("black.webp");
    this.ballsArray = [];

    // 0-black
    // 1-avatar
    this.tileMap = [
      [2,2,2,2,2,2,2],
      [0,1,0,1,0,1,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
      [2,2,2,2,2,2,2],
      [1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0],
    ];
    // this.levelMap = [
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    // ];
  }
  createRect(){
    ctx.beginPath();
    ctx.rect(20, 20, this.bricksize,this.bricksize);
    ctx.stroke();
  }

  image(fileName) {
    // console.log("1111111111111111111111111111111111111111111111 inside image in brick")
    const img = new Image();
    img.src = `assets/images/${fileName}`;
    // console.log(img.src)
    return img;
  }

  draw(canvas, ctx) {
    // console.log("2 inside draw in brick")

    this.setCanvasSize(canvas); //this doesnot work
    this.clearCanvas(canvas, ctx);
    this.drawMap(ctx);
  }

  drawMap(ctx) {
    // console.log("3 inside drawMap in brick")

    for (let row = 0; row < this.tileMap.length; row++) {
      for (let column = 0; column < this.tileMap[row].length; column++) {
        const tile = this.tileMap[row][column];
        let image = null;
        switch (tile) {
          case 0:
            ctx.beginPath();
            ctx.rect(row*this.bricksize, column*this.bricksize, this.bricksize,this.bricksize);
            ctx.stroke();
            ctx.strokeStyle = "purple";
            break;

          case 1:
            image = this.avatar;
            // console.log("image1",image)

          break;
          
            case 2:
            ctx.fillRect( column*this.bricksize, row*this.bricksize, this.bricksize,this.bricksize)
            break;

        }

        if (image != null)
          ctx.drawImage(
            image,
            column * this.bricksize,
            row * this.bricksize,
            this.bricksize,
            this.bricksize
          );
      }
    }
  }

  clearCanvas(canvas, ctx) {
    // console.log("thakisakey yaar")
    ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  setCanvasSize(canvas) {
    canvas.height = this.tileMap.length * this.bricksize;
    const a=canvas.height
    // console.log(this.bricksize)
    canvas.width = this.tileMap[0].length * this.bricksize;
    // console.log(canvas.width)

  }

  
}
const brick1 = new Brick();
// console.log(brick1.setCanvasSize())
