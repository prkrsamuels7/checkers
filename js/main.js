/*------------------Classes---------------*/

class Piece {
  constructor(player, row, col) {
    this.player = player; // Which player piece belongs to
    this.row = row;
    this.col = col;
    this.king = false; // King
    this.getLegalMoves = function() {
      let legalMoves = []
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
let board = [];
let playerTurn;
let selectedPiece;


/*------------DOM elements------------*/
const boardEls = [...document.querySelectorAll('tr')].map((row) => {
  return [...row.children];
});

const pieceEls = [...document.getElementsByClassName('piece')];




/*------------event listeners------------*/
document.querySelector('tbody').addEventListener('click', handleClick);

/*------------functions------------*/
init();

function init() {
  createNewBoard();
  playerTurn = -1;
  renderBoard();
}

// Creates new board with objects on appropriate square using a NEW_BOARD array
function createNewBoard() {
  board = NEW_BOARD.map((boardRow, rowIdx) => {
    return boardRow.map((boardCol, colIdx) => {
      if(boardCol === null) return null;
      return new Piece(boardCol, rowIdx, colIdx);
    })
  })
}

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
  console.log([...evt.currentTarget.children].indexOf(evt.target.parentElement.parentElement));
  console.log([...evt.target.parentElement.parentElement.children].indexOf(evt.target.parentElement))
  // playerTurn *= -1;
}

console.log(board);
console.log(board[5][2].getLegalMoves());


