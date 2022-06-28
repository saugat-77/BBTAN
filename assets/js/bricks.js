// x=[1,2,3,4,5,6,7]
// rand(1,6(this include eauta ball paune wala power also))   1 box is always khaliand this
// 9*7 ko block banam and mathi ko chai khalo hola

export default class Brick {
  constructor(posBrickX, posBrickY,imageNumber,  color="yellow", health) {
    this.posBrickX = posBrickX;
    this.posBrickY = posBrickY;
    this.color=color;
    this.health=health;
    this.image = new Image();
    this.image.src= `./assets/images/power${imageNumber}.png`
    this.height=brickSize;
    this.width=brickSize;
    this.temp=0
    this.bricksize = brickSize;
    
  }

  // image(fileName) {
  //   // console.log("1111111111111111111111111111111111111111111111 inside image in brick")
  //   const img = new Image();
  //   img.src = `assets/images/${fileName}`;
  //   // console.log(img.src)
  //   return img;
  // }
  
  drawImg(ctx) {

    ctx.drawImage(this.image,this.posBrickX,this.posBrickY,this.height-40,this.width-40)
  }

  powerBlock(posBrickX,posBrickY,height,width){

    ctx.rect(posBrickX,posBrickY,height,width)
    ctx.stroke();
    ctx.rect(posBrickX,posBrickY,height,width);
    ctx.strokeRect(posBrickX,posBrickY,height,width);
    ctx.strokeStyle = "purple";

    //text
    // ctx.font = "20px Arial";
    // // console.log(posBrickY/63,posBrickX/63)
    // ctx.fillText(this.posBrickX + this.width -70,
    //   this.posBrickY + this.height -40
    // );
    // ctx.fillStyle = "black";

    
  }

  incrementBlock(posBrickX,posBrickY,width,height,health){
    // ctx.rect(posBrickX,posBrickY,height,width)
    // ctx.stroke();
    // ctx.rect(posBrickX,posBrickY,height,width);
    // ctx.strokeRect(posBrickX,posBrickY,height,width);
    // ctx.strokeStyle = "green";
    //  text

    ctx.font = "20px Arial";
    ctx.fillText(health,posBrickX + spaceToCenter , posBrickY +spaceToCenter+20);
    ctx.fillStyle = "black";
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
  //   canvas.height = this.tileMap.length * this.bricksize+this.bricksize;
  //   // console.log(this.bricksize)
  //   canvas.width = this.tileMap[0].length * this.bricksize;
  //   // console.log(canvas.width)
  // }
}
// const brick1 = new Brick();
// console.log(brick1.setCanvasSize())
