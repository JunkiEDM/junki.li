var status = 'pause';
var duration;
var music = document.getElementsByClassName('music')[0];
var playB = document.getElementsByClassName('play')[0]; 
var pauseB = document.getElementsByClassName('pause')[0]; 
// music.addEventListener("timeupdate", ending());
function ending() {
  if ((music.duration - music.currentTime) * 1000 <= 200 && status == 'play') {
  console.log((music.duration - music.currentTime) * 1000);
  play();
  setTimeout(function(){ 
    music.currentTime = 0;
  }, 100);
}}
music.addEventListener("canplaythrough", function () {
  duration = music.duration;
}, false);

function play(t = null) {
  if (t != null) {
    music = t.getElementsByClassName('music')[0];
    playB = t.getElementsByClassName('play')[0];
    pauseB = t.getElementsByClassName('pause')[0];
  }
  // start music
  if (music.paused) {
    fadeIn(music);
    // music.play();
    status = 'play';
    pauseB.className = "pause";
    playB.className = "play disabled";
  } else { // pause music
    fadeOut(music);
    // music.pause();
    status = 'pause';
    playB.className = "play";
    pauseB.className = "pause disabled";
  }
}

function fadeOut(p_audio){ 
  if(status != 'play') return false;
  var actualVolume = p_audio.volume;
  var fadeOutInterval = setInterval(function(){
    actualVolume = (parseFloat(actualVolume) - 0.1).toFixed(1);
    if(actualVolume >= 0 && actualVolume <= 1){
      p_audio.volume = actualVolume;
    } else {
      p_audio.pause();
      status = 'pause';
      clearInterval(fadeOutInterval);
    }
  }, 25);
}
function fadeIn(p_audio){ 
  if(status == 'play') return false;
  var actualVolume = 0;
  p_audio.play();
  status = 'play';
  var fadeInInterval = setInterval(function(){
    actualVolume = (parseFloat(actualVolume) + 0.1).toFixed(1);
    if(actualVolume >= 0 && actualVolume <= 1){
      p_audio.volume = actualVolume;
    } else {
      p_audio.play();
      status = 'play';
      clearInterval(fadeInInterval);
    }
  }, 25);
}
