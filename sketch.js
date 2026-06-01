let currentStroke = [];
let shared;
let a = 5;

function preload() {
    partyConnect("wss://demoserver.p5party.org", "drawingthing");
    shared = partyLoadShared("globals", {allStrokes:[]});
}

function setup() {
  createCanvas(6000, 4000);
  background(220);
  if (!shared.allStrokes) {
    shared.allStrokes = [];
  }
}

function draw() {
  background(220);
  stroke(0);
  
  for (let i = 0; i < shared.allStrokes.length; i++) {
    let allSegments = shared.allStrokes[i];
    for (let j = 0; j < allSegments.length; j++) {
        let seg = allSegments[j];
        strokeWeight(seg[4]);
        line(seg[0], seg[1], seg[2], seg[3]);
    }
  }
  
  if (mouseIsPressed) {
    let vectorSegment = [pmouseX, pmouseY, mouseX, mouseY, a];
    currentStroke.push(vectorSegment);
    for (let j = 0; j < currentStroke.length; j++) {
        let seg = currentStroke[j];
        strokeWeight(seg[4]);
        line(seg[0], seg[1], seg[2], seg[3]);
    }
  }
}

function mouseWheel(event) {
  if (event.delta < 0) {
    if (a < 25) { a++; }
  } else {
    if (a > 1) { a--; }
  }
  return false;
}

function mousePressed() {
  currentStroke = []; 
}

function mouseReleased() {
  if (currentStroke.length > 0) {
    shared.allStrokes.push(currentStroke);
  }
}
