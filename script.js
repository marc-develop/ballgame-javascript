console.log("Hello World");

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var tx = window.innerWidth;
var ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;
//c.lineWidth= 5;
//c.globalAlpha = 0.5;

var mousex = 0;
var mousey = 0;

var clickx = 1000;
var clicky = 1000;

addEventListener("mousemove", function(event) {
  mousex = event.clientX;
  mousey = event.clientY;
});

addEventListener("click", function(event) {
  clickx = event.clientX;
  clicky = event.clientY;
});


var grav = 0.99;
c.strokeWidth=5;
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

function Ball() {
  this.color = randomColor();
  this.radius = Math.random() * 20 + 14;
  this.x = Math.random() * (tx - this.radius * 2) + this.radius;
  this.y = Math.random() * (ty - this.radius);
  this.dy = Math.random() * 2;
  this.dx = Math.round((Math.random() - 0.5) * 10);
  this.vel = Math.random() /5;
  this.update = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
    //c.stroke();
  };
}

var bal = [];
// for (var i=0; i<50; i++){
//     bal.push(new Ball());
// }

bal.push(new Ball());
bal[bal.length-1].x = tx / 2;
bal[bal.length-1].y = ty / 2;
bal[bal.length-1].dy = Math.random() * 2;
bal[bal.length-1].dx = Math.round((Math.random() - 0.5) * 10);
bal[bal.length-1].vel = Math.random() /5;
bal[bal.length-1].radius = ty/3;


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
    bal[i].y += bal[i].dy;
    bal[i].x += bal[i].dx;
    if (bal[i].y + bal[i].radius >= ty) {
      bal[i].dy = -bal[i].dy * grav;
    } else {
      bal[i].dy += bal[i].vel;
    }    
    if(bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0){
        bal[i].dx = -bal[i].dx;
    }
   if( clickx > bal[i].x - bal[i].radius && 
          clickx < bal[i].x + bal[i].radius &&
          clicky > bal[i].y - bal[i].radius &&
          clicky < bal[i].y + bal[i].radius ){
           bal.push(new Ball(), new Ball());
           bal[bal.length-2].radius = bal[i].radius / 2;
           bal[bal.length-1].radius = bal[i].radius / 2;
           bal[bal.length-2].x = bal[i].x ;
           bal[bal.length-1].x = bal[i].x ;
           bal[bal.length-2].y = bal[i].y ;
           bal[bal.length-1].y = bal[i].y ;
           bal[bal.length-2].dx = bal[i].dx ;
           bal[bal.length-1].dy = bal[i].dy ;
           bal[bal.length-2].vel = bal[i].vel
           bal[bal.length-1].vel = bal[i].vel
          //  bal[bal.length-2].color = bal[i].color
          //  bal[bal.length-1].color = bal[i].color
           bal.splice(i,1);
           clickx = 0;
           clicky = 0;
          }
      
    //forloop end
    }
//animation end
}

animate();
