const items = ["ROCK", "PAPER", "SCISSOR"];

function round(computerSelection, playerSelection) {
    // ✅ Use simple logic with arithmetic
    // LINK ./index.html
    // Scissor beats Paper (2 vs 1)
    // Paper beats Rock (1 vs 0)
    // Rock beats Scissor (0 vs 2)

    if ((computerSelection - playerSelection === 1) || (computerSelection - playerSelection === -2)) {
        console.log(`You Lose! - ${items[computerSelection]} beats ${items[playerSelection]}`);
        console.log(`Computer Wins`);
        return -1;
    } else if (computerSelection - playerSelection === 0) {
        console.log(`${items[playerSelection]} vs ${items[computerSelection]}`);
        console.log(`It's a Tie`);
        return 0;
    } else {
        console.log(`You Win! - ${items[playerSelection]} beats ${items[computerSelection]}`);
        console.log(`Player Wins`);
        return 1;
    }
}


function game() {
    const countPlay = 5;
    let computercount = 0;
    let playercount = 0;

    for (let i = 0; i < 5; i++) {
        let computerSelection = Math.floor(Math.random() * items.length);
        let playerSelection = undefined;
        
        innerloop: while(!items.includes(playerSelection)) {
            
            playerSelection = prompt("What's the choice?\nROCK\nPAPER\nSCISSOR").toUpperCase();
            
            if (!items.includes(playerSelection)) {
                alert("Please re-enter a proper value");
                continue innerloop;
            }
        }
        
        let a = round(computerSelection, items.indexOf(playerSelection));

        if (a == 1) computercount++;
        else if (a == -1);
        else playercount++;
    
        console.log(`%c For a Win of ${countPlay}: Player = ${playercount} | Computer = ${computercount}`,"color: lightblue");
    }

    if (playercount > computercount) {
        console.info("%cPlayer Wins the Match","color: green")
    } else if (playercount === computercount) {
        console.info("It's a Tie - Do a Rematch")
    } else {
        console.info("%cComputer Wins - You Failed!","color: red")
    }
}

game();