'use strict';

// Selecting users scores, dice and buttons
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
let playing, currentScore, activePlayer, scores;

const init = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;

  // reset current scores
  current0El.textContent = 0;
  current1El.textContent = 0;

  // remove winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // add active player class
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Switch player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice Functionalities

btnRoll.addEventListener('click', function () {
  // 1. Generate a random dice
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.setAttribute('src', `dice-${dice}.png`);
    // 3. Check for rolled 1:
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // if dice === 1, switch to the next player
      switchPlayer();
    }
  }
});

// hold scores
btnHold.addEventListener('click', function () {
  if (playing) {
    // add score to global scores
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      // if any of the scores(active player) >= 100, end game
      // add winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // remove dice
      diceEl.classList.add('hidden');
      // disable playing mode
      playing = false;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// Reset the game

btnNew.addEventListener('click', init);
