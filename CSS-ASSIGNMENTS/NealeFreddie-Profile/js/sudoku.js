var numSelected = null;
var tileSelected = null;
var errors = 0;
const BOARD_SIZE = 9;
let solution = [];
let gameActive = false; // Track whether the game is active or not

// Initialize the game when the window loads
window.onload = function () {
  console.log("Window loaded, waiting to start the game.");
};

function generateFullBoard() {
  let board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(0)
  );

  function isValid(board, row, col, num) {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (board[row][i] == num || board[i][col] == num) return false;
      let subRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
      let subCol = Math.floor(col / 3) * 3 + (i % 3);
      if (board[subRow][subCol] == num) return false;
    }
    return true;
  }

  function fillBoard(board) {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] == 0) {
          let nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (let num of nums) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  fillBoard(board);
  return board;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createEasyLevelBoard(fullBoard) {
  let board = fullBoard.map((row) => [...row]);
  let filledCells = Math.floor(Math.random() * (45 - 35 + 1)) + 35;
  let cellsToRemove = BOARD_SIZE * BOARD_SIZE - filledCells;
  while (cellsToRemove > 0) {
    let row = Math.floor(Math.random() * BOARD_SIZE);
    let col = Math.floor(Math.random() * BOARD_SIZE);
    if (board[row][col] != 0) {
      board[row][col] = 0;
      cellsToRemove--;
    }
  }
  return board;
}

function setGame() {
  const fullBoard = generateFullBoard();
  solution = fullBoard;
  const easyBoard = createEasyLevelBoard(fullBoard);

  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (easyBoard[r][c] != 0) {
        tile.innerText = easyBoard[r][c];
        tile.classList.add("tile-start");
      }
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
      this.classList.add("tile-placed"); // New class for placed numbers
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors;
    }
  }
}

function resetGame() {
  console.log("Reset Game clicked");
  document.getElementById("board").innerHTML = "";
  document.getElementById("digits").innerHTML = "";
  errors = 0;
  document.getElementById("errors").innerText = errors;
  gameActive = false;
  document.getElementById("start-game-button").disabled = false;
}

document
  .getElementById("start-game-button")
  .addEventListener("click", function () {
    if (!gameActive) {
      setGame();
      gameActive = true;
      document.getElementById("start-game-button").disabled = true;
    }
  });

document
  .getElementById("reset-game-button")
  .addEventListener("click", function () {
    resetGame();
  });
