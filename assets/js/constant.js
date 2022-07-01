const container = document.querySelector(".middle");
const topContainer = document.querySelector(".top");
const startScreen=document.querySelector(".start")
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
let tileMap = [

    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]

  ];

  var dx=1
  var dy=-1
  var ballPosition
  var brickPosX=[]
  var brickPosY=[]
  var health=0

  