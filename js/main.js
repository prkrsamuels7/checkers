/*------------------Classes---------------*/

class Piece {
  constructor(player) {
    this.allowedToMove = true; // Every piece can move when game starts
    // this.pieceEl = pieceEl; // Represents the linked DOM element
    // this.position = position; // Position on board [row][col]
    this.player = player; // Which player piece belongs to
    this.king = false; // King
    this.move = function() {

    }
  };
}


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
document.querySelector('table').addEventListener('click', handleClick);

/*------------functions------------*/
init();

function init() {
  createNewBoard();
  playerTurn = -1;
  renderBoard();
}

// Creates new board with objects on appropriate square using a NEW_BOARD array
function createNewBoard() {
  board = NEW_BOARD.map((boardRow) => {
    return boardRow.map((boardCol) => {
      if(boardCol === null) return null;
      return new Piece(boardCol);
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
      }
    })
  })
}



/* Return if item clicked is not a piece.
 Also return if it is not the turn of the player that clicked. Will allow player to switch
 selected piece if it is their turn*/
function handleClick(evt) {
  if(!evt.target.classList.contains('piece')) return;
  if(!evt.target.classList.contains(`${squareContains[playerTurn]}`)) return;
  selectedPiece = evt.target;
  console.log(selectedPiece);


  // playerTurn *= -1;
}


