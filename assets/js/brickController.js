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
    
  }

  draw(ctx) {
    this.drawMap(ctx);
  }

  createBrick(tileMap) {


    tileMap.forEach((row, rowIndex) => {

      this.brickRow[rowIndex] = [];
      row.forEach((brickNum, brickIndex) => {

        if (brickNum > 0) {
          if(brickNum>0 &&brickNum<5){

          this.brickRow[rowIndex].push(
            new Brick(rowIndex*brickSize+spaceToCenter,brickIndex*brickSize+spaceToCenter, brickNum)
          )};
        }
      });
    });
  }


    drawMap(ctx) {

      for (let rowNo = 0; rowNo < tileMap.length; rowNo++) {
        for (let colNum = 0; colNum < tileMap[rowNo].length; colNum++) {
          const tile = tileMap[rowNo][colNum];
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
            // brick.drawImg(ctx);

        }
        break;

      }
    }  
    });
    }
    }

  }
  
  }