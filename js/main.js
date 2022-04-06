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
    }
    this.checkAvailableJumps = function() { // Sets pieces jumpAvailable value to true if there is a jump
      if(this.player === 1) {
        let downRight = board[row + 1][col + 1];
        let downLeft = board[row + 1][col - 1];
        if(downRight) {
          if(downRight.player === -1 && board[row + 2][col + 2] === null) {
            this.jumpAvailable = true;
            return;
          } else {
            this.jumpAvailable = false;
          }
        };
        if(downLeft) {
          if(downLeft.player === -1 && board[row + 2][col - 2] === null) {
            this.jumpAvailable = true;
            return;
          } else {
            this.jumpAvailable = false;
          } 
        };
      };
      if(this.player === -1) {
        let upRight = board[row - 1][col + 1];
        let upLeft = board[row - 1][col - 1];
        if(upRight) {
          if(upRight.player === 1 && board[row - 2][col + 2] === null) {
            this.jumpAvailable = true;
            return;
          } else {
            this.jumpAvailable = false;
          }
        };
        if(upLeft) {
          if(upLeft.player === 1 && board[row - 2][col - 2] === null) {
            this.jumpAvailable = true;
            return;
          } else {
            this.jumpAvailable = false;
          }
        };
      };
    };


    this.canPieceMove = function() {
      if(this.jumpAvailable) {
        return;
      } 
      if(this.player === 1) {
        if(board[row + 1][col + 1] === null || board[row + 1][col - 1] === null) {
          this.allowedToMove = true;
        } else {
          this.allowedToMove = false;
        };
      };
      if(this.player === -1) {
        if(board[row - 1][col + 1] === null || board[row - 1][col - 1] === null) {
          this.allowedToMove = true;
        } else {
          this.allowedToMove = false;
        };
      };
    };


    this.move = function(row, col) {
      if(board[row][col] !== null) return; // Makes sure square clicked does not have pice in it

      if(this.player === 1){ //Captures piece downRight
        if(board[row][col] === null && (row - this.row) === 2 && Math.abs(col - this.col) === 2 && board[this.row + 1][this.col + 1]) {
          if(board[this.row + 1][this.col + 1].player === -1) {
            board[this.row + 1][this.col + 1] = null; // Sets jumped piece to null
            board[row][col] = this; 
            board[this.row][this.col] = null;
            this.row = row;
            this.col = col;
            playerTurn *= -1;
          }
        }
      }

      if(this.player === 1){ // Captures pice downLeft 
        if(board[row][col] === null && (row - this.row) === 2 && Math.abs(col - this.col) === 2 && board[this.row + 1][this.col - 1]) {
          if(board[this.row + 1][this.col - 1].player === -1) {
            board[this.row + 1][this.col - 1] = null;
            board[row][col] = this;
            board[this.row][this.col] = null;
            this.row = row;
            this.col = col;
            playerTurn *= -1;
          }
        }
      }
      
      if(this.player === -1) { // Captures piece upRight
        if(board[row][col] === null && (row - this.row) === -2 && Math.abs(col - this.col) === 2 && board[this.row - 1][this.col + 1]) {
          if(board[this.row - 1][this.col + 1].player === 1) {
            board[this.row - 1][this.col + 1] = null;
            board[row][col] = this;
            board[this.row][this.col] = null;
            this.row = row;
            this.col = col;
            playerTurn *= -1;
          }
        }
      }

      if(this.player === -1) { // Caputes pice upLeft
        if(board[row][col] === null && (row - this.row) === -2 && Math.abs(col - this.col) === 2 && board[this.row - 1][this.col - 1]) {
          if(board[this.row - 1][this.col - 1].player === 1) {
            board[this.row - 1][this.col - 1] = null;
            board[row][col] = this;
            board[this.row][this.col] = null;
            this.row = row;
            this.col = col;
            playerTurn *= -1;
          }
        }
      }

      if(this.player === 1 && this.king === false) {
        if((row - this.row === 1) && Math.abs(col - this.col) === 1) {
          board[row][col] = this;
          board[this.row][this.col] = null;
          this.row = row;
          this.col = col;
          console.log('pieceMoved');
          playerTurn *= -1;
        };
      };


      if(this.player === -1 && this.king === false) {
        if((row - this.row === -1) && Math.abs(col - this.col) === 1) {
          board[row][col] = this;
          board[this.row][this.col] = null;
          this.row = row;
          this.col = col;
          console.log('pieceMoved');
          playerTurn *= -1;
        };
      };


    };
  };
};

class Board {
  constuctor() {
    this.jumpExist = false;
    this.checkIfJumpExist = function() {
      this.jumpExist = false;
      for(let i of pieces) {
        i.allowedToMove = false;
        if(i.jumpAvailable) {
          this.jumpExist = true;
          i.allowedToMove = true;
        }
      }
    }
  }
}


/*------------constants------------*/

// Used to initialize my board state and map pieces to respective player
const NEW_BOARD = [
	[null,  1,    null,  1,    null,  1,     null,  1],
	[1,     null,  1,   null,  1,     null,  1,     null],
	[null,  1,    null,  1,    null,  1,     null,  1],
	[null,  null, null, null,  null,  null,  null,  null],
	[null,  null, null, null,  null,  null,  null,  null],
	[-1,    null, -1,   null,  -1,    null,  -1,    null],
	[null,  -1,   null, -1,    null,  -1,    null, -1],
	[-1,    null, -1,   null,  -1,    null,  -1,    null]
];

const player = {
  '-1': 'red',
  '1': 'black'
};

var distance = function(x1, y1, x2, y2) {
  return (Math.abs(x2 - x1) / 2) + (Math.abs(y2 - y1) / 2);
};

/*------------state variables------------*/
let board = []; // Array to represent board state
let playerTurn; // Represents player turn w/ 1 or -1
let pieces = [];
let selectedPiece;
let gameBoard = new Board;


/*------------DOM elements------------*/
const boardEls = [...document.querySelectorAll('tr')].map((row) => { // Array of the table data cells used in renderBoard function
  return [...row.children];
});


/*------------event listeners------------*/
document.querySelector('tbody').addEventListener('click', handleClick);

/*------------functions------------*/
init();

function init() {
  createNewBoard();
  playerTurn = -1;
  renderBoard();
  populatePieces();
}

// Creates new board with Piece objes on appropriate square using a NEW_BOARD array
function createNewBoard() {
  board = NEW_BOARD.map((boardRow, rowIdx) => {
    return boardRow.map((boardCol, colIdx) => {
      if(boardCol === null) return null;
      return new Piece(boardCol, rowIdx, colIdx);
    })
  })
}

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
  console.log(clickedRow);
  console.log(clickedCol);
  if(selectedPiece){
    selectedPiece.move(clickedRow, clickedCol);
    selectedPiece = null;
  } else {
    selectedPiece = board[clickedRow][clickedCol];
  }
  
  pieces.forEach((piece) => { // First check low level piece moves. only one space
    piece.canPieceMove();
  });

  pieces.forEach((piece) => { // Next, overwrite move availability by checking if there are available jumps
    piece.checkAvailableJumps();
  });
  
  renderBoard();
  
}

function populatePieces() { //Puts all piece objects into pieces array to check for pieces w/ legal moves/jumps etc...
  board.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if(col === null) return;
      pieces.push(col);
    })
  })
}