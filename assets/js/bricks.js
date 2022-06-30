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
  
  drawImg(ctx) {
    ctx.drawImage(this.image,this.posBrickX,this.posBrickY,this.height-40,this.width-40)
  }

  blankBlock(posBrickX,posBrickY,height,width){

    ctx.beginPath()
    ctx.rect(posBrickX,posBrickY,height,width)
    ctx.stroke();
    // ctx.rect(posBrickX,posBrickY,height,width);
    // ctx.fillStyle = "black";
    // ctx.fill();
   
  }

  incrementBlock(posBrickX,posBrickY,width,height,health){
    // ctx.rect(posBrickX,posBrickY,height,width)
    // ctx.stroke();
    ctx.beginPath();
    ctx.rect(posBrickX,posBrickY,height,width);
    ctx.strokeRect(posBrickX,posBrickY,height,width);
    ctx.strokeStyle = "black";
    //  text

    // ctx.rect(posBrickX,posBrickY,height,width)
    // ctx.stroke();
    // ctx.strokeStyle="gray";
    // ctx.beginPath()
    // ctx.strokeStyle="white";
    // ctx.clearRect(posBrickX,posBrickY,brickSize,brickSize);
    // ctx.rect(posBrickX,posBrickY,height,width);
    ctx.fillStyle = "gray";
    ctx.fill();



    this.textContent(posBrickX,posBrickY,health)
  }
  textContent(posBrickX,posBrickY,health){
    ctx.font = "20px Arial";
    ctx.fillText(health,posBrickX + spaceToCenter , posBrickY +spaceToCenter+20);
    ctx.fillStyle = "white";
  }
}

