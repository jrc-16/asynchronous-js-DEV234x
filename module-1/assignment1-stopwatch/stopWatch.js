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

  // event listern for the start/stop button
  startStop.addEventListener("click", function() {
    debugger

    // start timer if not already runnig, else, stop the timer
    if( started === false ) {
      startTimer();

    } else {
      clearTimer();

    }
  });
}

// start the timer, incrementing the time every 100ths of a second
function startTimer() {
  if( started === false ) {

    // how to call a function every Nth seconds https://stackoverflow.com/questions/2170923/whats-the-easiest-way-to-call-a-function-every-5-seconds-in-jquery
    // for displaying milliseconds see https://codepen.io/_Billy_Brown/pen/dbJeh
    interval = setInterval(function() {
      debugger
      time++;
      document.getElementById("timer").innerHTML = "Time elapsed: " +  (time / 10).toFixed(2);// milliseconds cunnrelty based on using https://stackoverflow.com/questions/11524619/adding-decimal-place-into-number-with-javascript
    }, 100);

    // toggle started as timer has been kicked off
    started = true;
  }
}

function clearTimer() {

  clearInterval( interval );

  started = false
}
