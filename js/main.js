/*------------------Classes---------------*/

class Piece {
  constructor(player, row, col) {
    this.player = player; // Which player piece belongs to
    this.row = row;
    this.col = col;
    this.jumpAvailable = false;
    this.allowedToMove = true;
    this.king = false;
    this.getAvailableJumps = function() { // Check all pieces to see if any have a jump available
      if(this.player === 1){
        let downRight = board[row + 1][col + 1];
        let downLeft = board[row + 1][col - 1];
        if(downRight === null && downLeft === null){
          this.jumpAvailable = false;
          return;
        } 
        if(downRight?.player === -1 && downRight?.downRight === null) this.jumpAvailable = true;
        if(downLeft?.player === -1 && downLeft?.downLeft === null) this.jumpAvailable = true;
      };
      if(this.player === -1) {
        let upRight = board[row - 1][col + 1];
        let upLeft = board[row - 1][col - 1];
        if(upRight === null && upLeft === null) {
          this.jumpAvailable = false;
          return;
        }
        if(upRight?.player === -1 && upRight?.downRight === null) this.jumpAvailable = true;
        if(upLeft?.player === -1 && upLeft?.downLeft === null) this.jumpAvailable = true;
      };
    };


    this.move = function() {
      board[this.row - 2][this.col] = this;
      board[this.row][this.col] = null;
      
      }
    }
  };



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

/*------------state variables------------*/
let board = []; // Array to represent board state
let playerTurn; // Represents player turn w/ 1 or -1
let pieces = [];
let selectedPiece;


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
        square.remove('black');
        square.remove('hidden');
      };
    });
  });
};





function handleClick(evt) {
  if(!(evt.target.classList.contains('red') || evt.target.classList.contains('black'))) return; // Ignore click if it isnt a piece
  // if(evt.target.classList !== player[playerTurn]) return;
  let clickedRow = [...evt.currentTarget.children].indexOf(evt.target.parentElement.parentElement);
  let clickedCol = [...evt.target.parentElement.parentElement.children].indexOf(evt.target.parentElement);
  let selectedPiece = board[clickedRow][clickedCol];
  console.log(selectedPiece);
  console.log()
  // console.log(selectedPiece.getLegalMoves());  
  console.log(evt.target.classList);
  selectedPiece.move();

  renderBoard();
  pieces.forEach((e) => {
    e.getAvailableJumps();
  })
  playerTurn *= -1;
}

function populatePieces() { //Puts all piece objects into pieces array to check for pieces w/ legal moves
  board.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if(col === null) return;
      pieces.push(col);
    })
  })
}

