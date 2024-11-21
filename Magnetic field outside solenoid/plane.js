//taking element properties from canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var resolution;
var xZoom;
var yZoom;
var decimalSpaceing;//number of decimal points

cartesianPlane();

function cartesianPlane(){

  var current = parseFloat(document.getElementById("current").value);//amperes
  var corePerm = parseFloat(document.getElementById("perm").value);
  var length = parseFloat(document.getElementById("length").value);//in meters
  var turnCountTotal = parseFloat(document.getElementById("turns").value);
  var radius = parseFloat(document.getElementById("radius").value);//in meters

  console.log(radius,turnCountTotal,length,corePerm,current);


  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,c.width,c.height);

  //inputs from website
  resolution = document.getElementById("resolution").value;
  //making the X-axis
  ctx.beginPath();
  ctx.moveTo(c.width/2,c.height);
  ctx.lineTo(c.width/2,0);
  ctx.stroke();
  //making the Y-axis
  ctx.beginPath();
  ctx.moveTo(0,c.height/2);
  ctx.lineTo(c.width,c.height/2)
  ctx.stroke();
  //puts tickmarks on the X,Y axis

  let num;
  num = (c.width >= c.height)? c.width : c.height ;
  decimalSpaceing = 0;
  while(resolution > Math.floor(resolution)){
    decimalSpaceing++;
    resolution = resolution*10;
  }
  resolution = resolution/(10**(decimalSpaceing))

  xZoom = 10*decimalSpaceing+15;//space between tickmarks for x axis
  yZoom = 10*decimalSpaceing+15;//space between tickmarks for y axis

  for(let n = 0; n < num; n++){

    ctx.beginPath();
    ctx.font = "7px Arial";
    ctx.fillStyle = "black";
    ctx.fillRect(c.width/2+xZoom*(n),c.height/2,1,2); //.fillRect(x,y,breadth,length)
    ctx.fillText((resolution*n).toFixed(decimalSpaceing),c.width/2+xZoom*(n),c.height/2+10);

    ctx.fillRect(c.width/2-xZoom*(n),c.height/2,1,2);
    ctx.fillText((-resolution*n).toFixed(decimalSpaceing),c.width/2-xZoom*(n),c.height/2+10);

    ctx.fillRect(c.width/2,c.height/2-yZoom*(n),-3,-1);
    ctx.fillText((resolution*n).toFixed(decimalSpaceing),c.width/2,c.height/2-yZoom*(n));

    ctx.fillRect(c.width/2,c.height/2+yZoom*(n),-3,-1);
    ctx.fillText((-resolution*n).toFixed(decimalSpaceing),c.width/2,c.height/2+yZoom*(n));

    ctx.stroke();
  }
  for(let x = -1; x < 1; x += 0.00001){
    joinPoint(
      x-0.00001,
      magneticField(x-0.00001,x-0.00001,x-0.00001,radius,turnCountTotal,length,corePerm,current),
      x,
      magneticField(x,x,x,radius,turnCountTotal,length,corePerm,current)
    );
  }
}
function point(x,y){
  //plotting the given point
  ctx.beginPath();
  ctx.fillRect(c.width/2 + x*xZoom/resolution ,c.height/2 - y*yZoom/resolution ,1 ,1 ); //.fillRect(x,y,breadth,length)
  ctx.stroke();
}
function joinPoint(x1,y1,x2,y2){
  ctx.beginPath();
  ctx.moveTo(c.width/2 + x1*xZoom/resolution,c.height/2 - y1*yZoom/resolution);
  ctx.lineTo(c.width/2 + x2*yZoom/resolution,c.height/2 - y2*yZoom/resolution);
  ctx.stroke();
}
function magneticField(x,y,z,radius,turnCountTotal,length,corePerm,current){
  let relativePerm = 4*Math.PI*10**-7;
  let turnsPerUnitLength = turnCountTotal/length;
  let area = Math.PI*(radius**2);
  let p = (relativePerm*turnsPerUnitLength*current*area*corePerm/Math.PI);

  let num1 = 4*(Math.pow(x,2) + Math.pow(y,2)) + Math.pow(Math.pow((length+2*z),2),(3/2))
  let num2 = 4*(Math.pow(x,2) + Math.pow(y,2)) + Math.pow(Math.pow((length-2*z),2),(3/2))

  return -1*p*( (length+2*z)/(num1)+ (length-2*z)/(num2) );
}
