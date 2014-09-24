var screen_width = window.innerWidth;
var screen_height = window.innerHeight;

var number_of_squiggles = 13;
var number_of_points = 3;
var curves = [];

var low_color = 30;
var high_color = 255;

var low_thick = 8 / 580 * screen_width ;
var high_thick = 30 / 580 * screen_width;
var shake = 10 / 580 * screen_width;

var gradient_c1, gradient_c2;
var Y_AXIS = 1;
var X_AXIS = 2;
var axis;

function setup() {
  createCanvas(screen_width, screen_height);
  createCurves();
  gradient_c1 = random_color();
  gradient_c2 = random_color();
  axis = floor(random(1, 3));
}

function draw() {
  background(255);

  //draw gradient
  setGradient(0, 0, width, height, gradient_c1, gradient_c2, axis);

  for (squiggle = 0; squiggle < curves.length; squiggle++) {
    var p = curves[squiggle].points
    strokeWeight(curves[squiggle].thickness);
    stroke(curves[squiggle].line_color);
    bezier(p[0], p[1], mouseX + random(-shake, shake), mouseY + random(-shake, shake), p[4], p[5], p[2], p[3]);
  }
}


function createCurves() {

  for (squiggle = 0; squiggle < number_of_squiggles; squiggle++) {
    
    curves[squiggle] = {
      "points":[],
      "line_color":0,
      "thickness":0,
    };

    for (coordinate = 0; coordinate < number_of_points * 2; coordinate++) {
      var axis;
      if (coordinate % 2 == 0) {
        axis = "x";
      }
      else {
        axis = "y";
      }
      curves[squiggle].points[coordinate] = random_pos(axis);
    }

    var thickness = random(low_thick, high_thick);
    var line_color = random_color();

    curves[squiggle].thickness = thickness;
    curves[squiggle].line_color = line_color;

    strokeWeight(thickness);
    stroke(line_color);
  }
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

function mousePressed() {
  createCurves();
  gradient_c1 = random_color();
  gradient_c2 = random_color();
  axis = floor(random(1,3));
}