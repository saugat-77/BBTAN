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
let ang=0
var dx=1
var dy=-1

var brickPosX=[]
var brickPosY=[]

var health=0

let tileMap = [

    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0] //khali chodepachi aaudaina 

  ];
// console.log(tileMap.length)


// const startScreen=document.querySelector(".start")
// const endScreen=document.querySelector(".end")

// document.addEventListener('click',start);

// function start(){
//     startScreen.classList.add('hide');
// console.log("1")
// }
// if (fail){
// endScreen.classList.remove("hide") // search how to remove a class i am confused syntax
// }