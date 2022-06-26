// x=[1,2,3,4,5,6,7]
// rand(1,6(this include eauta ball paune wala power also))   1 box is always khaliand this
// 9*7 ko block banam and mathi ko chai khalo hola

import Brick from "./bricks.js";
export default class BrickController {

  tileMap = [
    //brickNum=0,1,2
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 2, 0, 3], //brickIndex=brick position
    [0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  constructor(canvas, bricksize = 63) {
    this.canvas = canvas;
    this.brickRow = [];
    this.bricksize = bricksize;
    this.createBrick();
    this.row = 0;
    this.rowindex = 0;
    //   console.log(this.color)
  }

  draw(canvas, ctx) {
    this.setCanvasSize(canvas)
    this.drawMap(ctx);
  }

  createBrick() {

    this.tileMap.forEach((row, rowIndex) => {

      this.brickRow[rowIndex] = [];
      row.forEach((brickNum, brickIndex) => {

        //brickIndex is column jaha brick huncha
        if (brickNum > 0) {
          // 0 is blank space
          this.brickRow[rowIndex].push(
            new Brick(brickIndex * 50, rowIndex * 32, brickNum)
          );
        }
      });
    });
  }


    drawMap(ctx) {
    // console.log("3 inside drawMap in brick")

    for (let row = 0; row < this.tileMap.length; row++) {
        for (let rowIndex = 0; rowIndex < this.tileMap[row].length; rowIndex++) {

          const tile = this.tileMap[row][rowIndex];
          
          this.brickRow.flat().forEach((brick) => {
          switch(tile){
            
            case 0:{
                brick.incrementBlock()
                break;
            }

          default :
            //   console.log(tile)
        if(tile==1 || tile==2||tile==3||tile==4){
            brick.draw(ctx);
        }
    }  });
    }
        }
        
  

    // for (let row = 0; row < this.tileMap.length; row++) {
    //   for (let rowIndex = 0; rowIndex < this.tileMap[row].length; rowIndex++) {
    //     const tile = this.tileMap[row][rowIndex];
    //     let image = null;
    //     // console.log(this.tileMap.length)
    //     // console.log(this.tileMap[row].length)
        
    //     switch (tile) {
    //       case 0:
    //         // console.log(ctx.beginPath());

    //         // ctx.rect(
    //         //   row * this.bricksize,
    //         //   rowIndex * this.bricksize,
    //         //   this.bricksize,
    //         //   this.bricksize
    //         // );

    //         // ctx.stroke();
    //         // ctx.strokeStyle = "purple";
    //         break;
            
    //         case 1:
    //           image = this.avatar;
    //         // console.log("image1",image)
            
    //         break;
            
    //         case 2:
    //         // console.log(row,rowIndex)
            
    //       // console.log(ctx)
    //       // ctx.beginPath()
    //       // ctx.fillRect(
    //       //     row * this.bricksize,
    //       //     rowIndex * this.bricksize,
    //       //     this.bricksize,
    //       //     this.bricksize
    //       //   );
    //       //   ctx.stroke();
    //       //   ctx.strokeStyle = "red";
    //         // console.log(rowIndex)

    //         break;
    //     }

    //     if (image != null)
    //       ctx.drawImage(
    //         image,
    //         rowIndex * this.bricksize,
    //         row * this.bricksize,
    //         this.bricksize,
    //         this.bricksize
    //       );
    //   }
    // }
  }
    

    setCanvasSize(canvas) {
    canvas.height = this.tileMap.length * this.bricksize;
    // console.log(this.bricksize)
    canvas.width = this.tileMap[0].length * this.bricksize;
    // console.log(canvas.width)
    }
}

// const brick1 = new Brick();
// console.log(brick1.setCanvasSize())
