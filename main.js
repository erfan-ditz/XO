// main.js

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "easy";

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status-text");
const resetButton = document.getElementById("reset-button");
const modeButtons = document.querySelectorAll(".mode-buttons button");
const boardElement = document.querySelector(".board");

// === Mode Selection ===
modeButtons.forEach(button => {
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    resetGame();
    playSound("mode");
    statusText.textContent = `Mode: ${mode.toUpperCase()} selected. Your move...`;
  });
});

// === Cell Click ===
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = parseInt(cell.dataset.index);
    if (board[index] === "" && gameActive && currentPlayer === "X") {
      makeMove(index, "X");
      if (gameActive) {
        setTimeout(() => aiTurn(), 500);
      }
    }
  });
});

// === Reset Button ===
resetButton.addEventListener("click", () => {
  resetGame();
  playSound("reset");
});

// === Make Move ===
function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add("played");

  if (checkWin(player)) {
    statusText.textContent = `${player} wins!`;
    gameActive = false;
    highlightWin(player);
    playSound("win");
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    boardElement.classList.add("draw");
    playSound("draw");
  } else {
    currentPlayer = player === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn...`;
  }
}

// === AI Turn ===
function aiTurn() {
  let index = null;
  if (mode === "easy") index = getEasyMove(board);
  else if (mode === "medium") index = getMediumMove(board);
  else if (mode === "hard") index = getHardMove(board);

  if (index !== null && board[index] === "") {
    makeMove(index, "O");
  }
}

// === Reset Game ===
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Your move...";
  boardElement.classList.remove("draw");

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("played", "winner");
  });
}

// === Check Win ===
function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

// === Highlight Winning Cells ===
function highlightWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of winPatterns) {
    if (pattern.every(index => board[index] === player)) {
      pattern.forEach(index => {
        cells[index].classList.add("winner");
      });
      break;
    }
  }
}
