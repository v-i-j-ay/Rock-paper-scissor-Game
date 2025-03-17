let score = JSON.parse(localStorage.getItem('score'));
if (score === null) {
    score = {
        win: 0,
        loose: 0,
        tie: 0
    };
} else {
    displayscore();
}

function reset() {
    alert("reset your score");

    // Reset the score object to 0
    score.win = 0;
    score.loose = 0;
    score.tie = 0;

    // Remove the score from localStorage and set it back to 0
    localStorage.removeItem('score');
    localStorage.setItem('score', JSON.stringify(score));

    // Clear previous outputs from the game
    clearPreviousOutputs();

    // Call displayscore to update the UI after reset
    displayscore();
}

function displayscore() {
    const scorecard2 = document.querySelector('#scorecard2');

    // Add a border to the scorecard
    scorecard2.classList.add('border-3');
    
    // Display the score: Wins, Losses, and Ties
    scorecard2.innerText = `Wins : ${score.win} , Losses : ${score.loose} , Ties : ${score.tie}`;
}

// Function to clear the previous outputs when reset is clicked
function clearPreviousOutputs() {
    // Clear the inner content of the scorecard that displays results
    const scorecard1 = document.querySelector('#scorecard1');
    const scorecard = document.querySelector('#scorecard');
    
    // Remove background color and reset text
    scorecard1.classList.remove('bg-green-700', 'bg-red-700', 'bg-orange-700',);
    scorecard1.innerText = '';

    // Clear previous game result and computer's choice
    scorecard.innerHTML = '';
    scorecard.classList.remove('border-3');
    scorecard1.classList.remove('border-3');
}

let auto = false;
let x;

function autoplay() {
    if (!auto) {
        x = setInterval(function () {
            const playermove = pickComputermove();
            playgame(playermove);
        }, 3000);
        alert("autoplay start");
        auto = true;
    } else {
        clearInterval(x);
        alert("autoplay end");
    }
}

function playgame(option) {
    const computermove = pickComputermove();
    let result = "";

    // Game logic to determine the result
    if (option === "sissor") {
        if (computermove === "rock") {
            result = "LOST";
        } else if (computermove === "sissor") {
            result = "TIED";
        } else if (computermove === "paper") {
            result = "WON";
        }
    } else if (option === "rock") {
        if (computermove === "rock") {
            result = "TIED";
        } else if (computermove === "sissor") {
            result = "WON";
        } else if (computermove === "paper") {
            result = "LOST";
        }
    } else if (option === "paper") {
        if (computermove === "rock") {
            result = "WON";
        } else if (computermove === "sissor") {
            result = "LOST";
        } else if (computermove === "paper") {
            result = "TIED";
        }
    }

    // Update score based on result
    if (result === "WON") {
        score.win += 1;
    } else if (result === "LOST") {
        score.loose += 1;
    } else if (result === "TIED") {
        score.tie += 1;
    }

    // Save updated score to localStorage
    localStorage.setItem('score', JSON.stringify(score));

    // Update scorecard
    const scorecard = document.querySelector('#scorecard');
    const scorecard1 = document.querySelector('#scorecard1');
    const opt1 = `<img src="./photos/rock.png" alt="rock" class="w-20 h-20 ">`;
    const opt2 = `<img src="./photos/scizzors.png" alt="scissor" class="w-20 h-20 ">`;
    const opt3 = `<img src="./photos/paper.png" alt="paper" class="w-20 h-20 ">`;

    scorecard.classList.add('border-3');

    // Clear previous background classes
    scorecard1.classList.remove('bg-green-700', 'bg-red-700', 'bg-orange-700');

    // Update UI based on result
    if (result === 'WON') {
        scorecard1.classList.add('border-3', 'bg-green-700');
        scorecard1.innerText = `YOU ${result}`;
    } else if (result === 'LOST') {
        scorecard1.classList.add('border-3', 'bg-red-700');
        scorecard1.innerText = `YOU ${result}`;
    } else if (result === 'TIED') {
        scorecard1.classList.add('border-3', 'bg-orange-700');
        scorecard1.innerText = `YOU ${result}`;
    }

    // Display the moves
    if (option === "rock" && computermove === "rock") {
        scorecard.innerHTML = `You picked ${opt1} Computer picked${opt1}`;
    } else if (option === "rock" && computermove === "paper") {
        scorecard.innerHTML = `You picked ${opt1} Computer picked${opt3}`;
    } else if (option === "rock" && computermove === "sissor") {
        scorecard.innerHTML = `You picked ${opt1} Computer picked${opt2}`;
    } else if (option === "sissor" && computermove === "rock") {
        scorecard.innerHTML = `You picked ${opt2} Computer picked${opt1}`;
    } else if (option === "sissor" && computermove === "paper") {
        scorecard.innerHTML = `You picked ${opt2} Computer picked${opt3}`;
    } else if (option === "sissor" && computermove === "sissor") {
        scorecard.innerHTML = `You picked ${opt2} Computer picked${opt2}`;
    } else if (option === "paper" && computermove === "rock") {
        scorecard.innerHTML = `You picked ${opt3} Computer picked${opt1}`;
    } else if (option === "paper" && computermove === "paper") {
        scorecard.innerHTML = `You picked ${opt3} Computer picked${opt3}`;
    } else if (option === "paper" && computermove === "sissor") {
        scorecard.innerHTML = `You picked ${opt3} Computer picked${opt2}`;
    }

    // Call displayscore to update the score display
    displayscore();
}

function pickComputermove() {
    let computermove = "";
    let randomnumber = Math.random();
    if (randomnumber >= 0 && randomnumber < 1 / 3) {
        computermove = "rock";
    } else if (randomnumber >= 1 / 3 && randomnumber < 2 / 3) {
        computermove = "paper";
    } else if (randomnumber >= 2 / 3 && randomnumber < 1) {
        computermove = "sissor";
    }
    return computermove;
}
