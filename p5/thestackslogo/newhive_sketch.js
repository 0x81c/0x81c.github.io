var screen_width;
var screen_height;
var baseRectWidth;
var baseRectHeight;

var cyan;
var magenta;
var yellow;
var black;


function setup() {
  screen_width = ceil(window.innerHeight);
  screen_height = ceil(window.innerHeight);
  createCanvas(screen_width, screen_height);
  baseRectWidth = width;
  baseRectHeight = height / 4;

  cyan = color(0, 215, 250);
  magenta = color(255, 0, 170);
  yellow = color(255, 243, 0);
  black = color(5, 5, 5);
}

function draw() {
  background(0, 0, 0);
  noStroke();
  rectMode(CENTER);

  translate(width / 2, height / 2);
  
  var theta = map(mouseX, 0, width, PI / 32, TWO_PI);
  var shrinkScale = map(mouseY, 0, height, .5, .9);
  
  push();

  for (var i = 0; i < 25; i++) {
    fill(black);
    rect(0, baseRectHeight * 1.5, baseRectWidth, baseRectHeight);
    fill(cyan);
    rect(0, baseRectHeight * .5, baseRectWidth, baseRectHeight);
    fill(yellow);
    rect(0, -baseRectHeight * .5, baseRectWidth, baseRectHeight);
    fill(magenta);
    rect(0, -baseRectHeight * 1.5, baseRectWidth, baseRectHeight);
    
    baseRectHeight *= shrinkScale;
    baseRectWidth *= shrinkScale;
    rotate(theta);
  }

  pop();
  
  baseRectWidth = width;
  baseRectHeight = height / 4;
}