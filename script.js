// variables global to the game
let gameInProgress = false;
let current_player = 0;
let timeLeft;
let playerTimer;

// Functions for GUI controls
function instructions(){
  alert("Each player has 20 seconds to click on an icon in the right panel \
that matches with one in the left panel (there's only one that does). \
A succesful match scores one point, clicking on an unmatched icon scores nothing. \
In either case you get a fresh set to try. \
Either player can start. You can play again by clicking on the Instructions \
/ Reset button");
  document.getElementById("player1Button").disabled=false;
  document.getElementById("player2Button").disabled=false;
  gameInProgress = false;
  currentPlayer = 'none';
  document.getElementById("player1Score").value = 0;
  document.getElementById("player2Score").value = 0;
}

function randomTiles(){
  // generate a fresh set of icons in both panels
  // fill a list with numbers 1000 to 1872
  let filenums = [];
  for (let counter=1000; counter<1872; counter++){
    filenums.push(counter);
  }
  // randomise the list using a neat sorting technique
  filenums.sort(() => Math.random() - 0.5);
  // generate a list of all the images in the imageset1 div (left panel)
  let imageIcons = document.getElementById("imageset1").querySelectorAll("img");
  // for every image replace the file source
  for (let icon of imageIcons){
    icon.src='emos\\'+filenums.pop().toString()+'.gif';
  }
  // generate a list of all the images in the imageset2 div (right panel)
  imageButtons = document.getElementById("imageset2").querySelectorAll("input");
  for (let button of imageButtons){
    // for every image replace the file source
    button.src='emos\\'+filenums.pop().toString()+'.gif';
    // for every image add an onclick (ignore the trinket warning here, it's OK)
    button.onclick=function(){missed()};
  }
  // get a new image number from the list
  let match = 'emos\\'+filenums.pop().toString()+'.gif';
  //generate a random number 0-8
  let randomButton = Math.floor(Math.random()*9);
  // log to console for cheat mode
  console.log(randomButton+1);
  // change one image in the left hand panel
  imageIcons[randomButton].src=match;
  // change one image in the right hand panel to match one in the left
  imageButtons[randomButton].src=match;
  //Note: This code makes the matching icons appear in the same position
  //in both panels. Generating two random positions for left and right
  //makes the game much harder.
  //
  // change the onclick command for the button with the new image
  imageButtons[randomButton].onclick = function(){hit()};
}

function hit(){
  // if the matching icon is clicked add 1 to the current player's score
  if (gameInProgress) {
    alert('Matched');
    if (currentPlayer == 1){
      document.getElementById("player1Score").value++;
    } else {
      document.getElementById("player2Score").value++;  
    }
    // generate a new set of tiles
    randomTiles();
  }
}

function missed(){
  // if an unmatched icon is clicked just pop up an alert
  if (gameInProgress) {
    alert('No match');
    // generate a new set of tiles
    randomTiles();
  }
}

function play(player){
  // main game control
  // if a player button is pressed and the game is not already running
  if (!gameInProgress){
    // set currentPlayer to player passed as parameter
    currentPlayer = player;
    // disable that player's button so they can't go again
    if (player == 1){
      document.getElementById("player1Button").disabled=true;
    } else {
      document.getElementById("player2Button").disabled=true;
    }
    //disable the reset button while timer in progress
    document.getElementById("instructions").disabled=true;
    gameInProgress = true;
    // set up a timer to repeat a function every second
    timeLeft = 20;
    playerTimer = setInterval(timerFunction, 1000);
    // generate a fresh set of tiles
    randomTiles();
  } 
}

function timerFunction(){
  // This is the tricky bit. The timer updates every second.
  // if the timer has run out
  if(timeLeft <= 0){
    // clear the timer and announce time's up to the current player
    clearInterval(playerTimer);
    alert("Time's up Player " + currentPlayer);
    gameInProgress = false;
    document.getElementById("instructions").disabled=false;
    // use the status of the player buttons to determine if the game is over
    // if both buttons are disabled then the game is over
    if (document.getElementById("player1Button").disabled && 
        document.getElementById("player2Button").disabled) {
      // announce the winner
      let p1Score = parseInt(document.getElementById("player1Score").value);
      let p2Score = parseInt(document.getElementById("player2Score").value);
      if (p1Score > p2Score) {
        alert('Game Over - Player 1 wins: ' + p1Score + ' points to ' + p2Score);
      } else if (p2Score >p1Score) {
        alert('Game Over - Player 2 wins: ' + p2Score + ' points to ' + p1Score);
      } else {
        alert("Game Over - It's a draw: " + p1Score + ' points each');
      }
    }
  } else {
    //Note: If the next two lines of code are in the 'else' section
    //then the countdown doesn't decrement while the hit/miss alert
    //boxes are showing.
    //Removing the 'else' means the countdown continues while the alerts
    //are showing, which makes the game harder.
    //
    // time hasn't run out so decrement timeLeft and update the progress bar
    timeLeft -= 1;
    document.getElementById("progressBar").value = timeLeft;
  }
}
