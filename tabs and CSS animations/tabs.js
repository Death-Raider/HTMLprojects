document.getElementById("zero").click();
function openCity(evt,cityName) {
  // Declare all variables
if(document.getElementById("load").style.display == "none" || cityName == "slide0" ){
  let i, tabcontent, tablinks;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabinside");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
}
function sayItOutLoud(id){
  var message = document.getElementById(id).value;
  var speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 0.8;
  window.speechSynthesis.speak(speech);
}
function popup(){
  for(let i = 0; i < 5; i++){
    window.open("index.html","_blank","height=200,width=500");
  }
}
function showPage() {
  document.getElementById("load").style.display = "none";//stops showing the cube
  document.getElementById("LoadingTxt").style.display = "none";//stops showing the cube
  document.getElementById("hold").style.display = "block";//shows the div tag with id="hold"
}
function removeAnimation(){
  document.getElementById("hold").style.animationName = "none";//removes text animation
}
function loadWebpage(){
  document.getElementById("load").style.top="200px";
  setTimeout(showPage, 6000);//removes the loading cube and shows the text
  setTimeout(removeAnimation,8000);//removes the text animation for good
}
