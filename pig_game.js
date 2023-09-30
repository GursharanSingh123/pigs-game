'use strict';

// DOM variables
const playerOne = document.querySelector('.player1');
const playerTwo = document.querySelector('.player2');
const dice = document.querySelector('.rolldice');
const currentScoreOne = document.querySelector('#current1');
const currentScoreTwo = document.querySelector('#current2');
const diceImage = document.querySelector('.dice-image');

const holdBtn = document.querySelector('.hold');
const totalScoreOne = document.querySelector('#totalscore1');
const totalScoreTwo = document.querySelector('#totalscore2');
const newgameBtn = document.querySelector('.newgame');

const victoryOne = document.querySelector('#victory1');
const victoryTwo = document.querySelector('#victory2');

// Logic varaibles
let currentScoreCounter = 0;
let activePlayer = 1;
let totalScore = [0, 0];

// Functions
function switchPlayer() {
  currentScoreCounter = 0;
  document.getElementById(`current${activePlayer}`).innerText =
    currentScoreCounter;
  activePlayer = activePlayer === 1 ? 2 : 1;
  playerOne.classList.toggle('active');
  playerTwo.classList.toggle('active');
}

function initialActivePlayerSelection() {
  diceImage.classList.add('hidden');
  let ran = Math.trunc(Math.random() * 2);
  if (ran === 0) {
    playerOne.classList.add('active');
  } else if (ran === 1) {
    playerTwo.classList.add('active');
  }
}

//First time loading active player selection
window.addEventListener('load', function () {
  initialActivePlayerSelection();
});

// Rolling the Dice functionality
dice.addEventListener('click', function () {
  diceImage.classList.remove('hidden');
  const randomRoll = Math.trunc(Math.random() * 6) + 1;
  diceImage.src = `pics/dice-${randomRoll}.png`;
  if (randomRoll === 1) {
    switchPlayer();
  } else {
    currentScoreCounter += randomRoll;
    document.getElementById(`current${activePlayer}`).innerText =
      currentScoreCounter;
  }
});

// hold button functionality
holdBtn.addEventListener('click', function () {
  currentScoreCounter += Number(
    document.querySelector(`#totalscore${activePlayer}`).innerText
  );
  totalScore[activePlayer - 1] = currentScoreCounter;
  document.querySelector(`#totalscore${activePlayer}`).innerText =
    totalScore[activePlayer - 1];

  if (document.querySelector(`#totalscore${activePlayer}`).innerText >= 100) {
    currentScoreCounter = 0;
    document.getElementById(`current${activePlayer}`).innerText =
      currentScoreCounter;
    document
      .querySelector(`#victory${activePlayer}`)
      .classList.remove('hidden');
    holdBtn.classList.add('hidden');
    dice.classList.add('hidden');
    document.querySelector(`.player${activePlayer}`).classList.add('winner');
    document.querySelector(`.player${activePlayer}`).classList.remove('active');
  } else {
    switchPlayer();
  }
});

// New Game button functionality
newgameBtn.addEventListener('click', function () {
  if (holdBtn.classList.contains('hidden')) {
    holdBtn.classList.remove('hidden');
    dice.classList.remove('hidden');
    !victoryOne.classList.contains('hidden')
      ? victoryOne.classList.add('hidden')
      : victoryTwo.classList.add('hidden');
  }
  totalScoreOne.innerText = 0;
  totalScoreTwo.innerText = 0;
  currentScoreCounter = 0;
  currentScoreOne.innerText = 0;
  currentScoreTwo.innerText = 0;
  diceImage.innerHTML = '<img src="pics/dice-1.png" class="dice-image"/>';
  document.querySelector(`.player${activePlayer}`).classList.remove('winner');
  playerOne.classList.remove('active');
  playerTwo.classList.remove('active');
  initialActivePlayerSelection();
});
