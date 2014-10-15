var screen_width;
var screen_height;

var low_color = 30;
var high_color = 255;

var gradient_c1, gradient_c2;
var Y_AXIS = 1;
var X_AXIS = 2;
var axis;
var spacing;
var maze_array;
var strawberry;

var maze_color;

function setup() {
  screen_width = ceil(window.innerWidth);
  screen_height = ceil(window.innerHeight);
  createCanvas(screen_width, screen_height);
  gradient_c1 = random_color();
  gradient_c2 = random_color();
  maze_color = random_color();
  axis = floor(random(1, 3));
  spacing = width / 40;
  maze_array = make_maze_array(spacing);
  strawberry = loadImage("strawberry.png")


}

function draw() {
  background(255);
  //draw gradient
  noSmooth();
  setGradient(0, 0, width, height, gradient_c1, gradient_c2, axis);
  //draw maze
  smooth();
  strokeWeight(width / 400);
  stroke(maze_color);
  draw_maze(maze_array);
}

function draw_maze(maze) {

  var radius = spacing / 2;

  for ( i = 0; i < maze.length; i++ ) {

    var local_line = maze[i];
    var max_y, min_y;

    if (local_line.y1 > local_line.y2) {
      min_y = local_line.y2;
      max_y = local_line.y1;
    } else {
      min_y = local_line.y1;
      max_y = local_line.y2;
    }
    if (mouseX > local_line.x1 - radius && mouseX < local_line.x2 + radius && mouseY > min_y - radius
      && mouseY < max_y + radius) {// && local_line.not_rolled_over) {
      line(local_line.x1, local_line.y2, local_line.x2, local_line.y1);
      //local_line
    } else {
      line(local_line.x1, local_line.y1, local_line.x2, local_line.y2);
    }
  }
}

function make_maze_array() {
  var local_maze_array = [];
  for (i = 0; i < width; i += spacing) {
    for (j = 0; j < height; j += spacing) {

      var local_line = {
        moused_over: false,
        x1: i,
        x2: i + spacing,
      };

      //dice roll!
      var high_or_low = floor(random(0.5, 1.5));
      if (high_or_low > 0) {
        local_line.y1 = j + spacing;
        local_line.y2 = j;
      } else {
        local_line.y1 = j;
        local_line.y2 = j + spacing;
      }
      local_maze_array.push(local_line);
    }
  }
  return local_maze_array;
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
    if (coin_toss === 0) {
      r = random_val(200, 255);
    } 
    else if (coin_toss == 1) {
      g = random_val(200, 255);
    }
    else if (coin_toss == 2) {
      b = random_val(200, 255);
    }
  }
  return color(r, g, b);
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
  screen_width = ceil(window.innerWidth);
  screen_height = ceil(window.innerHeight);
  resizeCanvas(screen_width, screen_height);
  loop();
}