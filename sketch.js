let shared;
let me;
let others;
function preload() {
    partyConnect("wss://demoserver.p5party.org", "drawingthing");
    shared = partyLoadShared("globals", {allStrokes:[]});
    me = partyLoadMyShared({ x: 200, y: 200 , r: 10, c: "black", currentStroke:[]});
    others = partyLoadGuestShareds()
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
  strokeWeight(me.r/2)
  circle(mouseX, mouseY, me.r/2);
  me.x = mouseX
  me.y = mouseY
  for (let i = 0; i < shared.allStrokes.length; i++) {
    let allSegments = shared.allStrokes[i];
    for (let j = 0; j < allSegments.length; j++) {
        let seg = allSegments[j];
        strokeWeight(seg[4]);
        line(seg[0], seg[1], seg[2], seg[3]);
    }
  }

  if (mouseIsPressed) {
    let vectorSegment = [pmouseX, pmouseY, mouseX, mouseY, me.r];
    me.currentStroke.push(vectorSegment);
    for (let j = 0; j < me.currentStroke.length; j++) {
        let seg = me.currentStroke[j];
        strokeWeight(seg[4]);
        line(seg[0], seg[1], seg[2], seg[3]);
    }
  }
  
  for (const o of others){
    strokeWeight(o.r/2)
    circle(o.x, o.y, o.r/2);
    if (others.currentStroke){
      for (let i = 0; i < o.currentStroke.length; i++){
          seg = o.currentStroke[i]
          strokeWeight(seg[4]);
          line(seg[0], seg[1], seg[2], seg[3]);
      }
    }
  }
}

function mouseWheel(event) {
  if (event.delta < 0) {
    if (me.r < 25) { me.r++; }
  } else {
    if (me.r > 1) { me.r--; }
  }
  return false;
}

function mousePressed() {
  me.currentStroke = []; 
}

function mouseReleased() {
  if (me.currentStroke.length > 0) {
    shared.allStrokes.push(me.currentStroke);
  }
}
