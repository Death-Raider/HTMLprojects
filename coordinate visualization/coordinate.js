//taking element properties from canvas
var c = document.getElementById("plane");
var ctx = c.getContext("2d");
//input from the rectangular coordinate input
var x = parseFloat(document.getElementById("rectangularPointX").value);
var y = parseFloat(document.getElementById("rectangularPointY").value);
var theta = parseFloat(document.getElementById("angle").value);
var r = parseFloat(document.getElementById("radius").value);
//global variables
var distance;
var polar = false;

refresh();
//active functions
function refresh(){
  //obtains the current height and width from the input box
  var height = document.getElementById("height").value;
  var width = document.getElementById("width").value;
  //updates the height and width of canvas
  document.getElementById("plane").height = height;
  document.getElementById("plane").width = width;
  //obtains the values from the input box for rectangular coordinates
  x = parseFloat(document.getElementById("rectangularPointX").value);
  y = parseFloat(document.getElementById("rectangularPointY").value);
  theta = parseFloat(document.getElementById("angle").value);
  r = parseFloat(document.getElementById("radius").value);
  // obtaining distance and angle
  distance = getDistance(x,y);
  angle = (x<0)?getAngle(x,y)+180:getAngle(x,y);
  var thetaRadian = degreeToRadian(theta);
  if(polar==true){
    x = r*Math.sin(thetaRadian)
    y = r*Math.cos(thetaRadian)
  }
  //updating the angle and distance(rectangular) in the disabled input box
  document.getElementById("rect-pol-radius").value = distance;
  document.getElementById("rect-pol-angle").value = angle;
  if(polar==true){
  document.getElementById("X-axis-polar").value = x;
  document.getElementById("Y-axis-polar").value = y;
  }
  distance = (polar==true)? r : distance;
  //plotting the given point
  ctx.beginPath();
  ctx.fillRect(c.width/2 + x*10 ,c.height/2 - y*10 ,1 ,1 ); //.fillRect(x,y,breadth,length)
  ctx.strokeStyle = "white";
  ctx.stroke();
  //joins the point and center of CIRCLE
  ctx.beginPath();
  ctx.moveTo(c.width/2,c.height/2);
  ctx.lineTo(c.width/2 + x*10 ,c.height/2 - y*10 );
  ctx.strokeStyle = "white";
  ctx.stroke();
  //calls the coordinate function
  coordinate();
}
function coordinate(){

  // makes a circle
  ctx.beginPath();
  ctx.arc(c.width/2,c.height/2,distance*10,0,2*Math.PI); // .arc(x,y,r,start angle,end angle)
  ctx.strokeStyle = "white";
  ctx.stroke();

  //making the X-axis
  ctx.beginPath();
  ctx.moveTo(c.width/2,c.height);
  ctx.lineTo(c.width/2,0);
  ctx.strokeStyle = "white";
  ctx.stroke();
  //making the Y-axis
  ctx.beginPath();
  ctx.moveTo(0,c.height/2);
  ctx.lineTo(c.width,c.height/2);
  ctx.strokeStyle = "white";
  ctx.stroke();
  //puts tick marks on the X,Y axis
  let num;
  num = (c.width>=c.height)? c.width : c.height ;
  for(let n = 0; n < num; n++){
    ctx.beginPath();
    ctx.font = "7px Arial";
    ctx.fillStyle = "white";
    ctx.fillRect(c.width/2+20*(n),c.height/2,1,2); //.fillRect(x,y,breadth,length)
    ctx.fillText(2*n,c.width/2+20*(n),c.height/2+10);

    ctx.fillRect(c.width/2-20*(n),c.height/2,1,2);
    ctx.fillText(-2*n,c.width/2-20*(n),c.height/2+10);

    ctx.fillRect(c.width/2,c.height/2-20*(n),-2,1);
    ctx.fillText(2*n,c.width/2-10,c.height/2-20*(n));

    ctx.fillRect(c.width/2,c.height/2+20*(n),-2,1);
    ctx.fillText(-2*n,c.width/2-10,c.height/2+20*(n));
    ctx.stroke();
  }
}
//passive functions
function rectangularTrue(){
  polar = false;
  refresh();
}
function polarTrue() {
  polar=true;
  refresh();
}
function getDistance(x,y){
  let p = x**2;
  let q = y**2;
  let dis = (p+q)**0.5;
  return dis;
}
function radianToDegree(x){
return x*(180/Math.PI);
}
function degreeToRadian(x){
  return x*(Math.PI/180);
}
function getAngle(x,y){
  return radianToDegree(arccot(y/x));
}
function arccot(x){
  return Math.PI / 2 - Math.atan(x);
}
