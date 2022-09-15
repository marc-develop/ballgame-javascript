console.log("Hello World");

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;
//c.lineWidth= 5;
//c.globalAlpha = 0.5;
var grav = 2;
var speedLimit = 5;
var minBallSize = 15;
var numOfBalls = 50;
var radiusReduceFactor = 0.5;
var speedIncrFactor = 2;
var numOfSplitBalls = 2;

c.strokeWidth = 5;

var mousex = 0;
var mousey = 0;

var clickx = 0;
var clicky = 0;

addEventListener("mousemove", function (event) {
  mousex = event.clientX;
  mousey = event.clientY;
});

addEventListener("click", function (event) {
  clickx = event.clientX;
  clicky = event.clientY;
});


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

class Ball {
  color;
  radius;
  x;
  y;
  dy;
  dx;
  vel;

  constructor(color, radius, x, y, dy, dx, vel) {
    this.color = color;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.vel = vel;
  }

  isHit(x, y) {
    if (x > this.x - this.radius &&
      x < this.x + this.radius &&
      y > this.y - this.radius &&
      y < this.y + this.radius) {
      return true;
    }
    return false;
  }

  calculate() {
    if( this.dy > speedLimit ) {
      this.dy = speedLimit;
    }
    if( this.dy < -speedLimit ) {
      this.dy = -speedLimit;
    }
    if( this.dx > speedLimit ) {
      this.dx = speedLimit;
    }
    if( this.dx < -speedLimit ) {
      this.dx = -speedLimit;
    }
    this.y += this.dy;
    this.x += this.dx;
    if (this.y + this.radius >= ty && this.dy > 0) {
      this.dy = -this.dy * grav;
    } else if (this.y - this.radius < 0 && this.dy < 0) {
      this.dy = -this.dy
    }
    else {
      this.dy += this.vel;
    }
    if (this.x + this.radius > tx || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
  }

  update() {
    if ( this.radius < minBallSize ){
      this.radius = minBallSize;
    }
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  };
}


function getRandomBall() {
  var color = randomColor();
  var radius = Math.random() * 20 + 14;
  var x = Math.random() * (tx - radius * 2) + radius;
  var y = Math.random() * (ty - radius);
  var dy = Math.random() * 2;
  var dx = Math.round((Math.random() - 0.5) * 10);
  var vel = Math.random() / 5;
  return new Ball(color, radius, x, y, dy, dx, vel);
}

function getSplitBalls(parentBall, numOfNewBalls) {
  var splitBalls = [];
  var directionInd = 1;
  for (let i = 0; i < numOfNewBalls; i++) {
    if ( i % 2 == 0 ){
      directionInd = 1
    }else{
      directionInd = -1
    }
    var color = randomColor();
    var radius = parentBall.radius * radiusReduceFactor;
    if ( radius < minBallSize ) {

      radius = minBallSize;
    }
    var x = parentBall.x + parentBall.radius * getRandomInt(0.5, 1) * directionInd ;
    var y = parentBall.y + parentBall.radius * getRandomInt(0.5, 1) * directionInd ;
    var dy = parentBall.dy * speedIncrFactor * getRandomInt(0.5 , 1) * directionInd ;
    var dx = parentBall.dx * speedIncrFactor * getRandomInt(0.5 , 1) * directionInd ;
    var vel = parentBall.vel;
    splitBalls.push(new Ball(color, radius, x, y, dy, dx, vel));
  }
  return splitBalls;
}

var bal = [];
for (var i = 0; i < numOfBalls; i++) {
  bal.push(getRandomBall());
}


function animate() {
  if (tx != window.innerWidth || ty != window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = tx;
    canvas.height = ty;
  }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, tx, ty);
  for (var i = 0; i < bal.length; i++) {
    bal[i].update();
    bal[i].calculate();
    if ( bal[i].isHit(clickx, clicky ) && bal[i].radius >= minBallSize  ) {
      bal = bal.concat(getSplitBalls(bal[i], numOfSplitBalls));
      bal.splice(i, 1);
      clickx = 0;
      clicky = 0;
    }
  }
}

animate();
