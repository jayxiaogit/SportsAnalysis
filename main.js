// Javascript code
console.log('Hello from JavaScript!');

// Get user input using the prompt function
var userInput = prompt("Please enter your name:");

// Check if the user entered something
if (userInput !== null) {
    // Display a personalized greeting
    var userInputDisplay = document.getElementById('userInputDisplay');
    userInputDisplay.innerHTML = "User input: " + userInput;
} else {
    // Handle the case where the user clicked 'Cancel'
    alert("You didn't enter your name. Hello, anonymous!");
    console.log("User did not enter any data.");
}

// Get user input using the prompt function
var userInput1 = prompt("Please enter your ranking:");
console.log("Hello, " + userInput1 + "!");
var userInput2 = prompt("Please enter your location:");
alert("Hello, " + userInput2 + "!");



