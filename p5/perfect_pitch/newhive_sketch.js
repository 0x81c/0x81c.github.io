/* an art by goode bye / 0x81c
 * i will sue u if u try to rip off my algorithms!!! hackers
 * haha jk
 * please donate to my life kickstarter
 * thanks
*/

var screen_width = window.innerWidth;
var screen_height = window.innerHeight;
var osc, fft;

var gradient_c1, gradient_c1, text_color;
var Y_AXIS = 1;
var X_AXIS = 2;
var axis;

var mute = true;
var scale_from_a = ['A','A#/Bb','B','C','C#/Db','D','D#/Eb', 'E','F', 'F#/Gb', 'G','G#/Ab']

function setup() {
  createCanvas(screen_width, screen_height);

  gradient_c1 = color(150, 255, 255);
  gradient_c2 = color(157, 157, 157);
  text_color = color(255, 60, 0);

  axis = floor(random(1, 3));

  osc = new p5.SinOsc(); // set frequency and type
  osc.amp(0);

  fft = new p5.FFT();
  osc.start();

}

function draw() {
  textFont("Raleway");
  textSize(width / 11);
  textAlign(CENTER);

  background(255);
  setGradient(0, 0, width, height, gradient_c1, gradient_c2, axis);

  strokeWeight(width / 200);
  stroke(text_color);
  fill(text_color);

  var waveform = fft.waveform();  // analyze the waveform
  beginShape();
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], 0, 256, height * 3 / 4, 0);
    vertex(x, y);
  }
  endShape();
  if (!mute) {
    // change oscillator frequency based on mouseX
    var freq = map(mouseX, 0, width, 220, 880);
    osc.freq(freq);

    var amp = map(mouseY, 0, height, 1, .6);
    osc.amp(amp);

    var steps = halfsteps_from_middle_a(freq);
    var note = find_real_note_by_steps_from_middle_a(steps);
    var freq_deviation = hz_from_target_note(freq, steps);
    var formatted_deviation = format_deviation(freq_deviation);
    strokeWeight(1);
    textSize(width / 8);
    text(note, width / 2, height * 8 / 10);
    textSize(width / 20);
    if (formatted_deviation.length > 0) {
      text(formatted_deviation + "hz", width / 2, height * 9 / 10);
    }
    else {
      text("RIGHT ON!", width / 2, height * 7 / 8);
    }
  }
  else {
    osc.amp(0);
    strokeWeight(1);
    text("click to mute/unmute!", width / 2, height * 7 / 8);
  }
}

function halfsteps_from_middle_a(input_frequency) {
  return halfsteps = Math.round((12 * log(input_frequency / 440)) / log(2));
}

function find_real_note_by_steps_from_middle_a(steps) {
  var note_index;
  var scale_array_clone = scale_from_a.slice();

  if (steps < 0) {
    scale_array_clone = scale_array_clone.reverse();
    steps += 1;
  }
  
  note_index = abs(steps % 12);

  return scale_array_clone[note_index];
}

function hz_from_target_note(frequency, halfsteps_away) {
  var closest_note = 440 * Math.pow(2, halfsteps_away / 12);
  var deviation = closest_note - frequency;
  //console.log(deviation);
  return Math.round(deviation * 10) / 10;
}

function format_deviation(frequency) {
  if (frequency < 0.5 && frequency > -0.5) {
    return "";
  }
  else if (frequency <= 0) {
    return " +" + abs(frequency);
  }
  else {
    return " -" + abs(frequency);
  }
}

function mousePressed () {
  mute = !mute;
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
