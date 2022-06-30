import Brick from "./bricks.js";
import Ball from "./ball.js"

const ball2=new Ball(canvas,ctx)


export default class BrickController {
    
  constructor(canvas) {
    this.canvas = canvas;
    this.brickRow = [];
    this.bricksize = brickSize;
    this.createBrick(tileMap);
    this.r=6;
    this.val1=0;
    this.val2=0;
    this.row = 0;
    this.rowindex = 0;
    // tileMap 
    // console.log(tileMap)
    //   console.log(this.color)
  }

  draw(canvas, ctx) {
    // this.setCanvasSize(canvas)
    this.drawMap(ctx);
  }

  createBrick(tileMap) {


    tileMap.forEach((row, rowIndex) => {

      this.brickRow[rowIndex] = [];
      row.forEach((brickNum, brickIndex) => {

        //brickIndex is column jaha brick huncha
        if (brickNum > 0) {
          // 0 is blank space
          if(brickNum>0 &&brickNum<5){

          this.brickRow[rowIndex].push(
            new Brick(rowIndex*brickSize+spaceToCenter,brickIndex*brickSize+spaceToCenter, brickNum)
          )};
        }
      });
    });
  }

  // drawMap(brick1,ctx)

    drawMap(ctx) {

      for (let rowNo = 0; rowNo < tileMap.length; rowNo++) {
        for (let colNum = 0; colNum < tileMap[rowNo].length; colNum++) {
          const tile = tileMap[rowNo][colNum];
          // console.log("comment",tile)
          this.brickRow.flat().forEach((brick) => {           
          switch(tile){
        
            case 0:
              {
                brick.blankBlock(rowNo*this.bricksize,colNum*this.bricksize,this.bricksize,this.bricksize)
                break;
              }

              case 5:{
                brickPosX.push(rowNo*this.bricksize)
                brickPosY.push(colNum*this.bricksize)
                brick.incrementBlock(colNum*this.bricksize,rowNo*this.bricksize,this.bricksize,this.bricksize,health)
                break;
              }         

          default :{
         
        if(tile==1 || tile==2||tile==3||tile==4 ||tile==5){
            brick.drawImg(ctx);
            // if(tile==1 || tile==2||tile==3||tile==4){
            //   const ball2= new Ball()
            //   ball2.collide(rowNo*this.bricksize,colNum*this.bricksize)
            // }

        }
        break;

      }
    }  
    });
    }
    }

    // return[brickPosX,brickPosY]
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
    

    // setCanvasSize(canvas) {

    // canvas.height = tileMap.length * this.bricksize+this.bricksize;
    // canvas.width = tileMap[0].length * this.bricksize;

    // }


// const brick1 = new Brick();
// console.log(brick1.setCanvasSize())


// tilemapfunc()
// tilemapfunc()
