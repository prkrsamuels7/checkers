/*------------------Classes---------------*/

class Piece {
  constructor(player, row, col) {
    this.player = player; // Which player piece belongs to
    this.row = row;
    this.col = col;
    this.king = false;
    this.makeKing = function () {
      this.king = true;
    };
    this.move = function(row, col) {
      if(board[row][col] !== null) return; // Makes sure square clicked does not have piece in it
      if((this.player === 1 && this.row === 7) || (this.player === -1 && this.row === 0)) this.king = true;
      if(this.king === true) {
        if(Math.abs(row - this.row) === 1 && Math.abs(col - this.col) === 1) {
          board[row][col] = this;
          board[this.row][this.col] = null;
          this.row = row;
          this.col = col;
          playerTurn *= -1;
        };
      };
      if(this.player === 1 || this.king === true){ //Captures piece downRight
        if(board[row][col] === null && (row - this.row) === 2 && (col - this.col) === 2 && board[this.row + 1][this.col + 1]) {
          if(board[this.row + 1][this.col + 1].player === -1) {
            board[this.row + 1][this.col + 1] = null; // Sets jumped piece to null
            board[row][col] = this; 
            board[this.row][this.col] = null;
            this.row = row;
            this.col = col;
            playerTurn *= -1;
          };
        };
      };
      if(this.player === 1 || this.king === true){ // Captures pice downLeft 
        if(board[row][col] === null && (row - this.row) === 2 && (col - this.col) === -2 && board[this.row + 1][this.col - 1]) {
          if(board[this.row + 1][this.col - 1].player === -1) {
            board[this.row + 1][this.col - 1] = null;
            board[row][col] = this;
            board[this.row][this.col] = null;
            this.row = row;
            this.col = col;
            playerTurn *= -1;
          };
        };
      };
      if(this.player === -1 || this.king === true) { // Captures piece upRight
        if(board[row][col] === null && (row - this.row) === -2 && (col - this.col) === 2 && board[this.row - 1][this.col + 1]) {
          if(board[this.row - 1][this.col + 1].player === 1) {
            board[this.row - 1][this.col + 1] = null;
            board[row][col] = this;
            board[this.row][this.col] = null;
            this.row = row;
            this.col = col;
            playerTurn *= -1;
          };
        };
      };
      if(this.player === -1 || this.king === true) { // Captures pice upLeft
        if(board[row][col] === null && (row - this.row) === -2 && (col - this.col) === -2 && board[this.row - 1][this.col - 1]) {
          if(board[this.row - 1][this.col - 1].player === 1) {
            board[this.row - 1][this.col - 1] = null;
            board[row][col] = this;
            board[this.row][this.col] = null;
            this.row = row;
            this.col = col;
            playerTurn *= -1;
          };
        };
      };
      if(this.player === 1 && this.king === false) { // single square movement
        if((row - this.row === 1) && Math.abs(col - this.col) === 1) {
          board[row][col] = this;
          board[this.row][this.col] = null;
          this.row = row;
          this.col = col;
          playerTurn *= -1;
        };
      };
      if(this.player === -1 && this.king === false) { // single square movement
        if((row - this.row === -1) && Math.abs(col - this.col) === 1) {
          board[row][col] = this;
          board[this.row][this.col] = null;
          this.row = row;
          this.col = col;
          playerTurn *= -1;
        };
      };
    };
  };
};

/*------------constants------------*/
// Used to initialize my board state and map pieces to respective player
const NEW_BOARD = [
	[null, 1, null, 1, null, 1, null, 1],
	[1, null, 1, null, 1, null, 1, null],
	[null, 1, null, 1, null, 1, null, 1],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[-1, null, -1, null, -1, null, -1, null],
	[null, -1, null, -1, null, -1, null, -1],
	[-1, null, -1, null, -1, null, -1, null]
];

const player = { // player object for rendering win message and player turn
  '-1': 'RED',
  '1': 'BLACK'
};

/*------------state variables------------*/
let board = []; // Array to represent board state
let playerTurn; // Represents player turn w/ 1 or -1
let selectedPiece; // Holds currently selected pice for move functions
let winner = null; // Will hold 1 if black wins and -1 if red ends


/*------------DOM elements------------*/
const boardEls = [...document.querySelectorAll('tr')].map((row) => { // Array of the table data cells used in renderBoard function
  return [...row.children];
});
const resetGameBtn = document.querySelector('button');
const alertMsg = document.querySelector('h2');
const winMsg = document.querySelector('h3');

/*------------event listeners------------*/
document.querySelector('tbody').addEventListener('click', handleClick);
resetGameBtn.addEventListener('click', init);

/*------------functions------------*/
init();

function init() {
  createNewBoard();
  renderBoard();
  playerTurn = -1;
  alertMsg.innerHTML = '';
  winMsg.innerHTML = '';
};

// Creates new board with Piece objes on appropriate square using a NEW_BOARD array
function createNewBoard() {
  board = NEW_BOARD.map((boardRow, rowIdx) => {
    return boardRow.map((boardCol, colIdx) => {
      if(boardCol === null) return null;
      return new Piece(boardCol, rowIdx, colIdx);
    });
  });
};

// Updates the visual representation of the board state
function renderBoard() {
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if(boardEls[rowIndex][colIndex].classList.contains('ls')) return;
      let square = boardEls[rowIndex][colIndex].firstChild.classList;
      if(col === null) {
        square.add('hidden');
      } else if (col.player === 1) {
        square.add('black');
        square.remove('red');
        square.remove('hidden');
      } else if (col.player === -1){
        square.add('red');
        square.remove('blck');
        square.remove('hidden');
      };
    });
  });
};

// Grabs the index of the row and column of where the click is made
function handleClick(evt) {
  let clickedRow = [...evt.currentTarget.children].indexOf(evt.target.parentElement);
  let clickedCol = [...evt.target.parentElement.children].indexOf(evt.target);
  if(selectedPiece){
    if(selectedPiece.player !== playerTurn) {
      selectedPiece = null;
      alertMsg.classList.remove('hidden');
      alertMsg.innerHTML = `It's ${player[playerTurn]}'s turn!`
      return;
    };
    selectedPiece.move(clickedRow, clickedCol);
    checkWinner();
    selectedPiece = null;
  } else {
    selectedPiece = board[clickedRow][clickedCol];
  };
  renderBoard();
  alertMsg.classList.add('hidden');
};

// Checks if red or black still has pieces after every move is made
function checkWinner() {
  if(!(board.some(function(row) {
    return row.some(function(col) {
      if(col === null) return;
      return col.player === -1;
    })
  }))) {
    winner = 1;
    winMsg.innerHTML = `${player[winner]} WINS!`
  };
  if(!(board.some(function(row) {
    return row.some(function(col) {
      if(col === null) return;
      return col.player === 1;
    })
  }))) {
    winner = -1;
    winMsg.innerHTML = `${player[winner]} WINS!`
  };
};