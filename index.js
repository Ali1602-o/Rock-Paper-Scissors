const INVALID_INPUT_MSG = 'Invalid Input, Game over!';

//GAME SETTINGS
const WIN_MSG = 'Congrats, You Won ! Reload to play more !';
const LOSE_MSG = 'You Lost :(, Reload to try again !';
const DRAW_MSG = "It's a Draw, Reload to try again !";
const PLAYER_CHOICES = ['rock', 'paper', 'scissors'];


function playGame() {
    const rootElement = document.querySelector('#root');

    const choicesContainer = document.createElement('div');
    choicesContainer.classList.add('choices-container');
    
    const actionMessage = document.createElement('h2');
    actionMessage.textContent = "Click on you choice :";
    
    const choicesList = document.createElement('ul');
    
    
    addChoiceElements(choicesList);
    
    choicesContainer.appendChild(actionMessage);
    
    choicesContainer.appendChild(choicesList);
    
    rootElement.appendChild(choicesContainer);
}




function playRound(playerSelection) {    
    //getComputer Selection
    //compare to see who wins
    //whether lose win or draw manipulate the dom to show result
}


function handlePlayerChoice() {
    switch(this.id) {
        case 'rock-choice': console.log('rock'); break;
        case 'paper-choice': console.log('paper'); break;
        case 'scissors-choice': console.log('scissors'); break;
        default : break;
    }
}

function addChoiceElements(choicesList) {

    for (let i = 0; i < PLAYER_CHOICES.length; i++) {
        const choiceContainer = document.createElement('li');
        const choiceIcon = document.createElement('img');
        const title = document.createElement('span');
        choiceContainer.setAttribute('id' , `${PLAYER_CHOICES[i]}-choice`);
        choiceIcon.classList.add('choice-img');
        choiceIcon.setAttribute('src', `./assets/images/${PLAYER_CHOICES[i]}.png`);
        choiceIcon.setAttribute('draggable', false);
        title.textContent = captilizeFirstLetter(PLAYER_CHOICES[i]);

    
        choiceContainer.appendChild(choiceIcon);
        choiceContainer.appendChild(title);

        choiceContainer.addEventListener('click', handlePlayerChoice);

        choicesList.appendChild(choiceContainer);
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
