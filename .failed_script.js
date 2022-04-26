const items = ["Rock", "Paper", "Scissor"];
const controller = new AbortController();

function round(player_choice) {
    let computerSelection = Math.floor(Math.random() * items.length) ;
    let playerSelection = parseInt(player_choice)

    // ✅ Use simple logic with arithmetic
    // Scissor beats Paper (2 vs 1)
    // Paper beats Rock (1 vs 0)
    // Rock beats Scissor (0 vs 2)

    // choice_display = document.querySelector('.player_choice');
    // choice_display.textContent = `You choose: ${player_choice}`;
    // console.log(playerSelection)

    // choice_display = document.querySelector('.computer_choice');
    // choice_display.textContent = `Computer Chooses: ${computer_choice}`;

    if ((computerSelection - playerSelection === 1) || (computerSelection - playerSelection === -2)) {
        console.log(`You Lose! - ${items[computerSelection]} beats ${items[playerSelection]}`);
        console.log(`Computer Wins`);
        return 1;
    } else if (computerSelection - playerSelection === 0) {
        console.log(`${items[playerSelection]} vs ${items[computerSelection]}`);
        console.log(`It's a Tie`);
        return -1;
    } else {
        console.log(`You Win! - ${items[playerSelection]} beats ${items[computerSelection]}`);
        console.log(`Player Wins`);
        return 0;
    }
}

function game_play(start) {

    let playCount = 5;
    let playercount = 0;
    let computercount = 0;

    if (start == 1) 
    start.target.style.display = "none";

    console.info("Game Starts");

    let stop = 0;

    var button = document.querySelectorAll('.b2');

        
    for (var i = 0; i < button.length; i++) {
        button[i].style.display="inline"
        button[i].addEventListener("click", (choice) => {
            // Event Handler

            let a = round(choice.target.dataset['bt']); // ✅ learnt about dataset
        
            if (!(playercount < playCount && computercount < playCount)) {
        
                if (playercount > computercount) {
                    console.info("%c Player Wins the Match","color: green")
                } else if (playercount === computercount) {
                    console.info("It's a Tie - Do a Rematch")
                } else {
                    console.info("%c Computer Wins - You Failed!","color: red")
                }
                console.log("End of the Game");
                this.textContent = "Restart Again!";
                this.setAttribute("class","restart");
                this.removeEventListener("click", game_play);
                controller.abort();
                document.querySelector(".restart").addEventListener("click", game_play)
            }
        
            if (a == 1) computercount++;
            else if (a == -1);
            else playercount++;
        
            console.log(`%c For a Win of ${playCount}: Player = ${playercount} | Computer = ${computercount}`,"color: lightblue");
        
        }, {signal: controller.signal})
    }
}


document.querySelector(".start").addEventListener("click", game_play); // ✅ learnt about event object
document.querySelector(".start").textContent = "Start Game"



var button = document.querySelectorAll('.b2');
for (var i = 0; i < button.length; i++) {
    button[i].style.display = "none";
}