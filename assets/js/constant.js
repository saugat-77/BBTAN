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