const container = document.getElementsByClassName("middle");
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");


const containerHeight = 565;
const containerWidth = 455;
const brickSize=63;
const spaceToCenter=20;
const tileRowLen=7;
canvas.height=565;
canvas.width=441;
let tempvar=0
let isMoving = true;

let tileMap = [
    [0, 0, 0, 0, 0, 0, 0],//brickIndex=brick position
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1] //khali chodepachi aaudaina 

    // arr(),arr() ,arr(),arr(),arr(),arr(), arr()  //brickNum=0,1,2
  ];
// console.log(tileMap.length)

function tilemapfunc(){
for (let i = tileMap.length-1 ; i >=0; i--) {
    if (i == tileMap.length - 1) {
      tileMap[i] = [];
    } else {
      tileMap[i + 1] = tileMap[i];
    }
  }
  tileMap[0] = arr();}