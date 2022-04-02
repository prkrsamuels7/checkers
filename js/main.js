


/*------------constants------------*/
const NEW_BOARD = [
	[null,  1,     null,  1,     null,  1,     null,  1],
	[1,     null,  1,     null,  1,     null,  1,     null],
	[null,  1,     null,  1,     null,  1,     null,  1],
	[0,     null,  0,     null,  0,     null,  0,     null],
	[null,  0,     null,  0,     null,  0,     null,  0],
	[-1,    null, -1,     null, -1,     null, -1,      null],
	[null, -1,     null, -1,     null, -1,     null, -1],
	[-1,    null, -1,     null, -1,     null, -1,     null]
];

/*------------state variables------------*/
let board;
let playerTurn;
let redPieces = [];
let blackPieces = [];
let selectedPiece;
const squareContains = {
  '-1': 'red',
  '1': 'black',
  '0': 'ds',
  'null': 'ls',
}



/*------------DOM elements------------*/
const pieceEls = {
  red: document.getElementsByClassName('red'),
  black: document.getElementsByClassName('black')
}



/*------------event listeners------------*/
document.querySelector('table').addEventListener('click', handleClick);

/*------------functions------------*/
init();

function init() {
  board = NEW_BOARD;
  createNewBoard();
  playerTurn = -1;
  getPlayerPieces();
  render();
}

function getPlayerPieces() {
  board.forEach((element) => {
    element.forEach((square) => {
      if(square === 1) blackPieces.push(square);
      if(square === -1) redPieces.push(square);
    });
  })
};


function render() {
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

/*---------------functions for creating the original board---------------- */
function createLightSquare() {
  let ls = document.createElement('td');
  ls.classList.add('ls')
  return ls;
}

function createDarkSquare() {
  let ds = document.createElement('td');
  ds.classList.add('ds');
  return ds;
}

function createBlackPiece() {
  let bp = document.createElement('td');
  bp.classList.add('ds');
  bp.innerHTML = '<p class="black piece"></p>';
  return bp;
}

function createWhitePiece() {
  let wp = document.createElement('td');
  wp.classList.add('ds');
  wp.innerHTML = '<p class="red piece"></p>';
  return wp;
}

function createNewBoard() {
  board.forEach(function(element, index) {
    element.forEach(function(square) {
      if(square === null) {
        document.getElementById(`row${index}`).appendChild(createLightSquare());
      } else if(square === 0) {
         document.getElementById(`row${index}`).appendChild(createDarkSquare());
      } else if (square === 1) {
         document.getElementById(`row${index}`).appendChild(createBlackPiece());
      } else if (square === -1) {
        document.getElementById(`row${index}`).appendChild(createWhitePiece());
      }
    })
  })
}

/*------------------piece movement---------------*/
