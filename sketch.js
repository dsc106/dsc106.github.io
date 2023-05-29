let angleInc = 12;
let angleMotionSpeed = 0.3;

let ellipseW = 28 * 0.6; // scaled down to fit 150x150
let ellipseH = 56 * 0.6; // scaled down to fit 150x150

let angle = 0;
let angleStart = 0;
let canDraw = true;

let mode = true;

let leftPart, rightPart;

const strokeColor = "white"; //"#faf9f5"
const mobiusColor = "royalblue";

function setup() {
  let canvas = createCanvas(150, 150);
  canvas.parent("p5Sketch");

  leftPart = createGraphics(width / 2, height);
  rightPart = createGraphics(width / 2, height);

  leftPart.ellipseMode(CENTER);
  rightPart.ellipseMode(CENTER);

  leftPart.stroke(strokeColor);
  rightPart.stroke(strokeColor);

  leftPart.background("rgba(250,249,245,0)");
  rightPart.background("rgba(250,249,245,0)");
}

function draw() {
  background("rgba(250,249,245,0)"); // made the background transparent

  canDraw = true;
  angle = angleStart;
  mode = true;

  while (canDraw == true) {
    let x = cos(radians(angle)) * 56 * 0.6 + width / 2; // scaled down to fit 150x150
    let y = sin(radians(angle)) * 56 * 0.6 + height / 2; // scaled down to fit 150x150

    let rotation = -radians(angle) * 0.5;

    if (mode) {
      leftPart.fill(mobiusColor);
      rightPart.fill(mobiusColor);
    } else {
      leftPart.fill(mobiusColor);
      rightPart.fill(mobiusColor);
    }

    if (angle <= 360) {
      leftPart.push();
      leftPart.translate(x, y);
      leftPart.rotate(rotation);
      leftPart.ellipse(0, 0, ellipseW, ellipseH);
      leftPart.pop();
    }

    if (angle <= 540) {
      rightPart.push();
      rightPart.translate(x - width / 2, y);
      rightPart.rotate(rotation);
      rightPart.ellipse(0, 0, ellipseW, ellipseH);
      rightPart.pop();
    }

    angle += angleInc;
    mode = !mode;

    if (angle > 540) canDraw = false;
  }

  image(leftPart, 0, 0);
  image(rightPart, width / 2, 0);

  angleStart -= angleMotionSpeed;
}

function keyPressed() {
  if (key == "a") {
    save("wan-logo.svg");
  }
}
