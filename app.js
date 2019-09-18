/*******************************
    VARIABLES
*******************************/
var playersScore = [0,0];
var roundScore = 0;
var activePlayer = 0;
var rollDiceButton = document.querySelector('.btn-roll');
var holdTurnButton = document.querySelector('.btn-hold');
var currentRoll;

/*******************************
    SELECT ELEMENTS
*******************************/
var currentScore = document.querySelector(`#score-${activePlayer}`);
var currentPlayer = document.querySelector(`#current-${activePlayer}`);
var newGameButton = document.querySelector('.btn-new');

document.querySelector('.dice').style.display = 'none';
document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');



/*******************************
    EVENT LISTENERS
*******************************/
rollDiceButton.addEventListener('click', handleDiceRoll);
newGameButton.addEventListener('click', newGame);
holdTurnButton.addEventListener('click', handleHoldTurn)

/*******************************
    FUNCTIONS
*******************************/
function newGame() {
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0; 
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#name-0').textContent = 'Player 1'; 
  document.querySelector('#name-1').textContent = 'Player 2';   
  activePlayer = 0;
  playersScore = [0,0];
  rollDiceButton.style.display = 'block';
  holdTurnButton.style.display = 'block';

  console.log('New game started');
} 
/*********************************************************/
function rollDice() {
  return Math.ceil( Math.random() * 6 );
}

/*********************************************************/
function showDice(currentRoll) {
  var dice = document.querySelector('.dice');
  dice.style.display = 'block';
  dice.src = `dice-${currentRoll}.png`;
}

/*********************************************************/
function handleDiceRoll() {
  // 1. Get Random Number
  var currentRoll = rollDice();

  // 2. Change Dice in DOM
  showDice(currentRoll);

  // 3. Show current Score
  showCurrentTotalScore(activePlayer, currentRoll);

  // 4. If roll 1 change turn reset score
  if (currentRoll == 1) {
    document.querySelector(`#current-${activePlayer}`).textContent = 0;
    activePlayer ? activePlayer = 0 : activePlayer = 1;

    showActivePlayer();
  }
}

/*********************************************************/
function handleHoldTurn() {
  console.log('Hold turn button clicked!');

  
  // 1. Get Temp Score
  var tempPlayerScore = document.querySelector(`#current-${activePlayer}`);

  // 2. Save Temp Score to Running Total
  var newScore = parseInt(tempPlayerScore.textContent) + playersScore[activePlayer];
  playersScore[activePlayer] = newScore;

  console.log(playersScore[activePlayer], 'befor you won');

  if ( playersScore[activePlayer] >= 21 ) {
    youDidIt();
  }

  console.log('after youWon()');

  // 3. Show Running Total
  showRunningTotalPlayerScore();

  // 4. Change Player
  if ( activePlayer === 1 ) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }

  showActivePlayer();

  // 5. Reset Temp Score to 0
  tempPlayerScore.textContent = 0;
}

/*********************************************************/
// show current player score
function showCurrentTotalScore(activePlayer, currentRoll) {
  var currentPlayerScore = document.querySelector(`#current-${activePlayer}`);

  var initialScore = parseInt(currentPlayerScore.textContent);

  var updateScore = initialScore + currentRoll;
  currentPlayerScore.textContent = updateScore;
}

/*********************************************************/
function showRunningTotalPlayerScore() {
  var currentPlayerScoreTotal = document.querySelector(`#score-${activePlayer}`);

  currentPlayerScoreTotal.textContent = playersScore[activePlayer];

  console.log(currentPlayerScoreTotal, "running total");

}

/*********************************************************/
function youDidIt() {
  console.log(activePlayer, "won");

  var winner;
  var loser;

  if ( activePlayer === 1 ) {
      winner = 1;
      loser = 0
  } else {
      winner = 0;
      loser = 1
  }
  
  document.querySelector(`#name-${winner}`).textContent = 'Winner'; 
  document.querySelector(`#name-${loser}`).textContent = 'Loser'; 

  rollDiceButton.style.display = 'none';
  holdTurnButton.style.display = 'none';
}

/*********************************************************/
function showActivePlayer() {
  console.log('test');
  var show;
  var hide;

  if ( activePlayer === 1 ) {
    show = 1;
    hide = 0;
  } else {
    show = 0;
    hide = 1
  } 

  document.querySelector(`.player-${show}-panel`).classList.add('active');
  document.querySelector(`.player-${hide}-panel`).classList.remove('active');
}

/*********************************************************/
















