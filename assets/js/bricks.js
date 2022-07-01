
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

   
  }

  incrementBlock(posBrickX,posBrickY,width,height,health){

    ctx.beginPath();
    ctx.rect(posBrickX,posBrickY,height,width);
    ctx.strokeRect(posBrickX,posBrickY,height,width);
    ctx.strokeStyle = "black";
   
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

