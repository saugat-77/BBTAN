function rand(max,min){
    return Math.floor(Math.random()*(max-min)+min)
  }

function getAngleDeg(ax,ay,bx,by) {
  var angleRad = Math.atan((ay-by)/(ax-bx));
  var angleDeg = angleRad * 180 / Math.PI;
  return(angleDeg);
}

function getDistance(xA, yA, xB, yB) { 
	var xDiff = xA - xB; 
	var yDiff = yA - yB;
	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
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
    "pink",
    "brown",
    "grey",
  ];
  let x=rand(10,1)
 return(colors[x])
}
function arr(){
  let arra=[]
  for (let i=0; i<tileRowLen-2 ;i++){
    let x=rand(0,6)   
    if(x==1){
      arra.push(0)
    } 
    else{
      arra.push(x)   
    }  
  }
  arra.push(1,0)
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
  // console.log(arra)
  return arra

}
arr()