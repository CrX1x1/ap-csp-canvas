let shared;
let me;
let others;
let picker;
function preload() {
    partyConnect("wss://demoserver.p5party.org", "drawingthing");
    shared = partyLoadShared("globals", {allStrokes:[]});
    me = partyLoadMyShared({ x: 200, y: 200 , r: 10, hue:0, sat:100, br: 100, currentStroke:[]});
    others = partyLoadGuestShareds()
}

function setup() {
  colorMode(HSB)
  picker = createColorPicker(color(me.hue, me.sat, me.br))
  picker.position(0,0)
  pickerLabel = createElement("p", "<== color picker")
  pickerLabel.position(50,-10)
  createCanvas(6000, 4000);
  background(220);
  if (!shared.allStrokes) {
    shared.allStrokes = [];
  }
}

function draw() {
  background(220);
  stroke(me.hue, me.sat, me.br);
  strokeWeight(me.r/2)
  circle(mouseX, mouseY, me.r/2);
  me.x = mouseX
  me.y = mouseY
  for (let i = 0; i < shared.allStrokes.length; i++) {
    let allSegments = shared.allStrokes[i];
    for (let j = 0; j < allSegments.length; j++) {
        let seg = allSegments[j];
        strokeWeight(seg[4]);
        stroke(seg[5],seg[6],seg[7]);
        line(seg[0], seg[1], seg[2], seg[3]);
    }
  }

  if (mouseIsPressed) {
    let vectorSegment = [pmouseX, pmouseY, mouseX, mouseY, me.r, me.hue, me.sat, me.br];
    me.currentStroke.push(vectorSegment);
    for (let j = 0; j < me.currentStroke.length; j++) {
        let seg = me.currentStroke[j];
        strokeWeight(seg[4]);
        stroke(seg[5],seg[6],seg[7]);
        line(seg[0], seg[1], seg[2], seg[3]);
    }
  }
  
  for (const o of others){
    stroke(o.hue,o.sat,o.br)
    strokeWeight(o.r/2)
    circle(o.x, o.y, o.r/2);
    if (o.currentStroke){
      for (let i = 0; i < o.currentStroke.length; i++){
          let seg = o.currentStroke[i]
          strokeWeight(seg[4]);
          line(seg[0], seg[1], seg[2], seg[3]);
      }
    }
  }
}

function mouseWheel(event) {
  if (event.delta < 0) {
    if (keyIsDown(SHIFT)) {
        me.hue += 5;
        if (me.hue > 360) me.hue = 0;
    } else if (keyIsDown(CONTROL)) {
      me.sat += 3;
    } else if (keyIsDown(ALT)) {
      me.br += 3
    } else {
      if (me.r < 25) { me.r++; }
    }
  } else {
    if (keyIsDown(SHIFT)) {
        me.hue -= 5;
        if (me.hue < 0) me.hue = 360;
    } else if (keyIsDown(CONTROL)) {
      me.sat -= 3;
    } else if (keyIsDown(ALT)) {
      me.br -= 3
    } else {
        if (me.r > 1) { me.r--; }
    }
  }
  me.sat = constrain(me.sat, 0, 100)
  me.br = constrain(me.br, 0, 100)
  return false;
}

function mousePressed() {
  me.currentStroke = []; 
}

function mouseReleased() {
  if (me.currentStroke.length > 0) {
    shared.allStrokes.push(me.currentStroke);
  }
  me.currentStroke = []
}
