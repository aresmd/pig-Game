'use strict';
const $ = document;
//player
const player0El = $.querySelector('.player--0');
const player1El = $.querySelector('.player--1');
//selectscore
const score0El = $.querySelector('#score--0');
const score1El = $.querySelector('#score--1');
//rolling
const btnRoll = $.querySelector('.btn--roll');
const btnNew = $.querySelector('.btn--new');
const btnHold = $.querySelector('.btn--hold');
//delete dice
const diceEl = $.querySelector('.dice');
// corent score
const currentScoreEl0 = $.querySelector('#current--0');
const currentScoreEl1 = $.querySelector('#current--1');
let currentScore = 0;
const scores = [0, 0];
let activePlayer = 0;
let playing = true;
//changer
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//edit score
score0El.textContent = 0;
score1El.textContent = 0;
//delete dice
diceEl.classList.add('hiiden');
//rolling
btnRoll.addEventListener('click', () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //
    diceEl.classList.remove('hiiden');
    //
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', () => {
  if (playing) {
    //1) add current score to active player
    scores[activePlayer] += currentScore;
    $.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2) check if players score >= 100
    if (scores[activePlayer] >= 10) {
      playing = false;
      $.querySelector(`.player--${activePlayer}`).classList.add(
        'player--winner'
      );

      $.querySelector(`.player--${activePlayer}`).classList.remove(
        'player--active'
      );
      diceEl.classList.add('hiiden');
    } else {
      
      switchPlayer();
      //switch player
    }
  }
});

btnNew.addEventListener('click', () => {
 playing = true;
 scores[0]= 0;
 scores[1]= 0;
 currentScore = 0;
 activePlayer = 0 ;
 currentScoreEl0.textContent = 0;
 currentScoreEl1.textContent = 0;
 score0El.textContent = 0;
score1El.textContent = 0;
$.querySelector(`.player--${activePlayer}`).classList.remove(
  'player--winner'
);
$.querySelector(`.player--1`).classList.remove(
  'player--winner'
);
player0El.classList.add('player--active');
player1El.classList.remove('player--active');
diceEl.classList.add('hiiden');
});
