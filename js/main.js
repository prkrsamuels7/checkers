/*------------------Classes---------------*/

class Piece {
  constructor(player, row, col) {
    this.player = player; // Which player piece belongs to
    this.row = row;
    this.col = col;
    this.jumpAvailable = false;
    this.allowedToMove = true;
    this.king = false;
    this.makeKing = function () {
      this.king = true;
    };
    // this.checkAvailableJumps = function() { // Sets pieces jumpAvailable value to true if there is a jump
    //   if(this.player === 1) {
    //     let downRight = board[row + 1][col + 1];
    //     let downLeft = board[row + 1][col - 1];
    //     if(downRight) {
    //       if(downRight.player === -1 && board[row + 2][col + 2] === null) {
    //         this.jumpAvailable = true;
    //         return;
    //       } else {
    //         this.jumpAvailable = false;
    //       };
    //     };
    //     if(downLeft) {
    //       if(downLeft.player === -1 && board[row + 2][col - 2] === null) {
    //         this.jumpAvailable = true;
    //         return;
    //       } else {
    //         this.jumpAvailable = false;
    //       };
    //     };
    //   };
    //   if(this.player === -1) {
    //     let upRight = board[row - 1][col + 1];
    //     let upLeft = board[row - 1][col - 1];
    //     if(upRight) {
    //       if(upRight.player === 1 && board[row - 2][col + 2] === null) {
    //         this.jumpAvailable = true;
    //         return;
    //       } else {
    //         this.jumpAvailable = false;
    //       };
    //     };
    //     if(upLeft) {
    //       if(upLeft.player === 1 && board[row - 2][col - 2] === null) {
    //         this.jumpAvailable = true;
    //         return;
    //       } else {
    //         this.jumpAvailable = false;
    //       };
    //     };
    //   };
    // };
    // this.canPieceMove = function() {
    //   if(this.jumpAvailable) {
    //     return;
    //   } 
    //   if(this.player === 1) {
    //     if(board[row + 1][col + 1] === null || board[row + 1][col - 1] === null) {
    //       this.allowedToMove = true;
    //     } else {
    //       this.allowedToMove = false;
    //     };
    //   };
    //   if(this.player === -1) {
    //     if(board[row - 1][col + 1] === null || board[row - 1][col - 1] === null) {
    //       this.allowedToMove = true;
    //     } else {
    //       this.allowedToMove = false;
    //     };
    //   };
    // };
    this.move = function(row, col) {
      if(board[row][col] !== null) return; // Makes sure square clicked does not have pice in it

      if(this.player === 1){ //Captures piece downRight
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
      if(this.player === 1){ // Captures pice downLeft 
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
      if(this.player === -1) { // Captures piece upRight
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
      if(this.player === -1) { // Captures pice upLeft
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

const player = {
  '-1': 'RED',
  '1': 'BLACK'
};

/*------------state variables------------*/
let board = []; // Array to represent board state
let playerTurn; // Represents player turn w/ 1 or -1
let selectedPiece; // Holds currently selected pice for move functions
let winner = null;
let pieces = []; //Holds all pieces


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
  pushPiecesToArray();
  playerTurn = -1;
  alertMsg.innerHTML = '';
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
      } else {
        square.add('red');
        square.remove('blck');
        square.remove('hidden');
      };
    });
  });
};

function handleClick(evt) {
  let clickedRow = [...evt.currentTarget.children].indexOf(evt.target.parentElement);
  let clickedCol = [...evt.target.parentElement.children].indexOf(evt.target);
  if(selectedPiece){
    if(selectedPiece.player !== playerTurn) {
      selectedPiece = null;
      alertMsg.classList.remove('hidden');
      alertMsg.innerHTML = `It's ${player[playerTurn]}'s turn!`
      return;
    }
    selectedPiece.move(clickedRow, clickedCol);
    // checkWinner(); // Need to check winner after every move is made
    selectedPiece = null;
  } else {
    selectedPiece = board[clickedRow][clickedCol];
  }
  renderBoard();
  // checkWinner();
  alertMsg.classList.add('hidden');
};

function pushPiecesToArray() {
  board.forEach(function(row) {
    row.forEach(function(col) {
      if(col === null) return;
      pieces.push(col);
    });
  });
};

// function checkWinner() {
//   if(!(pieces.some((row) => {
//     return row.some((col) => {
//       if(col === null) return;
//       return col.player === -1;
//     })
//   }))) {
//     winner = 1;
//     winMsg.innerHTML = `${player[winner]} WINS!`
//   };
// };

// function checkWinner() {
//   if(!(pieces.some((row) => row.some((col) => col.player === -1)))) {
//     winner = 1;
//     winMsg.innerHTML = `${player[winner]} WINS!`
//   }

//   if(!(pieces.some((row) => row.some((col) => col.player === 1)))) {
//     winner = -1;
//     winMsg.innerHTML = `${player[winner]} WINS!`
//   }
// }