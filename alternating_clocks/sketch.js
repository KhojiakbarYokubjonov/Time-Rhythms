
/**
  author: Khojiakbar Yokubjonov
  date: 5/4/2023
  description: displays the current time in two different creative ways.
  One of them uses gears to represent time while the other uses the rotations of the Sun, the Earth and the Moon.
  
  IMPORTANT:
    if the clocks don't switch turns, please, just rerun the program.
*/

const TIME_LENGTH = 10; // clocks will switch every 10 seconds
let toothCount = 15;
let toothHeight = 15;
// let color = 'white'
let color2 = '#6b6a69'
let speed1 = 0;
let speed2 = 0;
let speed3 = 0;



let speed4 = 0;
let speed5 = 0;
let gearM;

let h,m,c = 0;
let gearMotion;
let counter = 0

let switchClocks = true;
let timeDiff;
let backgroundImage;
let interstellarMusic;
let stars = []
function preload(){
    gearMotion = loadSound('gear-sound2.mp3');
  gearMotion.setVolume(0.05)
  interstellarMusic = loadSound('interstellar.mp3');
  interstellarMusic.setVolume(0.13);
  
  
  backgroundImage = loadImage('milky_way.jpg');
  

}

function setup() {
  createCanvas(600, 600);
  frameRate(30); 
  // angleMode(DEGREES);
  h = hour()
  m = minute()
  s = second()
  gearM = new Gear(15, 2, 'blue', 17); // c, h, color, size
  
  timeDiff = second();
  
  // variables for the orbital clock
   lastSeconds = second();
  angle = 0;

  
}

function draw() {
  let currentSecond = second()
  
  if(currentSecond - timeDiff > TIME_LENGTH ){
    switchClocks = !switchClocks;
    timeDiff = second()
    // clear();
    console.log('switching clocks')
  }
  if(switchClocks){
    interstellarMusic.stop()
    displayGears();
  }else{
    gearMotion.stop()
    if(!interstellarMusic.isPlaying()){
      interstellarMusic.play();
    }
    drawOrbitalClock()    
  }
  
  
  

  
}
function mousePressed(){
  if(switchClocks){
    let c = getRandomColor();
  gearM.setColor(c);
  }

  
  
}

function drawOrbitalClock() {
  push()
  background(backgroundImage);
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
  
  pop()
 
}



function drawStar( x,  y,  radius1,  radius2,  npoints) {
   angle = TWO_PI / npoints;
   halfAngle = angle/2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
     sx = x + cos(a) * radius2;
     sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape();
  
}

function displayGears(){
  textSize(30);
  
  background(220);
  
  //  plays gear motion sound continuously
  if(!gearMotion.isPlaying()){
    gearMotion.play();
  }

  drawBackgroundGears()
  drawHourGear()
  drawMinuteGear()
  mouseGear()
}




function mouseGear(){
  push()
  translate(mouseX, mouseY);
  gearM.setTransparency(30);
  gearM.draw()
  
  pop()
}

function getRandomColor() {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let c = color(r,g,b);
  return c;
}

/**
    draws a gear to represent current hour
*/
function drawHourGear(){
  //   hour
   push()
  translate(width/3 - 5, height/3 + 35)
  rotate(speed4)
  if(hour() != h){
    h = hour()
    speed4 += 0.2
  }
  
  let gear4 = new Gear(13, 5, '#FFC000', 40); // c, h, color, size
   gear4.setText(h, -15,10, true);
  gear4.draw()
  pop()
}


/**
    draws a gear to represent minutes
*/
function drawMinuteGear(){
   //   minute
   push()
  translate(width/2 - 26.5, height/2 + 89)
  rotate(speed5)
  if(minute() != m){
    m = minute();
    speed5 += 0.2
    
  }
  let gear5 = new Gear(13, 5, '#3A5311', 35); // c, h, color, size
  gear5.setText(m, -18,10, true);
  gear5.draw()
 
  pop()
}



/**
    draws the background gears
*/
function drawBackgroundGears(){
  // top gear
  push()
  translate(width/3 -5, height/3 +35)
  point(0,0, 5)
   rotate(speed1)
  
  speed1+= 0.01;
  let gear1 = new Gear(22, 10, '#BEBEBE', 100); // c, h, color, size
  gear1.draw()
  pop()
  
  
  // gear at the bottom left
  push()
  translate(width/2 - 26.5, height/2 + 89)
  point(0,0, 5)
   rotate(speed2)
  speed2-= 0.0147;
  let gear2 = new Gear(15, 10, '#BEBEBE', 70); // c, h, color, size
  gear2.draw()
  pop()
  
  
  // gear at the bottom right
  push()
  translate(width/2 + 100, height/2+104);
  rotate(speed3)
  speed3 += 0.0170
  let gear3 = new Gear(13, 9, '#BEBEBE', 55); // c, h, color, size
  gear3.draw()
  pop()
}








class Gear{
  
  constructor(toothCount, toothHeight,gearColor, size){
    this.toothCount = toothCount;
    this.toothHeight = toothHeight;
    this.gearColor = gearColor;
    this.size = size;
    this.isTimeVisible = false;
    this.text;
    this.innerColor = 'white';
    
  }
  setText(text, x,y, isVisible){
    this.text = text;
    this.isTimeVisible = isVisible;
    this.x = x;
    this.y = y;
  }
  
  setColor(newColor){
    this.gearColor = newColor;
  }
  
  setTransparency(value){
    this.innerColor = color(255,255,255,value);
  }
  
  draw(){
    
    stroke(0);
    strokeWeight(2);
    fill(this.gearColor);
    beginShape();
    let radius = 0;
    for(let angle=0; angle<=TWO_PI; angle+=0.01) {
      let waveAngle = angle * this.toothCount;
     radius = this.size + this.toothHeight * sin(waveAngle);
      
    // gives the gear teeth a square shape
    radius += this.toothHeight/1.6 * 0.25 * sin(3 * waveAngle);
      let x = 0 + radius * cos(angle);
      let y = 0 + radius * sin(angle);
      vertex(x, y);
    }
    endShape();
    fill(this.innerColor)
    ellipse(0, 0, radius* 1.4,radius*1.4);
    if(this.isTimeVisible){
      fill(this.gearColor);      
      text(this.text, this.x,this.y);
    }
  }
}
