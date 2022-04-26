// LINK ./index.html

const items = ["Rock", "Paper", "Scissor"];
let container = document.querySelector('.container')

function condition(computerSelection, playerSelection) {
    // ✅ Use simple logic with arithmetic
    // Scissor beats Paper (2 vs 1)
    // Paper beats Rock (1 vs 0)
    // Rock beats Scissor (0 vs 2)



    if ((computerSelection - playerSelection === 1) || (computerSelection - playerSelection === -2)) {
        // console.log(`You Lose! - ${items[computerSelection]} beats ${items[playerSelection]}`);
        console.log(`Computer Wins`);
        return "Computer";
    } else if (computerSelection - playerSelection === 0) {
        // console.log(`${items[playerSelection]} vs ${items[computerSelection]}`);
        console.log(`It's a Tie`);
        return "Tie";
    } else {
        // console.log(`You Win! - ${items[playerSelection]} beats ${items[computerSelection]}`);
        console.log(`Player Wins`);
        return "Player";
    }
}

function roundStart(choice) {

    let playerText = document.querySelector('#player_choice');
    let computerText = document.querySelector('#computer_choice');

    let computerSelection = 0;
    let playerSelection = choice;

    // Player Choice
    playerText.textContent = `You have chosen ${items[playerSelection]}`
    
    // Computer Choice
    computerSelection = Math.floor(Math.random() * items.length);
    computerText.textContent = `Computer has chosen ${items[computerSelection]}`;

    return condition(computerSelection, playerSelection);

}

function gameStart(e) {
    const countPlay = 5;
    let computercount = 0;
    let playercount = 0;
    let play = 1;


    // Make Conatiner Visible
    container.style.setProperty('display','block');
    // Change Button Status
    let button = e.target
    button.textContent = "Stop the Game";

    let tmpWin = 0;

    let weapons = document.querySelector('.weapons')
    weapons.addEventListener('click', function(e) {

        choice = e.target.dataset.bt;
        tmpWin = roundStart(choice);
        play++;

        if (play > countPlay) {
            button.textContent = "Restart the Game!";
            container.style.setProperty('display','none');

            computercount = 0;
            playercount = 0;
            play = 1;

            if (playercount > computercount) {
                console.info("%cPlayer Wins the Match","color: green")
            } else if (playercount === computercount) {
                console.info("It's a Tie - Replay")
            } else {
                console.info("%cComputer Wins - You Failed!","color: red")
            }
        }

        if (tmpWin === "Computer") computercount++;
        else if (tmpWin == "Tie");
        else playercount++;

    });
}

// Starting the game
let start = document.querySelector('.start');
start.addEventListener('click', e => {
    if (e.target.textContent === 'Start the Game!' || e.target.textContent === 'Restart the Game!') gameStart(e)
    else {
        e.target.textContent = "Start the Game!";
        container.style.setProperty('display','none');
    }
});