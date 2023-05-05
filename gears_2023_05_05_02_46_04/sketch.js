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
function preload(){
    gearMotion = loadSound('gear-sound2.mp3');
  gearMotion.setVolume(0.05)

}

function setup() {
  createCanvas(400, 400);
  frameRate(30); 
  // angleMode(DEGREES);
  h = hour()
  m = minute()
  s = second()
  gearM = new Gear(15, 2, 'blue', 17); // c, h, color, size

  
}

function draw() {
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

function mouseClicked(){
  let c = getRandomColor();
  gearM.setColor(c);
  // gearM.draw()

  
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
  translate(width/3 - 10, height/3 - 10)
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
  translate(width/3 - 10, height/3 - 10)
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
