// x=[1,2,3,4,5,6,7]
// rand(1,6(this include eauta ball paune wala power also))   1 box is always khaliand this
// 9*7 ko block banam and mathi ko chai khalo hola

export default class Brick {
  constructor(posBrickX, posBrickY,imageNumber,  color="yellow", health, bricksize = 63) {
    this.posBrickX = posBrickX;
    this.posBrickY = posBrickY;
    this.color=color;
    this.health=health;
    this.image = new Image();
    this.image.src= `./assets/images/power${imageNumber}.png`
    this.height=bricksize;
    this.width=bricksize;
    this.temp=0
    this.bricksize = bricksize;
    
  }

  // image(fileName) {
  //   // console.log("1111111111111111111111111111111111111111111111 inside image in brick")
  //   const img = new Image();
  //   img.src = `assets/images/${fileName}`;
  //   // console.log(img.src)
  //   return img;
  // }
  incrementBlock(){
    
    
  }
  draw(ctx) {
    // this.setCanvasSize(canvas); //this doesnot work
    // this.drawMap(ctx);
    ctx.drawImage(this.image,this.posBrickX,this.posBrickY,this.height,this.width)
  }

  // drawMap(ctx) {
    // console.log("3 inside drawMap in brick")

  //   for (let row = 0; row < this.tileMap.length; row++) {
  //     for (let rowIndex = 0; rowIndex < this.tileMap[row].length; rowIndex++) {
  //       const tile = this.tileMap[row][rowIndex];
  //       let image = null;
  //       // console.log(this.tileMap.length)
  //       // console.log(this.tileMap[row].length)
        
  //       switch (tile) {
  //         case 0:
  //           // console.log(ctx.beginPath());

  //           // ctx.rect(
  //           //   row * this.bricksize,
  //           //   rowIndex * this.bricksize,
  //           //   this.bricksize,
  //           //   this.bricksize
  //           // );

  //           // ctx.stroke();
  //           // ctx.strokeStyle = "purple";
  //           break;
            
  //           case 1:
  //             image = this.avatar;
  //           // console.log("image1",image)
            
  //           break;
            
  //           case 2:
  //           // console.log(row,rowIndex)
            
  //         // console.log(ctx)
  //         // ctx.beginPath()
  //         // ctx.fillRect(
  //         //     row * this.bricksize,
  //         //     rowIndex * this.bricksize,
  //         //     this.bricksize,
  //         //     this.bricksize
  //         //   );
  //         //   ctx.stroke();
  //         //   ctx.strokeStyle = "red";
  //           // console.log(rowIndex)

  //           break;
  //       }

  //       if (image != null)
  //         ctx.drawImage(
  //           image,
  //           rowIndex * this.bricksize,
  //           row * this.bricksize,
  //           this.bricksize,
  //           this.bricksize
  //         );
  //     }
  //   }
  // }

  clearCanvas(canvas, ctx) {
    // console.log("thakisakey yaar")
    ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // setCanvasSize(canvas) {
  //   canvas.height = this.tileMap.length * this.bricksize;
  //   // console.log(this.bricksize)
  //   canvas.width = this.tileMap[0].length * this.bricksize;
  //   // console.log(canvas.width)
  // }
}
// const brick1 = new Brick();
// console.log(brick1.setCanvasSize())
