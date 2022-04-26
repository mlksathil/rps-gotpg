// LINK ./index.html

const items = ["Stone", "Fur", "Spear"];
let clanStatus = document.querySelector('.clanstatus')
let container = document.querySelector('.container');
let playerText = document.querySelector('#player_choice');
let computerText = document.querySelector('#computer_choice');
let roundStatus = document.querySelector('#round');
let result = document.querySelector('#result');
let condition = document.querySelector('#condition');
let playerScoreBoard = document.querySelector('#pboard');
let computerScoreBoard = document.querySelector('#cboard');

// SECTION: Condition Checking
function conditionPlay(computerSelection, playerSelection) {
    // ✅ Use simple logic with arithmetic
    // Scissor beats Paper (2 vs 1)
    // Paper beats Rock (1 vs 0)
    // Rock beats Scissor (0 vs 2)
    
    if ((computerSelection - playerSelection === 1) || (computerSelection - playerSelection === -2)) {
        condition.textContent = `You Lose! - ${items[computerSelection]} beats ${items[playerSelection]}`;
        result.textContent = `Opponent Scores`;
        result.style.setProperty('color','red');
        return "Computer";
    } else if (computerSelection - playerSelection === 0) {
        condition.textContent = `${items[playerSelection]} - vs - ${items[computerSelection]}`;
        result.textContent = `Tie`;
        result.style.setProperty('color','#A98467');
        return "Tie";
    } else {
        condition.textContent = `You Win! - ${items[playerSelection]} beats ${items[computerSelection]}`;
        result.textContent = `Player Scores`;
        result.style.setProperty('color','green');
        return "Player";
    }
}

// SECTION: Round Start Function
function roundStart(choice) {

    let computerSelection = -1;
    let playerSelection = choice;

    // Player Choice
    playerText.textContent = `You have chosen ${items[playerSelection]}`
    
    // Computer Choice
    computerSelection = Math.floor(Math.random() * items.length);
    computerText.textContent = `Opponent has chosen ${items[computerSelection]}`;

    return conditionPlay(computerSelection, playerSelection);

}

// SECTION: Game Start Function
function gameStart(e) {
    const countPlay = 5;
    let computercount = 0;
    let playercount = 0;
    let play = 0;


    // Make Conatiner Visible
    container.style.setProperty('display','flex');

    // Change Button Status
    let button = e.target
    button.textContent = "Run from Game";
    button.classList.add('stop');

    let tmpWin = 0;

    let imgButtons = document.querySelectorAll('.b2')
    imgButtons.forEach(b => b.addEventListener('click', function(e) {

        choice = e.currentTarget.dataset.bt;
        console.log(e.currentTarget)

        play++;
        roundStatus.textContent = `Round ${play}`;

        // Check Status of one round
        tmpWin = roundStart(choice);
        
        if (tmpWin === "Computer") {
            computercount++;
        }
        else if (tmpWin == "Tie");
        else {
            playercount++;
        }

        playerScoreBoard.children[1].textContent = `${playercount}`;
        computerScoreBoard.children[1].textContent = `${computercount}`;

        if (play >= countPlay) {
            roundStatus.textContent = 'Game Over';
            if (playercount > computercount) {
                result.textContent = `You Won the Match by ${playercount}`;
                result.style.setProperty('color','green');
                clanStatus.innerHTML = "<span style='color:green;'>You saved your Clan!</span>";
            } else if (playercount === computercount) {
                result.textContent = "It's a Tie - Replay the Match!";
                result.style.setProperty('color','black');
            } else {
                result.textContent = `Your Opponent Won the Match by ${computercount}`;
                result.style.setProperty('color','red');
                clanStatus.innerHTML = '<span style="color:red;">Your Clan is in Despair!</span>';
            }
        }   

        // SECTION: Checks for Game End
        if (play > countPlay) {
            button.textContent = "Bargain for Game!";
            button.classList.remove('stop');
            container.style.setProperty('display','none');

            // SECTION: Reset Everything
            computercount = 0;
            playercount = 0;
            play = 1;

            clanStatus.textContent = 'Save your Clan!';
            
            computerText.textContent = '';
            playerText.textContent = '';
            
            roundStatus.textContent = '';
            roundStatus.style.removeProperty('color');
            result.textContent = '';
            result.style.removeProperty('color');
            
            condition.textContent = '';

            playerScoreBoard.lastChild.textContent = '0';
            computerScoreBoard.lastChild.textContent = '0';
        }
    },false)
    );
}

// SECTION: Starting the game
let start = document.querySelector('.start');
start.addEventListener('click', e => {
    if (e.target.textContent === 'Start the Game!' || e.target.textContent === 'Bargain for Game!') gameStart(e)
    else {
        console.log(e.target)
        e.target.textContent = "Start the Game!";
        container.style.setProperty('display','none');
        e.target.classList.remove('stop');
    }
});