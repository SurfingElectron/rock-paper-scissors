//INITIALISING VARIABLES
const score = {roundCount: 0, winCount: 0, lossCount: 0, drawCount: 0};

const rockButton = document.querySelector('#rock_button');
const paperButton = document.querySelector('#paper_button');
const scissorsButton = document.querySelector('#scissors_button');

const totalLi = document.querySelector('#total_games');
const winLi = document.querySelector('#wins');
const lossLi = document.querySelector('#losses');
const drawLi = document.querySelector('#draws');

const computerChoice = document.querySelector('#computer_choice');
const playerChoice = document.querySelector('#player_choice');
const gameResult = document.querySelector('#game_result');
const formDiv = document.querySelector('.username_form');
const usernameForm = document.getElementById('username_entry');


//EVENT LISTENERS
rockButton.addEventListener('click', playRound);
paperButton.addEventListener('click', playRound);
scissorsButton.addEventListener('click', playRound);
usernameForm.addEventListener('submit', handleSubmit);

//FUNCTIONS
//Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get('username');
    
    if (!isLetter(username)) {
        alert("Your name must start with a capital letter, please try again!");
        return null;
    }
      
    formDiv.style.visibility = 'hidden'; //hides the form after name entry
    playerChoice.innerText = `${username}, please choose your move:`
}
  
//Checks if the first character is a letter AND capital
function isLetter(letterCheck) {
    return letterCheck !== letterCheck.toLowerCase();
}

//Score update and display
function matchTracking(resultCheck) { 
    score.roundCount++;
    totalLi.innerText = `Games played: ${score.roundCount}`;
    if(resultCheck === 1) {
        gameResult.innerText = `You won! Play again?`
        score.winCount++;
        winLi.innerText = `Won: ${score.winCount}`;
        return score.winCount
    }; 
    if(resultCheck === -1) {
        gameResult.innerText = `You lost! Play again?`
        score.lossCount++;
        lossLi.innerText = `Lost: ${score.lossCount}`;
        return score.lossCount;
    };
    if(resultCheck === 0) {
        gameResult.innerText = `You drew! Play again?`
        score.drawCount++;
        drawLi.innerText = `Drew: ${score.drawCount}`;
        return score.drawCount;
    };
}

//Player move announcer
function assignPlayerMove(event){
    console.log(event.target.innerText);
    if (event.target.innerText == 'Rock') return "rock"
    else if (event.target.innerText == 'Paper') return "paper"
    else if (event.target.innerText == 'Scissors')  return "scissors";
}

//Computer move generator and announcer
function computerMove() {
  let computerRPS = '';  
  let randomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1; //This should return 1, 2 or 3
    if(randomNumber === 1) {
        computerRPS = 'rock';
        computerChoice.innerText = `The computer chose ${computerRPS}.`;
        return computerRPS;
    }
    else if(randomNumber === 2) {
        computerRPS = 'paper';
        computerChoice.innerText = `The computer chose ${computerRPS}.`;
        return computerRPS;
    } 
    else if(randomNumber === 3) {
        computerRPS = 'scissors'
        computerChoice.innerText = `The computer chose ${computerRPS}.`;
        return computerRPS;
    }
}

//Winning logic
function getWinner(playerMove, computerMove) {
    if (playerMove === computerMove) {
        return 0;
    }
    else if (playerMove === "rock") {
        if (computerMove === "scissors") {
            return 1;
        } else {
            return -1;
            }
    }
    else if (playerMove === "paper") {
        if (computerMove === "rock") {
            return 1;
        } else {
            return -1;
            }
    }
    else if (playerMove === "scissors") {
        if (computerMove === "paper") {
            return 1;
        } else {
            return -1;
            }
    };
};

//Play RPS!
function playRound(event) {
    let matchResult = getWinner(assignPlayerMove(event), computerMove());
    
    matchTracking (matchResult);
}
