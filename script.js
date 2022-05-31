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
let sr_c = document.querySelector('.sr_container');
let image;
let button = document.querySelector("body > button")

let computercount = playercount = play = 0;
let gameend = false;
let gifshow = 0;

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


function sr() {

    if(gifshow == 0) {

        image = document.createElement('img');

        gifshow++;

        container.style.setProperty('display','none');
        sr_c.style.setProperty('display', 'block');

        if (button.textContent == "Bargain??!")
            image.setAttribute('src','./images/gif/bargain.gif')
        else if (button.textContent == "Run from Game!")
            image.setAttribute('src','./images/gif/run.gif')
        else if (button.textContent == "Show Off!!!")
            image.setAttribute('src','./images/gif/showoff.gif')

        sr_c.appendChild(image);
    }

}

function gameRestart() {
            
    // SECTION: Checks for Game End
    if (gameend) {

        image.remove();
        
        console.log("Enter Game End");
        
        if (button.textContent == "Run from Game!" || button.textContent == "Bargain??!") {
            button.textContent = "Pleasing Opponent!";
            clanStatus.textContent = 'Save your Clan!';
            button.classList.add('stop');
        } else {
            button.textContent = "Play Rematch!";
            clanStatus.textContent = 'Mock them with a Rematch!';
        }
        
        clanStatus.style.removeProperty('color');
        sr_c.style.setProperty('display', 'none');

        // SECTION: Reset Everything
        computercount = 0;
        playercount = 0;
        play = 0;
        gameend = false;
        gifshow = 0;
        
        computerText.textContent = '';
        playerText.textContent = '';
        
        roundStatus.textContent = '';
        roundStatus.style.removeProperty('color');
        result.textContent = '';
        result.style.removeProperty('color');
        
        condition.textContent = '';

        playerScoreBoard.children[1].textContent = '0';
        computerScoreBoard.children[1].textContent = '0';
    }
}

// SECTION: rps_Buttons Click
let imgButtons = document.querySelectorAll('.b2')
imgButtons.forEach(b => b.addEventListener('click', function(e) {

    if (gameend) return  sr(), setTimeout(gameRestart, 5000) ;

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

    let tmpWin = 0;
    const countPlay = 5;

    choice = e.currentTarget.dataset.bt;

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

    if (computercount >= countPlay || playercount >= countPlay) {
        // console.log('Enter Before Game End')
        roundStatus.textContent = 'Game Over';
        gameend = true;

        if (playercount > computercount) {
            result.textContent = `You Won the Match`;
            result.style.setProperty('color','green');
            clanStatus.textContent = "You saved your Clan!";
            clanStatus.style.setProperty('color','green');
            button.textContent = "Show Off!!!"
            button.classList.remove('stop')
        } else {
            result.textContent = `Your Opponent Won the Match`;
            result.style.setProperty('color','red');
            clanStatus.textContent = 'Your Clan is in Despair!';
            clanStatus.style.setProperty('color','red');
            button.textContent = "Bargain??!"
        }
    }   
},false));

// SECTION: Starting the game
let start = document.querySelector('.start');
start.addEventListener('click', e => {
    if (button.textContent === 'Start the Game!') {

        // Make Conatiner Visible
        container.style.setProperty('display','flex');

        // Change Button Status
        button.textContent = "Run from Game!";
        button.classList.add('stop');
    
    } else if (gifshow > 0) {
        gameRestart();
    } else if (button.textContent === 'Bargain??!' || button.textContent === 'Show Off!!!' || button.textContent === "Run from Game!") { 
        sr();
        gameend = true;
        setTimeout(gameRestart, 5000);
    } else {
        gameRestart()
        
        button.textContent = "Start the Game!";
        container.style.setProperty('display','none');
        button.classList.remove('stop');
        clanStatus.textContent = 'Save your Clan!'
        clanStatus.style.setProperty('color','black');
    }
});