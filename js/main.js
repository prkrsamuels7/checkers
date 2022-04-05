/*------------------Classes---------------*/

class Piece {
  constructor(player, row, col) {
    this.player = player; // Which player piece belongs to
    this.row = row;
    this.col = col;
    this.king = false; // King
    this.getLegalMoves = function() {
      let legalMoves = []
      let downRight = board[row + 1][col + 1];
      let downLeft = board[row + 1][col - 1];
      if(this.player === 1) {
        if((downRight.player === -1) && downRight.downRight === null) { // Starting jump logic
          
        }
      }
      if(this.player === 1 && this.king === false) {
        if(board[row + 1][col + 1] === null) legalMoves.push([row + 1, col + 1]);
        if(board[row + 1][col - 1] === null) legalMoves.push([row + 1, col - 1]);
      } else {
        if(board[row - 1][col + 1] === null) legalMoves.push([row - 1, col + 1]);
        if(board[row - 1][col - 1] === null) legalMoves.push([row - 1, col - 1]);
      }
      return legalMoves;
    };
    this.move = function() {
      if(this.player === 1 && this.king === false) {
        board[this.row][this.col] = null;
        board[this.row + 1][this.col + 1] = this;
      };
      if(this.player === -1 && this.king === false) {
        board[this.row][this.col] = null;
        board[this.row - 1][this.col + 1] = this;
      };
    };
  };
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


/*------------state variables------------*/
let board = []; // Array to represent board state
let playerTurn; // Represents player turn w/ 1 or -1
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





/* Return if item clicked is not a piece.
 Also return if it is not the turn of the player that clicked. Will allow player to switch
 selected piece if it is their turn*/
function handleClick(evt) {
  if(!(evt.target.classList.contains('red') || evt.target.classList.contains('black'))) return; // Ignore click if it isnt a piece
  let clickedRow = [...evt.currentTarget.children].indexOf(evt.target.parentElement.parentElement);
  let clickedCol = [...evt.target.parentElement.parentElement.children].indexOf(evt.target.parentElement);
  let selectedPiece = board[clickedRow][clickedCol];
  // board[selectedPieceRow][selectedPieceCol].move();
  console.log(selectedPiece);
  console.log(selectedPiece.getLegalMoves());

  

  renderBoard();
}

console.log(board);
console.log(board[5][2].getLegalMoves());


let downRight = board[3][4];
let downLeft = board[3][2];
