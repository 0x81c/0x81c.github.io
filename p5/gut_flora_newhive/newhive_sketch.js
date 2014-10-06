var screen_width = window.innerWidth;
var screen_height = window.innerHeight;

var low_color = 30;
var high_color = 255;

var gradient_c1, gradient_c2;
var Y_AXIS = 1;
var X_AXIS = 2;
var axis;
var spacing;

function setup() {
  createCanvas(screen_width, screen_height);
  gradient_c1 = random_color();
  gradient_c2 = random_color();
  axis = Y_AXIS;
  spacing = width / 30
}

function draw() {
  background(255);

  //draw gradient
  strokeWeight(1);
  setGradient(0, 0, width, height, gradient_c1, gradient_c2, axis);
  //draw maze

  strokeWeight(width / 400);
  stroke(random_color());

  for (i = 0; i < width; i += spacing) {
    for (j = 0; j < height; j += spacing) {
      var high_or_low = floor(random(.5, 1.5));
      if (high_or_low > 0) {
        line(i, j + spacing, i + spacing, j);
      } else {
        line(i, j, i + spacing, j + spacing);
      }
    }
  }
  noLoop();
}



function random_color() {
  function random_val() {
    return random(low_color, high_color);
  }
  var r, g, b;
  r = random_val();
  g = random_val();
  b = random_val();

  var threshold = 50;

  if (r < threshold && g < threshold && b < threshold) {
    var coin_toss = floor(random(0,3));
    if (coin_toss == 0) {
      r = random_val(200, 255);
    } 
    else if (coin_toss == 1) {
      g = random_val(200, 255);
    }
    else if (coin_toss == 2) {
      b = random_val(200, 255);
    }
  }
  return color(r, g, b)
}

function random_pos(axis) {
  if (axis == "x") {
    return floor(random(0, width));
  }
  else if (axis == "y") {
    return floor(random(0, height));
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

function windowResized() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  resizeCanvas(screen_width, screen_height);
}