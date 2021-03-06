import { getAngleDeg, tilemapfunc } from "./func.js";

export default class Collide{
    constructor(r=6){
        this.tileArr=[];
        this.ballArr=[];
        this.blankArr=[];
        this.ballX=0;
        this.ballY=0;                      
        this.r=r;
        this.valX=[];
        this.valY=[];
        this.fiveX=[];
        this.fiveY=[];
        this.fourX=[];
        this.fourY=[];
    }
    brickPos(){

        this.tileArr=tilemapfunc()
        for (let i=0;i<this.tileArr.length;i++){
            for (let j=0;j<this.tileArr[0].length;j++){

                if(this.tileArr[i][j]==5){

                    this.fiveX.push(j*brickSize);
                    this.fiveY.push(i*brickSize);
                } 
                if(this.tileArr[i][j]==4){
                    this.fourX.push(j*brickSize);
                    this.fourY.push(i*brickSize);
                }
            }
        }
    }

    
    moveBall(px,py){

        this.ballX=px;
        this.ballY=py;

        for(let i=0;i<this.fiveX.length;i++){
            this.collide(this.fiveX[i],this.fiveY[i]);
        }

    }
    
    collide(brickX,brickY){

        function clamp(val, min, max) {
            return Math.max(min, Math.min(max, val));
        }

        let closestX = clamp(this.ballX, brickX, brickX + brickSize);
        let closestY = clamp(this.ballY, brickY, brickY + brickSize);
        let distanceX = this.ballX - closestX;
        let distanceY = this.ballY - closestY;
        let distanceSquared = distanceX * distanceX + distanceY * distanceY;

        if (distanceSquared < this.r * this.r) {
            
            let abc=getAngleDeg(this.ballX,this.ballY,brickX,brickY);
            this.afterCollision(this.ballX,this.ballY,brickX,brickY,abc);
        }
    }

    afterCollision(px,py,brickX,brickY,angX){
        console.log(angX)
        if(px>=brickX && px<=brickX+brickSize){
            // console.log("tala bata hanyo")
            // dx = Math.cos(this.angX)*-1;
            
            dx=-1*dx
        }
        
        if(py>=brickY && py<=brickY+brickSize,angX){
            // console.log("side bata handyo")
            // dy = Math.sin(this.angX)*-1;

            dy=-1*dy;

        }
    }
}