/* global vars */

// keep track of clicked cells
var clickedArray = [];

// timing vars
var interval;
var started = false;
var time = 0;

// ready signifies whether the app is ready to handle click events (to do with incorrect matching)
var ready = true;

// numCompleted traks how many cells have been completed
var numCompleted = 0;


/* execuete functions here */
setUp();
startTimer();

function randomAnswers() {
  var answers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
  answers.sort(function( item ) {
    //debugger
    return .5 - Math.random();
  });
  return answers;
}

// init
function setUp() {
  // get all table cells
  var grid = document.getElementsByTagName("td");
  //debugger
  var answers = randomAnswers();

  // loop through all cells, initialising to false, set each cell to a randome value
  for( var i = 0; i < grid.length; i++ ) {
    var cell = grid[i];
    cell.completed = false;
    cell.clicked = false;
    cell.value = answers[i];

    cell.addEventListener("mouseenter", function() {
      //debugger
      if( this.completed === false && this.clicked === false ) {

        this.style.background = "orange";
      }
    });

    cell.addEventListener("mouseleave", function() {
      //debugger
      if( this.completed === false && this.clicked === false ) {
        this.style.background = "blue";
      }
    });

    // click handler: if a cell has been clicked, push the cell onto clickedArray
    // then invoke 'reveal' to do its thing
    cell.addEventListener("click", function() {
      // debugger

      if( ready === false ) {
        return;
      }

      if( this.clicked === false && this.completed === false ) {
        clickedArray.push( this );
        reveal( this );
      }

      // check if 2 cells have been clicked
      if( clickedArray.length === 2 ) {

        // if a matching pair is found
        if( clickedArray[ 0 ].value === clickedArray[ 1 ].value ) {

          // pass both cells off to complete() for processing
          complete( clickedArray[ 0 ] );
          complete( clickedArray[ 1 ] );

          // clear down the clickedArray as we only hold onto 2 clicked cells at a time.
          // @JC 26/05/17: spotted a 'jc js pattern' - we are clearing down variables
          // here as i have done in PumpCo cog development. THe pattern is to reset a value
          // to empty, preparing it to be used the application again.
          clickedArray = [];

          // if the total number of matched pairs is 8 the user has completed the game.
          if( numCompleted === 8 ) {
            alert( "You won in " + time + " seconds!" );

            // stop the timer
            clearInterval( interval );
          }

        }

        // if a mathcing is NOT found
        else {
          // ensure no click events can be made. we make sure users cant click
          // cells while incorrect values are displayed.
          ready = false;
          document.getElementById("gridTable").style.border = "5px solid red";

          // reenable click events after half a second. we set this time to allow users
          // to see there incorrect answers
          setTimeout(function() {

            // pass the cells to hide() for processing
            hide( clickedArray[ 0 ] );
            hide( clickedArray[ 1 ] );

            clickedArray = [];

            // users can click cells again
            ready = true;
            document.getElementById("gridTable").style.border = "5px solid black";

          }, 500);

        }
      }

    });
  }

  document.addEventListener("keydown", function() {
    // debugger
    if( event.key > 0 && event.key < 10 ) {
      // the keybutton the user pressed
      grid[ event.key -1 ].click();
    }
  });

  // reload the page when a user clicks the restart button
  document.getElementById("restart").addEventListener("click", function() {
    location.reload();
  });

}

// make red, display number and toggled cliked status to true
function reveal( cell ) {
  cell.style.background = "red";
  cell.innerHTML = cell.value;
  cell.clicked = true;
}

// start timer function
function startTimer() {
  if( started === false ) {
    interval = setInterval(function() {
      time++;
      document.getElementById("timer").innerHTML = "Time elapsed: " + time;
    }, 1000);

    // toggle started as timer has been kicked off
    started = true;
  }
}

// reset a cell when an incorrect guess is made
function hide( cell ) {
  cell.style.backgroundColor = "blue";
  cell.innerHTML = "";

  // enables cell to be clicked again in future
  cell.clicked = false;
}

// displays a cell as complete when a matching pair is found
function complete( cell ) {
  // increment the total amoutn of matching pairs found
  numCompleted++;

  cell.completed = true;
  cell.style.backgroundColor = "purple";
}
