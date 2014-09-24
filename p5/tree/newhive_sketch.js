//lines!!!!!
var drawing_line = false;
var line_exists = false;
var lines = [];

//colors!!!
var low_color = 30;
var high_color = 255;

//rule for squiggles (in pixels)
//this is the best variable name in human history
var squiggle_threshold = 5;
var pen_shake = 3;

//rectangles!!!!
var start_rect, end_rect;
var rect_width = 50;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  start_rect = { x : width / 2 - rect_width / 2, 
    y : height * 3 / 4 - rect_width / 2,
    w : rect_width,
    h : rect_width
  };

  end_rect = { x : width / 2 - rect_width / 2, 
    y : height / 4 - rect_width / 2,
    w : rect_width,
    h : rect_width
  };
}

function draw() {
  background(255)

  fill(0, 0, 0, 125);
  rect(start_rect.x, start_rect.y, start_rect.w, start_rect.h);
  rect(end_rect.x, end_rect.y, end_rect.w, end_rect.h);

  stopDrawingCheck();

  if (drawing_line) {
    //create new line!!
    var old_line = lines[lines.length - 1];
    var new_line = {
      x1 : old_line.x2,
      y1 : old_line.y2,
      x2 : mouseX,
      y2 : mouseY
    }

    var new_line_length = sqrt(abs(new_line.x2 - new_line.x1) ^ 2 + abs(new_line.y2 - new_line.y1) ^ 2);

    if ( new_line_length > squiggle_threshold ) {
      //break up lines somehow???
    }
    else {
      new_line.x1 = new_line.x1 + random(-pen_shake, pen_shake);
      new_line.y1 = new_line.y1 + random(-pen_shake, pen_shake);
      new_line.x2 = new_line.x2 + random(-pen_shake, pen_shake);
      new_line.y2 = new_line.y2 + random(-pen_shake, pen_shake);
    }
    //add new line to array
    lines[lines.length] = new_line;
  }

  if (line_exists) {
    //iterate over line array and draw them all!!!
    for ( i = 0; i < lines.length; i++ ) {
      stroke(0);
      strokeWeight(5);
      line(lines[i].x1 + random(-pen_shake, pen_shake), lines[i].y1 + random(-pen_shake, pen_shake), 
        lines[i].x2 + random(-pen_shake, pen_shake), lines[i].y2 + random(-pen_shake, pen_shake));
    }
  }
}

function mousePressed() {
  var mouse_pos = { x : mouseX, y : mouseY};
  if (inside_rect(mouse_pos, start_rect)) {
    drawing_line = !drawing_line;
    initializeLine(mouseX, mouseY);
  }
}

function initializeLine(x, y) {
  //this is just so the computer has something to draw relative to after the
  //rect has been pressed dumbmy!!

  lines[0] = {
    x1 : x,
    y1 : y,
    x2 : x,
    y2 : y,
  }

  line_exists = true;
}

function stopDrawingCheck() {
  var mouse_pos = { x : mouseX, y : mouseY };
  if (inside_rect(mouse_pos, end_rect)) {
    var last_rect = lines[lines.length]
    lines[length] = { x1 : end_rect.x + end_rect.w / 2, y1 : end_rect.y + end_rect.h / 2 , x2 : end_rect.x + end_rect.w / 2, y2 : end_rect.y + end_rect.h / 2}
    drawing_line = false;
  }
}

function inside_rect(position, rectangle) {
  if (position.x > rectangle.x && position.x < rectangle.x + rectangle.w 
    && position.y > rectangle.y && position.y < rectangle.y + rectangle.w)  {
    return true;
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