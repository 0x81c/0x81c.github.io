var number_of_quads = 13;
var number_of_points = 4;
var Quads = [];

//set up gradient things
var Y_AXIS = 1;
var X_AXIS = 2;
var axis;
var gradient_c1, gradient_c2;

//set up vals for random calculations
var low_color = 30;
var high_color = 255;
var low_thick = 8;
var high_thick = 30;
var shake = 10;

//audio stuff
var input;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  createQuads();

  //gradient
  gradient_c1 = random_color();
  gradient_c2 = random_color();
  axis = floor(random(1, 3));

  //audio
  input = new p5.AudioIn();

  input.start();

  console.log(input);
}

function draw() {
  background(255);

  //get audio volume and map
  var vol = input.getLevel(.999) * 10;
  //var vol = 1;

  //draw gradient
  setGradient(0, 0, width, height, gradient_c1, gradient_c2, axis);

  //draw quads
  for (quad_num = 0; quad_num < Quads.length; quad_num++) {
    var p = Quads[quad_num].points.slice(0);

    for (i = 0; i <= p.length; i++) {
      if (i % 2 != 0) {
        var x = p[i - 1];
        var y = p[i];
        var x_rel_to_center = x - width / 2;
        var y_rel_to_center = y - height / 2;
        var clamped_volume
        if (vol > 1) {
          clamped_volume = 1;
        } else {
          clamped_volume = vol;
        }
        var adjusted_x = width / 2 + (x_rel_to_center * (1 - clamped_volume));
        var adjusted_y = height / 2 + (y_rel_to_center * (1 - clamped_volume));
        p[i - 1] = adjusted_x + random(-shake, shake);
        p[i] = adjusted_y + random(-shake, shake);
      }
    }

    strokeWeight(Quads[quad_num].thickness);
    if (vol < 0.1) {
      vol = 0;
    }
    var adjusted_color = Quads[quad_num].line_color;
    var r = red(adjusted_color) * (1 - vol);
    var g = green(adjusted_color) * (1 - vol);
    var b = blue(adjusted_color) * (1 - vol);
    var adjusted_color = color(r, g, b);
    stroke(adjusted_color);
    quad(p[0], p[1], p[4], p[5], p[2], p[3], p[6], p[7]);
  }
}

function createQuads() {

  for (quad_num = 0; quad_num < number_of_quads; quad_num++) {
    
    Quads[quad_num] = {
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
      Quads[quad_num].points[coordinate] = random_pos(axis);
    }

    var thickness = random(low_thick, high_thick);
    var line_color = random_color();

    Quads[quad_num].thickness = thickness;
    Quads[quad_num].line_color = line_color;
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
  createQuads();
  gradient_c1 = random_color();
  gradient_c2 = random_color();
  axis = floor(random(1,3));
}