//DEFINING OUR FUNCTIONS

//checks a username, only accept if it starts with a letter which is a capital 
//function checkUsername() {
//    while (isLetter (nameCheck[0]) === false) {
//        nameCheck = alert("Your name must start with a capital letter, please try again");
//    } 
//    return nameCheck;
//}

//handling the form submission
function handleSubmit(event) {
    event.preventDefault();
  
    const data = new FormData(event.target);
    const username = data.get('username');
  
    console.log(username);
    formDiv.style.visibility = 'hidden'; //hides the form div!
    playerChoice.innerText = `${username}, please choose your move:`
    results.innerText = `${username}, your results:`
  }
  

//check if the first character is a letter AND capital
function isLetter(letterCheck) {
    return letterCheck !== letterCheck.toLowerCase();
}

//updating and displaying the scores
function matchTracking(resultCheck) { 
    score.roundCount++;
    totalLi.innerText = `Games played: ${score.roundCount}`;
    if(resultCheck === 1) {
        score.winCount++;
        winLi.innerText = `Won: ${score.winCount}`;
        return score.winCount
    }; 
    if(resultCheck === -1) {
        score.lossCount++;
        lossLi.innerText = `Lost: ${score.lossCount}`;
        return score.lossCount;
    };
    if(resultCheck === 0) {
        score.drawCount++;
        drawLi.innerText = `Drew: ${score.drawCount}`;
        return score.drawCount;
    };
}

//respond with which RPS button was pushed
function assignPlayerMove(event){
    console.log(event.target.innerText);
    if (event.target.innerText == 'Rock') return "rock"
    else if (event.target.innerText == 'Paper') return "paper"
    else if (event.target.innerText == 'Scissors')  return "scissors";
}

//generate the computer's choice and display it
function computerMove() {
  let computerRPS = '';  
  let randomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1; //This should return 1, 2 or 3
    if(randomNumber === 1) {
        computerRPS = 'rock';
        computerChoice.innerText = `The computer chose: ${computerRPS}`;
        return computerRPS;
    }
    else if(randomNumber === 2) {
        computerRPS = 'paper';
        computerChoice.innerText = `The computer chose: ${computerRPS}`;
        return computerRPS;
    } 
    else if(randomNumber === 3) {
        computerRPS = 'scissors'
        computerChoice.innerText = `The computer chose: ${computerRPS}`;
        return computerRPS;
    }
}

//logic check to see if player wins
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

//run a round of RPS
function playRound(event) {
    let matchResult = getWinner(assignPlayerMove(event), computerMove());
    
    matchTracking (matchResult);
}


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
const results = document.querySelector('#results');
const formDiv = document.querySelector('.username_form');
const usernameForm = document.getElementById('username_entry');


//EVENT LISTENERS
rockButton.addEventListener('click', playRound);
paperButton.addEventListener('click', playRound);
scissorsButton.addEventListener('click', playRound);
usernameForm.addEventListener('submit', handleSubmit);

