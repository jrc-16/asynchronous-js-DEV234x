/* global vars */
var started = false;

var time = 0;

var interval = 0;

/* functions */
setUp();

// init
function setUp() {
  // get ID of the startStop button
  var startStop = document.getElementById("startStop");

  startStop.addEventListener("click", function() {
    debugger

    if( started === false ) {
      startTimer();

    } else {
      clearTimer();

    }
  });
}

// start timer function
function startTimer() {
  if( started === false ) {

  // how to call a function every Nth seconds https://stackoverflow.com/questions/2170923/whats-the-easiest-way-to-call-a-function-every-5-seconds-in-jquery
    interval = setInterval(function() {
      time++;
      document.getElementById("timer").innerHTML = "Time elapsed: " + time;
    }, 1000);

    // toggle started as timer has been kicked off
    started = true;
  }
}

function clearTimer() {

  clearInterval( interval );

  started = false
}
