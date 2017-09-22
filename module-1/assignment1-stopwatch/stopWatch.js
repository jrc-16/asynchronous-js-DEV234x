  /**
   * global vars
   */
  var started = false;
  var time = 0;
  var interval = 0;

  // get ID of the startStop button
  var timer = document.getElementById("timer");
  var startStop = document.getElementById("startStop");
  var reset = document.getElementById("reset");
  var recordTime = document.getElementById("recordTime");
  var pastTimeRecord = document.getElementById("pastTimes");

  /**
   * functions
   */

  // start the timer, incrementing the time every 100ths of a second
  function startTimer() {
    if( started === false ) {

      // how to call a function every Nth seconds https://stackoverflow.com/questions/2170923/whats-the-easiest-way-to-call-a-function-every-5-seconds-in-jquery
      // for displaying milliseconds see https://codepen.io/_Billy_Brown/pen/dbJeh
      interval = setInterval(function() {
        //debugger
        time++;
        timer.innerHTML = calculateTime();
      }, 10);

      // toggle started as timer has been kicked off
      started = true;

    } else {
      stopTimer();

    }
  }

  function calculateTime() {
    return time / 100; // milliseconds cunnrelty based on using https://stackoverflow.com/questions/11524619/adding-decimal-place-into-number-with-javascript
  }

  function stopTimer() {
    clearInterval( interval );
    started = false;
  }

  function resetTimer() {
    //debugger

    stopTimer();
    time = 0;
    timer.innerHTML = 0;
  }

  function recordTimes() {
    //debugger

    var pTag = document.createElement("P");
    var nd = document.createTextNode( calculateTime() );
    pTag.appendChild(nd);
    pastTimeRecord.appendChild(pTag);
  }

  function resetRecordedTimes() {
    //debugger

    // see https://siongui.github.io/2012/09/26/javascript-remove-all-children-of-dom-element/
    while (pastTimeRecord.hasChildNodes()) {
        pastTimeRecord.removeChild(pastTimeRecord.lastChild);
    }
  }

  /**
   * Event handlers
   */

  // Listen for clicks on the start/stop button
  startStop.addEventListener("click", function() {
    //debugger
    startTimer();
  });

  // Listen for clicks on the reset button
  reset.addEventListener("click", function() {
    //debugger
    resetTimer();
    resetRecordedTimes();
  });

  // Listen for clicks on the record times button
  recordTime.addEventListener("click", function() {
    //debugger
    recordTimes();
  });

  // Listen for keydown events
  document.addEventListener("keydown", function() {
     //debugger

    if( event.key.toLowerCase() === 's' ) {
      console.log("S was pressed");
      startTimer();
    }

    if( event.key.toLowerCase() === 'r' ) {
      console.log("R was pressed");
      resetTimer();
      resetRecordedTimes();
    }

    if( event.key.toLowerCase() === 't' ) {
      console.log("T was pressed");
      recordTimes();
    }
  });
