// x=[1,2,3,4,5,6,7]
// rand(1,6(this include eauta ball paune wala power also))   1 box is always plus 
// 9*7 ko block banam and mathi ko chai khalo hola

import Brick from "./bricks.js";
export default class BrickController {

  constructor(canvas) {
    this.canvas = canvas;
    this.brickRow = [];
    this.bricksize = brickSize;
    this.createBrick(tileMap);
    this.row = 0;
    this.rowindex = 0;
    // tileMap 
    // console.log(tileMap)
    //   console.log(this.color)
  }

  draw(canvas, ctx) {
    this.setCanvasSize(canvas)
    this.drawMap(ctx);
  }
  createArr(){
    let arr=[]
    for (let i=0;i<tileRowLen;i++){

      arr.push[1,5]

    }

  }
  createBrick(tileMap) {

    // for (let i=7;i>0;i--){
    //   tileMap[i]=tileMap[i-1]
    // }


    // tileMap[0]=tileMap[1]
    // tileMap[1]=tileMap[2]
    // tileMap[2]=tileMap[3]
    // console.log(tileMap)

    tileMap.forEach((row, rowIndex) => {

      this.brickRow[rowIndex] = [];
      row.forEach((brickNum, brickIndex) => {

        //brickIndex is column jaha brick huncha
        if (brickNum > 0) {
          // 0 is blank space
          if(brickNum>0 &&brickNum<5){

          this.brickRow[rowIndex].push(
            new Brick(brickIndex*brickSize+spaceToCenter, rowIndex*brickSize+spaceToCenter, brickNum)
          )};
        }
      });
    });
  }


    drawMap(ctx) {
      // console.log(tileMap)
    // console.log("3 inside drawMap in brick")
      
    for (let row = 0; row < tileMap.length; row++) {
        for (let rowIndex = 0; rowIndex < tileMap[row].length; rowIndex++) {
          const tile = tileMap[row][rowIndex];
          this.brickRow.flat().forEach((brick) => {

          switch(tile){
  
            case 0:
              {
                brick.blankBlock(rowIndex*this.bricksize,row*this.bricksize,this.bricksize,this.bricksize)
                break;
              }

              case 5:{
                brick.incrementBlock(rowIndex*this.bricksize,row*this.bricksize,this.bricksize,this.bricksize,10)
                break;
              }

          default :{

        if(tile==1 || tile==2||tile==3||tile==4){
          
            brick.drawImg(ctx);
        }
        break;

      }
    }  
    });
    }
    }
        
  

    // for (let row = 0; row < tileMap.length; row++) {
    //   for (let rowIndex = 0; rowIndex < tileMap[row].length; rowIndex++) {
    //     const tile = tileMap[row][rowIndex];
    //     let image = null;
    //     // console.log(tileMap.length)
    //     // console.log(tileMap[row].length)
        
    //     switch (tile) {
    //       case 0:
    //         // console.log(ctx.beginPath());

            // ctx.rect(
            //   row * this.bricksize,
            //   rowIndex * this.bricksize,
            //   this.bricksize,
            //   this.bricksize
            // );

            // ctx.stroke();
            // ctx.strokeStyle = "purple";
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

    canvas.height = tileMap.length * this.bricksize+this.bricksize;
    canvas.width = tileMap[0].length * this.bricksize;

    }
}

// const brick1 = new Brick();
// console.log(brick1.setCanvasSize())
