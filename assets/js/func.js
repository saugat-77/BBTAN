import BrickController from "./brickController.js";

const abcd=new BrickController(canvas,ctx)
function rand(max,min){
    return Math.floor(Math.random()*(max-min)+min)
  }

function getAngleDeg(ax,ay,bx,by) {
  let angleRad = Math.atan((ay-by)/(ax-bx));
  let angleDeg = angleRad * 180 / Math.PI;
  return(angleDeg);
}
// let x=0

function getDistance(xA, yA, xB, yB) { 
  // y+=1
  let xDiff=0;
  let yDiff=0;
	xDiff = xA - xB; 
	yDiff = yA - yB;
  
  // let ang=Math.abs(yDiff)/Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  // console.log(Math.sin(ang))

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  // console.log(y)
}

function color(){
  let colors = [
    "red",
    "blue",
    "red",
    "green",
    "yellow",
    "orange",
    "purple",
    "white",
    "brown",
    "grey",
  ];
  let x=rand(10,1)
 return(colors[x])
}

function arr(){
  let arra=[], count=0
  tempvar+=1
  
  if(tempvar%10==0){
    arra.push(5,5,5,5)
  }

  else{
    for (let i=0; i<tileMap.length-4 ;i++){
      let x=rand(0,6)  
      if(x==2 || x==3 || x==4) {
        count+=1; //2
        if(count==2){
          arra.push(0)
          continue;
        }
        if(count>=3){
          arra.push(5)
          continue;
        }
      }
      if(x==1){
        arra.push(0)
      } 
      else{
        arra.push(x)   
      }  
    }
    
  }
  arra.push(1,0,5)  
  // console.log(arra)
  let ctr = arra.length, temp, index;

  while (ctr > 0) {
  // Pick a random index
      index = Math.floor(Math.random() * ctr);
      ctr--;
  // And swap the last element with it
      temp = arra[ctr];
      arra[ctr] = arra[index];
      arra[index] = temp;
  }
  return arra
}
// arr()


function tilemapfunc(){
  for (let i = tileMap.length-1 ; i >=0; i--) {
      if (i == tileMap.length - 1) {
        // for (let d=0;d<tileMap[i].length;d++){
        //   // console.log(tileMap[d])
          tileMap[i] = [];
        // }
      } else {
        tileMap[i + 1] = tileMap[i];
      }
    }
    tileMap[0] =[0, 0, 0, 0, 0, 0, 0]
    tileMap[1] = arr();
    // abcd.draw(canvas,ctx)
    // console.log(tileMap);
    return tileMap
  }
tilemapfunc()
export {tilemapfunc}