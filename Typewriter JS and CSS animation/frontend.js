var i = 0;
var speed = 80; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  var txt = document.getElementById("written").value; /* The text */
  var em = document.getElementById("test");
  var temp = window.getComputedStyle(em).getPropertyValue("opacity");
  if(temp == 1){
    if (i < txt.length) {
      document.getElementById("demo").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
}
