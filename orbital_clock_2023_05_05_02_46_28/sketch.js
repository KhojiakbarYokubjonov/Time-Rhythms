/*
  author: Khojiakbar Yokubjonov
  date: 2/9/2023
  description: uses the Sun, the Earth and the Moon rotations to represent time.
*/


function setup() {
  createCanvas(600, 600);
  frameRate(30);
  // angleMode(DEGREES);
  lastSeconds = second();
  angle = 0;
  
}

function draw() {
  background(0);

  // noLoop();  
  
  let hr = hour();
  let mn = minute();
  let sc = second();
  stroke('rgb(245,238,10)');
  fill('rgb(255,205,0)');
  textSize(20);
 
  
  translate(300,300);
  // rotates the Earth and the Sun
  rotate((-180+lastSeconds*6+angle/5)*0.0174533);
  
  // draws the Sun
  circle(0,0,150);
  stroke("#03A9F4");
  fill("black");

  translate(0,250);
   // draws and rotates the Earth around its axis
  rotate(angle*3*0.0174533);
  fill("rgb(6,103,223)");
  circle(0,0, 53);
  stroke("#49FC07");
  fill("#49FC07")
  
  // adds leading zeroes to single digits
  if(hr % 12 < 10){
    text('0'+hr % 12,-9,-7);
  }else{
    text(hr % 12,-9,-7);
  }
  if(mn < 10){
    text('0'+mn,-9,20);
  }else{
    text(mn,-9,20);
  }
  
  // draws and rotates the Moon
  rotate(angle*9.3*0.0174533);
  fill("grey");
  stroke("grey");
  circle(0,43,3);
  
  
  // rotates the Moon around itself
  rotate(angle);
  angle+=1;
 
}