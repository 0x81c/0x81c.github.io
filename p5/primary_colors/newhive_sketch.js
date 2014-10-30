/* an art by goode bye / 0x81c
 * i will sue u if u try to rip off my algorithms!!! hackers
 * haha jk
 * please donate to my life kickstarter
 * thanks
*/

var screen_width = 1080;
var screen_height = 720;
var red, yellow, blue;
var triangle_max_length = screen_width / 42;
var triangle_inc_length = triangle_max_length / 20;
var frames;
var anim_length;
var triangles = [];
var frame_count = 0;
var num_of_prev_frames = 0;
var chosen_pixels;
var triangles;
var rach;

function preload() {
  frames = loadSequence(1);
}

function setup() {
  createCanvas(screen_width, screen_height);
  chosen_pixels = choosePixels();
  triangles = createTriangles(chosen_pixels);
  anim_length = frames.length;
}

function draw() {
  chosen_pixels = choosePixels();
  triangles = createTriangles(chosen_pixels);

  image(frames[frame_count], 0, 0, width, height);

  for (var i = 0; i < chosen_pixels.length; i++) {
    chosen_pixel = chosen_pixels[i];
    var x = chosen_pixel.x;
    var y = chosen_pixel.y
    var pixel_color = get(x, y);
    pixel_color[3] = 255;

    noStroke;
    push();
    fill(pixel_color, 255);
    noStroke();
    translate(x, y);
    var tri = triangles[i];

    for (var key in tri) {
      if (tri.hasOwnProperty(key)) {
        if (key !== "rot") {
          //tri[key] = tri[key] + ceil(random(-triangle_inc_length, triangle_inc_length));
        }
      }
    }


    rotate(tri.rot);
    triangle(tri.x1, tri.y1, tri.x2, tri.y2, tri.x3, tri.y3);
    pop();
  }

  num_of_prev_frames += 1;
  frame_count += 1;
  if (frame_count % anim_length === 0) {
    console.log("frame count: " + frame_count);
    frames = loadSequence(num_of_prev_frames);
    frame_count = 0;
  }
  save("rach_" + pad(num_of_prev_frames, 5) + ".jpg")
}

function createTriangles(pixel_array) {
  var chosen_triangles = [];
  for ( i = 0; i < pixel_array.length; i++ ) {
    var chosen_triangle = {
      x1: random(-triangle_max_length, triangle_max_length),
      y1: random(-triangle_max_length, triangle_max_length),
      x2: random(-triangle_max_length, triangle_max_length),
      y2: random(-triangle_max_length, triangle_max_length),
      x3: random(-triangle_max_length, triangle_max_length),
      y3: random(-triangle_max_length, triangle_max_length),
      rot: random(TWO_PI)
    }
    chosen_triangles[i] = chosen_triangle;
  }
  return chosen_triangles;
}

function choosePixels() {
  var pixel_array = [];
  for (var i = 0; i <= screen_width * 7; i++) {
    var pix_x = floor(random(screen_width));
    var pix_y = floor(random(screen_height));
    pixel_array[i] = {x: pix_x, y: pix_y};
  }
  return pixel_array;
}

function loadSequence(start_frame) {
  image_sequence = [];
  for (i = start_frame; i < 51 + start_frame; i++) {
    image_sequence[i - start_frame] = loadImage("rachel/out_" + pad(i, 5) + ".jpg");
    console.log(image_sequence[i - start_frame]);
  }
  return image_sequence;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
