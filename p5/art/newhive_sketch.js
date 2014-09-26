/* an art by goode bye / 0x81c
 * i will sue u if u try to rip off my algorithms!!! hackers
 * haha jk
 * please donate to my life kickstarter
 * thanks
*/

var screen_width = window.innerWidth;
var screen_height = window.innerHeight;
var theta = 0;
var pressed = true;


function preload() {
  create_images();
}

function setup() {
  createCanvas(screen_width, screen_height);
}

function draw() {
  background(10, 10, 10);
  theta += Math.PI / 10;
  // var threshold = sin(theta);
  // var threshold = map(threshold, -1, 1, .4, .6);
  var threshold = map(abs(width / 2 - mouseX), 0, width / 2, 0, 1);
  create_collage(img5, img4, img, img_clone, threshold);
}

function create_collage(img1, img2, img3, ref_image, level) {
  ref_image.loadPixels();
  img1.loadPixels();
  img2.loadPixels();
  img3.loadPixels();

  var thresh = Math.floor(level * 255);

  for (var x = 0; x < ref_image.width * 4; x += 4) {
    for (var y = 0; y < ref_image.height; y += 1) {
      
      var r1 = ref_image.pixels[ref_image.width * 4 * y + x];
      var g1 = ref_image.pixels[ref_image.width * 4 * y + x + 1];
      var b1 = ref_image.pixels[ref_image.width * 4 * y + x + 2];
      var r2, g2, b2, r3, g3, b3;


      var grey = (0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1);
      var val;
      if (grey >= thresh) {
        var r2 = img2.pixels[img2.width * 4 * y + x];
        var g2 = img2.pixels[img2.width * 4 * y + x + 1];
        var b2 = img2.pixels[img2.width * 4 * y + x + 2];
        img1.pixels[img1.width * 4 * y + x] = r2;
        img1.pixels[img1.width * 4 * y + x + 1] = g2;
        img1.pixels[img1.width * 4 * y + x + 2] = b2;
        //console.log("white!!!");
      } else {
        var r3 = img3.pixels[img3.width * 4 * y + x];
        var g3 = img3.pixels[img3.width * 4 * y + x + 1];
        var b3 = img3.pixels[img3.width * 4 * y + x + 2];
        img1.pixels[img1.width * 4 * y + x] = r3;
        img1.pixels[img1.width * 4 * y + x + 1] = g3;
        img1.pixels[img1.width * 4 * y + x + 2] = b3;
      }
    }
  }
  img1.updatePixels();
  image(img1, 0, 0, screen_width, screen_height);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < screen_width && mouseY > 0 && mouseY < screen_height) {
    create_images();
  }
}

function create_images() {
  var image_1 = Math.floor(random(0, 28));
  var image_2 = Math.floor(random(0, 28));
  var image_3 = Math.floor(random(0, 28));
  var dir = ""
  img = loadImage(dir + image_1 + ".jpg");
  img_clone = loadImage(dir + image_2 + ".jpg");
  img4 = loadImage(dir + image_2 + ".jpg");
  img5 = loadImage(dir + image_3 + ".jpg");
}

function windowResized() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  resizeCanvas(screen_width, screen_height);
}

function grab_arts(number_of_arts) {
  var image_array = [];
  var img = loadImage("3.jpg");
  image_array.push(img);
  return image_array;
}