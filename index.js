const INVALID_INPUT_MSG = 'Invalid Input';

// GAME SETTINGS ///////////////////////////////////
const WIN_MSG = 'Congrats, You Won !';
const LOSE_MSG = 'You Lost !';
const DRAW_MSG = "It's a Draw";

const WIN_COLOR = 'green';
const DRAW_COLOR = 'grey';
const LOSE_COLOR = 'tomato';

const PLAYER_CHOICES = ['rock', 'paper', 'scissors'];

const MAX_SCORE = 5;

//////////////////////////////////////////////////

let playerScore = 0;
let computerScore = 0;
let firstRound = true;




const rootElement = document.querySelector('#root');

const choicesContainer = document.createElement('div');
choicesContainer.classList.add('choices-container');

const resultContainer = document.createElement('div');
resultContainer.classList.add('result-container');

const finalScoreContainer = document.createElement('div');
resultContainer.classList.add('final-score-container');

function playGame() {
    
    const actionMessage = document.createElement('h2');
    actionMessage.textContent = "Click on you choice :";
    
    const choicesList = document.createElement('ul');
    
    appendChoicesTo(choicesList);
    
    choicesContainer.appendChild(actionMessage);
    
    choicesContainer.appendChild(choicesList);
    
    rootElement.appendChild(choicesContainer);
}

function addChoiceElement(container, choice) {
    const choiceContainer = document.createElement('li');
    const choiceIcon = document.createElement('img');
    const title = document.createElement('span');
    choiceContainer.setAttribute('id' , `${choice}-choice`);
    choiceIcon.classList.add('choice-img');
    choiceIcon.setAttribute('src', `./assets/images/${choice}.png`);
    choiceIcon.setAttribute('draggable', false);
    title.textContent = captilizeFirstLetter(choice);


    choiceContainer.appendChild(choiceIcon);
    choiceContainer.appendChild(title);

    container.appendChild(choiceContainer);

    return choiceContainer;
}


function showResult(result, playerSelection, computerSelection) {
    let resultMessageColor = 'black';
    let choiceOrder = 'normal';
    
    
    switch(result) {
        case WIN_MSG :  console.log(result); resultMessageColor = WIN_COLOR; playerScore++; break;
        case LOSE_MSG : console.log(result); resultMessageColor = LOSE_COLOR; computerScore++; choiceOrder = 'reverse'; break;
        case DRAW_MSG : console.log(result); resultMessageColor = DRAW_COLOR; break;
        default: console.log(result); return;
    }

    rootElement.removeChild(choicesContainer);

    const resultMessage = document.createElement('h2');
    resultMessage.textContent = result;
    resultMessage.style.color = resultMessageColor;
    resultContainer.appendChild(resultMessage);

    const playerAndComputerChoices = document.createElement('ul');
    
    const playerChoiceContainer = addChoiceElement(playerAndComputerChoices, playerSelection);
    const resultReasonText = document.createElement('h2');
    resultReasonText.textContent = result === DRAW_MSG ? "draw" : "beats";
    const computerChoiceContainer = addChoiceElement(playerAndComputerChoices, computerSelection);
    
    playerAndComputerChoices.appendChild( choiceOrder === 'normal' ? playerChoiceContainer : computerChoiceContainer);
    playerAndComputerChoices.appendChild(resultReasonText);
    playerAndComputerChoices.appendChild( choiceOrder === 'normal' ? computerChoiceContainer : playerChoiceContainer);

    resultContainer.appendChild(playerAndComputerChoices);

    const nextRoundButton = document.createElement('button');
    nextRoundButton.classList.add('primary-btn');
    nextRoundButton.textContent = "Next Round";
    resultContainer.appendChild(nextRoundButton);
    
    

    rootElement.appendChild(resultContainer);


    
    nextRoundButton.addEventListener('click', function () {
        resultContainer.removeChild(resultMessage);
        resultContainer.removeChild(playerAndComputerChoices);
        resultContainer.removeChild(nextRoundButton);
        rootElement.removeChild(resultContainer);

        if(playerScore != MAX_SCORE && computerScore != MAX_SCORE ) {
            rootElement.appendChild(choicesContainer);
        } else {
            showFinalScore(); 
        }
    })
    
}

function showFinalScore() {
    console.log("Final Score : (You) " + playerScore + " - " + computerScore + " (Computer)" );

    const finalScoreTitle = document.createElement('h2');
    finalScoreTitle.textContent = playerScore > computerScore ? WIN_MSG : LOSE_MSG;
    finalScoreTitle.style.color = playerScore > computerScore ? WIN_COLOR : LOSE_COLOR;
    finalScoreContainer.appendChild(finalScoreTitle);

    const finalScore = document.createElement('h1');
    finalScore.textContent = "(You) " + playerScore + " - " + computerScore + " (Computer)";
    finalScore.classList.add("final-score");
    finalScoreContainer.appendChild(finalScore);

    const replayButton = document.createElement('button');
    replayButton.classList.add('primary-btn');
    replayButton.textContent = "Replay";
    finalScoreContainer.appendChild(replayButton);
    
    

    rootElement.appendChild(finalScoreContainer);


    
    replayButton.addEventListener('click', function () {
        playerScore = 0;
        computerScore = 0;
        finalScoreContainer.removeChild(finalScoreTitle);
        finalScoreContainer.removeChild(finalScore);
        finalScoreContainer.removeChild(replayButton);
        rootElement.removeChild(finalScoreContainer);
        rootElement.appendChild(choicesContainer);
    }) 
}





function playRound(playerSelection) {
    console.log("Player choose : " + playerSelection);
    let result = LOSE_MSG;
    const computerSelection = getComputerChoice();
    if( playerSelection == computerSelection ) {
        result = DRAW_MSG;
    } else {
        switch (playerSelection) {
            case ( PLAYER_CHOICES [0] ) : computerSelection == PLAYER_CHOICES [2] ? result = WIN_MSG : result = LOSE_MSG; break;
            case ( PLAYER_CHOICES [1] ) : computerSelection == PLAYER_CHOICES [0] ? result = WIN_MSG : result = LOSE_MSG; break;
            case ( PLAYER_CHOICES [2] ) : computerSelection == PLAYER_CHOICES [1] ? result = WIN_MSG : result = LOSE_MSG; break;
            default : result = INVALID_INPUT_MSG; break;
        }
    }
    
    showResult(result, playerSelection, computerSelection);
}



function handlePlayerChoice() {
    switch(this.id) {
        case 'rock-choice': playRound('rock'); break;
        case 'paper-choice': playRound('paper'); break;
        case 'scissors-choice': playRound('scissors'); break;
        default : break;
    }
}

function appendChoicesTo(choicesList) {
    for (let i = 0; i < PLAYER_CHOICES.length; i++) {
        const choiceContainer = addChoiceElement(choicesList, PLAYER_CHOICES[i]);
        choiceContainer.addEventListener('click', handlePlayerChoice);
    } 
}


function getComputerChoice() {    
    let randomIndex = Math.floor(Math.random() * 3); // random * (max (2) - min (0)) + min (0)
    return PLAYER_CHOICES[randomIndex]; 
}

function captilizeFirstLetter(word) {
    let wordType = typeof word;
    if (wordType == "string" ) {
        let lowerCaseWord = word.toLowerCase();
        let firstLetter = lowerCaseWord.substring(0,1).toUpperCase();
        let restOfWord = lowerCaseWord.substr(1, lowerCaseWord.length - 1);
        return firstLetter + restOfWord;
    } else {
        console.error("invalid parameter type, parameter : " + word);
    }
}


playGame();
