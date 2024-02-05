const INVALID_INPUT_MSG = 'Invalid Input, Game over!';

//GAME SETTINGS
const WIN_MSG = 'Congrats, You Won ! Reload to play more !';
const LOSE_MSG = 'You Lost :(, Reload to try again !';
const DRAW_MSG = "It's a Draw, Reload to try again !";
const PLAYER_CHOICES = ['rock', 'paper', 'scissors'];

function getComputerChoice() {    
    let randomIndex = Math.floor(Math.random() * 3); // random * (max (2) - min (0)) + min (0)
    return PLAYER_CHOICES[randomIndex]; 
}

function playRound(playerSelection, computerSelection) {    
    if( playerSelection == computerSelection ) return DRAW_MSG;

    let result = LOSE_MSG;

    switch (playerSelection) {
        case ( PLAYER_CHOICES [0] ) : computerSelection == PLAYER_CHOICES [2] ? result = WIN_MSG : result = LOSE_MSG; break;
        case ( PLAYER_CHOICES [1] ) : computerSelection == PLAYER_CHOICES [0] ? result = WIN_MSG : result = LOSE_MSG; break;
        case ( PLAYER_CHOICES [2] ) : computerSelection == PLAYER_CHOICES [1] ? result = WIN_MSG : result = LOSE_MSG; break;
        default : result = INVALID_INPUT_MSG; break;
    }
    
    return result;
    
}

function playGame() {
    
    console.log(`<============== GAME STARTED =============>`);

    let playerScore = 0;
    let computerScore = 0;
    

    for (var i = 0; i < 5; i++ ) {
        console.log(`------- Round ${i + 1} -------`);

        const playerSelection = prompt(`
        Write your choice : Rock | Paper | Scissors :
                    ( YOU ) ${playerScore}  - ${computerScore} ( COMPUTER )
                                Rounds Left : ${5 - i} 
        `);
        const computerSelection = getComputerChoice();
        
        
        console.log("Your choice : " + playerSelection);
        console.log("Computer choice : " + computerSelection);
        
        let result = playRound(playerSelection.toLowerCase(), computerSelection);

        if (result == WIN_MSG) {
            console.log('You Won this round !');
            
            alert('You Won this round ! Computer choose ' + computerSelection);
            playerScore++;
        } else if (result == LOSE_MSG) {
            console.log('You lost this round !');
            alert('You lost this round ! Computer choose ' + computerSelection);
            computerScore++;
        } else if(result == DRAW_MSG) {
            console.log('Draw');
            alert('Draw, Computer choose ' + computerSelection);
        } else {
            console.log(result);
            alert( result + `
            
            
                Reload the page to restart the game !`);
            break;
        }
    }
    
    console.log(`------- FINAL SCORE -------`);
    console.log(`( YOU ) ${playerScore}  - ${computerScore} ( COMPUTER )`);
    let result = `
    ( YOU ) ${playerScore}  - ${computerScore} ( COMPUTER )
    `;
    if (i == 5) {
        if (playerScore == computerScore) {
            console.log (DRAW_MSG);
            result += DRAW_MSG;
        } else if (playerScore > computerScore) {
            console.log (WIN_MSG);
            result += WIN_MSG;
        } else {
            console.log (LOSE_MSG);
            result += LOSE_MSG;
        }
        alert(result);
    }
    console.log(`<==========================================>`);
}

playGame();

