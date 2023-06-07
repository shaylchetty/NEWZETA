let eq;
let ans;
let inputValue;
let cdf = false;
let sTime;
let score = -1;
let storedUsername = sessionStorage.getItem('username');


var startTime = (function () {
  var variable;

  return function (value) {
    if (variable === undefined) {
      variable = value;
    }
    return variable;

  };
})();

let scoreElement = document.getElementById('score');

scoreElement.textContent = 'Score: 0';


function answered(btc) {

    inputElement = document.getElementById("myInput");

    inputValue = inputElement.value; // Retrieve the input value


    if ((ans == inputValue || (ans == undefined && inputValue == "" && btc.key === 'Enter')) && !cdf) {
        
        if(inputElement.getAttribute("plt")){
            sTime = startTime(Math.floor(Date.now() / 1000));
            updateCountdown();
            inputElement.placeholder = "";
        }
        score += 1;

        scoreElement = document.getElementById("score");

        scoreElement.textContent = 'Score: ' + score;
        
        generateHTML();

        inputElement.value = "";
    }
  }

function generateHTML() {
    let container = document.getElementById("question");

    fetch('http://127.0.0.1:5000/equatefunc')
    .then(response => response.json())
    .then(result => {
        eq = result[0];
        ans = result[1];
        container.textContent = eq;
    });

}


  
// Set the total duration of the countdown in seconds
var countdownDuration = 5;

// Get the countdown element from your HTML
var countdownElement = document.getElementById('countdown');

countdownElement.textContent = countdownDuration + ' seconds';




// Function to update the countdown
function updateCountdown() {

  // Calculate the remaining time
  var currentTime = Math.floor(Date.now() / 1000);
  var remainingTime = countdownDuration - (currentTime - sTime);

  // Update the countdown element
  countdownElement.textContent = remainingTime + ' seconds';

  // If the countdown is not yet finished, schedule the next update
  if (remainingTime > 0) {

    setTimeout(updateCountdown, 1000); // Update every second (1000 milliseconds)
  } else {
    // Countdown finished, do something
    cdf = true;
    countdownElement.textContent = 'Countdown finished';

    // Call a function or perform any action when the countdown finishes
    updateDatabase(storedUsername, score);
    
  }
}


function switcher(btc) {
  if (btc.key === 'Enter') {
    
    transformUsername = document.getElementById("username");

    username = transformUsername.value;

    sessionStorage.setItem('username', username);

    window.location.href = 'game.html';
  }
}



// Update the database with username and score
function updateDatabase(username, score) {

  // Create a new XMLHttpRequest object
  var req = new XMLHttpRequest();

  // Set up the request
  req.open('POST', 'http://127.0.0.1:5000/update_score', true);


  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Set up the callback function
  req.onreadystatechange = function () {

    if (req.readyState === XMLHttpRequest.DONE) {


      if (req.status === 200) {

        console.log('Score updated successfully');
      } else {

        console.error('Error updating score:', req.status);
      }
    }
  };

  // Prepare the data
  var data = 'username=' + encodeURIComponent(username) + '&score=' + encodeURIComponent(score);

  // Send the request
  req.send(data);

}


