"use strict";

const buttons = document.querySelectorAll(".box button");
const gameOverMenu = document.querySelector(".game-over");
const startMenu = document.querySelector(".start-menu");
const startButton = document.querySelector(".start-game-button");
const restartButton = document.querySelector(".game-over .restart-button");

let buttonsToPress = [];
let currentStep = 0; // Tracks the current step in the sequence
let difficulty = 1;
let canGuess = false;
let highlightTime = 800;

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    guess(button);
    button.classList.add("clicked"); // Add the 'clicked' class
    setTimeout(function () {
      button.classList.remove("clicked"); // Remove the 'clicked' class after a short delay
      button.classList.add("removing"); // Add the 'removing' class
      setTimeout(function () {
        button.classList.remove("removing"); // Remove the 'removing' class after the easing-out transition
      }, 550); // Adjust the delay time as needed
    }, 250); // Adjust the delay time as needed
  });
});

startButton.addEventListener("click", function () {
  startMenu.style.display = "none";
  startGame();
});

restartButton.addEventListener("click", function () {
  gameOverMenu.style.display = "none";
  startGame();
});

function startGame() {
  startMenu.style.display = "none"; // Hide the start menu
  setTimeout(function () {
    generateSequence(); // Generate initial sequence
    highlightSequence(); // Highlight the sequence
  }, 600);
}

function guess(clickedButton) {
  const buttonNumber = parseInt(clickedButton.classList[0].split("-")[1]);
  if (canGuess === true) {
    if (buttonNumber === buttonsToPress[currentStep]) {
      canGuess = false;
      console.log(`Correct! Button ${buttonNumber} clicked.`);
      currentStep++;

      if (currentStep === buttonsToPress.length) {
        canGuess = false;
        console.log("Sequence completed!");
        currentStep = 0; // Reset the step for the next round
        if (difficulty > 4) {
          highlightTime = 500;
        }
        difficulty++;
        generateSequence();
        setTimeout(highlightSequence, 900); // Highlight the next sequence after a delay
      }
    } else {
      canGuess = false;
      console.log(`Wrong! Button ${buttonNumber} clicked.`);
      currentStep = 0; // Reset the step for the next round
      buttonsToPress = [];
      gameOverMenu.style.display = "flex";
    }
  }
}

function generateSequence() {
  const randomButton = Math.floor(Math.random() * buttons.length) + 1;
  buttonsToPress.push(randomButton);
}

function highlightSequence() {
  console.log("highlighting............");
  for (let i = 0; i < buttonsToPress.length; i++) {
    setTimeout(function () {
      const button = document.querySelector(`.button-${buttonsToPress[i]}`);
      button.classList.add("highlight");
      setTimeout(function () {
        button.classList.remove("highlight");
      }, highlightTime);
    }, highlightTime * i); // Delay each highlight by 1 second
  }
  canGuess = true; // Allow guessing after the sequence is highlighted
}
