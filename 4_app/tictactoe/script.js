console.log("Game development");
console.log("Tic Tac Toe Game Started");

let playerXScoreElement = document.getElementById("playerXScore");
let drawScoreElement = document.getElementById("drawScore");
let playerOScoreElement = document.getElementById("playerOScore");
let totalMatchesElement = document.getElementById("totalMatches");

let playerXScore = 0;
let playerOScore = 0;
let drawScore = 0;
let totalMatches = 0;


let board = [
    "", "", "", "", "", "", "", "", ""
]

let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]



let currentPlayer = "X";

let gameActive = true;

const cells = document.querySelectorAll(".cell");

function renderBoard() {
    cells.forEach(function (cell) {
        let index = cell.dataset.index;
        cell.textContent = board[index];
    })
}

function resetBoard() {
    board = [
        "", "", "", "", "", "", "", "", ""
    ]
    // renderBoard();
    cells.forEach(function (cell) {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    })
    let randomeVal = parseInt(Math.random() * 10) % 2;
    console.log("Random: " + randomeVal)
    if (randomeVal == 0) {
        currentPlayer = "X";
    } else {
        currentPlayer = "O";
    }
    gameActive = true;
    updateStatus();

    localStorage.removeItem("ticTacToeScore")
    updateScoreboard();

}

function handleCellClick(event) {
    if (gameActive == false) {
        return;
    }
    let clickedCell = event.target;
    let clickedCellIndex = event.target.dataset.index;

    if (board[clickedCellIndex] !== "") {
        return;
    }
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    clickedCell.classList.add(currentPlayer.toLowerCase());

    if (gameActive == true) {

        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }

        updateStatus();
        checkWinner();
        checkDraw();
    }

}

cells.forEach(function (cell) {
    cell.addEventListener("click", handleCellClick)
})

renderBoard()

let resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", resetBoard);

let gameStatus = document.getElementById("gameStatus");

function updateStatus() {
    gameStatus.innerText = "Player " + currentPlayer + " Turn"
}

function checkWinner() {
    winningPattern.forEach(function (pattern) {
        let a = pattern[0];
        let b = pattern[1];
        let c = pattern[2];

        if (board[a] === "") {

        } else if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            gameActive = false;
            gameStatus.textContent = "Player " + board[a] + " wins.";
            if (board[a] === "X") {
                playerXScore++;
            } else {
                playerOScore++;
            }
            totalMatches++;
            loadScores();
            updateScoreboard();
            saveScores()

            return;
        }

    });
}

function checkDraw() {
    console.log("checking")
    let isDraw = true;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            isDraw = false;
        }
    }
    if (isDraw == true && gameActive) {
        console.log("Draw")
        gameActive = false;
        gameStatus.textContent = "Match Draw!";
        drawScore++;
        totalMatches++;
        loadScores();
        updateScoreboard();
        saveScores();
    }
}

function updateScoreboard() {
    playerXScoreElement.innerText = playerXScore;
    drawScoreElement.innerText = drawScore;
    playerOScoreElement.innerText = playerOScore;
    totalMatchesElement.innerText = totalMatches;
}


function saveScores() {

    // json
    let scoreData = {
        "playerXScore": playerXScore,
        "drawScore": drawScore,
        "playerOScore": playerOScore,
        "totalMatches": totalMatches
    }

    localStorage.setItem("ticTacToeScore", JSON.stringify(scoreData))
}


function loadScores(){
    let storedData = localStorage.getItem("ticTacToeScore");

    if(storedData){
        storedData = JSON.parse(storedData);
        playerXScore = storedData.playerXScore;
        drawScore = storedData.drawScore;
        playerOScore = storedData.playerOScore;
        totalMatches = storedData.totalMatches;
    }
}

loadScores()
updateScoreboard()