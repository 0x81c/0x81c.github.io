var screen_width;
var screen_height;
var fruit_pix;
var fruits;

function preload() {
	fruit_pix = [loadImage("0.png"), loadImage("1.png"), loadImage("2.png")];
}

function setup() {
  screen_width = ceil(window.innerWidth);
  screen_height = ceil(window.innerHeight);
  createCanvas(screen_width, screen_height);
  fruits = create_all_fruits(floor(random(75, 100)), fruit_pix);
}

function draw() {
	for (i = 0; i < fruits.length; i++) {
		var fruit = fruits[i];
		push();
		translate(fruit.x, fruit.y);
		rotate(fruit.rot);
		image(fruit.pic, 0, 0, fruit.w, fruit.h);
		pop();
		fruit.rot += Math.PI / 30;
	}
}

function mousePressed() {
	fruits.push(create_single_fruit(fruit_pix, mouseX, mouseY));
}

function create_all_fruits(number_of_fruits, fruit_pictures) {
	var fruit_array = []
	for (i = 0; i < number_of_fruits; i++) {
		fruit_array.push(create_single_fruit(fruit_pictures));
	}
	return fruit_array;
}

function create_single_fruit(fruit_pictures, mouse_x, mouse_y) {

	var fruit_x;
	var fruit_y;
	var fruit_w = random(width / 2);
	var fruit_h = random(width / 2);

	if (mouse_x) {
		fruit_x = mouse_x - (fruit_w / 2);
		fruit_y = mouse_y - (fruit_h / 2);
		console.log("mouse!!!")
	} 
	else {
		fruit_x = random(width);
		fruit_y = random(height);
	}

	var fruit = {
		x : fruit_x,
		y : fruit_y,
		w : fruit_w,
		h : fruit_h,
		rot : floor(random(2 * Math.PI)),
		pic: fruit_pictures[floor(random(fruit_pictures.length))]
	};

	console.log(fruit.x);
	return fruit;
}

function random_pos(axis) {
  if (axis == "x") {
    return floor(random(0, width));
  }
  else if (axis == "y") {
    return floor(random(0, height));
  }
}

function windowResized() {
  screen_width = ceil(window.innerWidth);
  screen_height = ceil(window.innerHeight);
  resizeCanvas(screen_width, screen_height);
}