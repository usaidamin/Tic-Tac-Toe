const box = document.querySelectorAll(".box");
const winnerText = document.querySelector("#winnerText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    box.forEach(box => box.addEventListener("click", boxClicked));
    restartBtn.addEventListener("click", restartGame);
    winnerText.innerText = `${currentPlayer}'s turn`;
    running = true;
}

function boxClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running) {
        return;
    }

    updateBox(this, cellIndex);
    checkWinner();
}

function updateBox(box, index) {
    options[index] = currentPlayer;
    box.innerText = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    winnerText.innerText = `${currentPlayer}'s turn`;
}

function checkWinner() {
    var roundWon = false;

    for(let i = 0; i < winConditions.length; i++) {
        var condition = winConditions[i];
        var boxA = options[condition[0]];
        var boxB = options[condition[1]];
        var boxC = options[condition[2]];

        if(boxA == "" || boxB == "" || boxC == "") {
            continue;
        }
        if(boxA == boxB && boxB == boxC) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        winnerText.innerText =  `${currentPlayer}'s` + " " + "wins!";
        running = false;
    }
    else if(!options.includes("")) {
        winnerText.innerText = `Game Draw!`;
        running = false;
        
    }
    else{
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "",  ""];
    winnerText.innerText = `${currentPlayer}'s turn`;
    box.forEach(box => box.innerText = "");
    running = true;
}