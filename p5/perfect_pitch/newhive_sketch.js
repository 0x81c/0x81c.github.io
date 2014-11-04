/* an art by goode bye / 0x81c
 * i will sue u if u try to rip off my algorithms!!! hackers
 * haha jk
 * please donate to my life kickstarter
 * thanks
*/

var screen_width = window.innerWidth;
var screen_height = window.innerHeight;
var osc, fft;
var scale_from_a = ['A','A#/Bb','B','C','C#/Db','D','D#/Eb', 'E','F', 'F#/Gb', 'G','G#/Ab']

function preload() {
  ear_girl = loadImage('ear.png');
}

function setup() {
  createCanvas(screen_width, screen_height);

  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(.5);

  fft = new p5.FFT();
  osc.start();
}

function draw() {
  background(255);

  image(ear_girl, width - ear_girl.width, height - ear_girl.height)

  var waveform = fft.waveform();  // analyze the waveform
  beginShape();
  strokeWeight(5);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], 0, 256, height, 0);
    vertex(x, y);
  }
  endShape();

  // change oscillator frequency based on mouseX
  var freq = map(mouseX, 0, width, 40, 880);
  osc.freq(freq);

  var amp = map(mouseY, 0, height, 1, .01);
  osc.amp(amp);

  var steps = halfsteps_from_middle_a(freq);
  console.log(steps);
  note = find_real_note_by_steps_from_middle_a(steps);
  textSize(width / 10);
  textAlign()
  text(note, width / 2, height / 2);
}

function halfsteps_from_middle_a(input_frequency) {
  return halfsteps = Math.round((12 * log(input_frequency / 440)) / log(2));
}

function find_real_note_by_steps_from_middle_a(steps) {
  var note_index = abs(steps % 12);
  return scale_from_a[note_index];
}