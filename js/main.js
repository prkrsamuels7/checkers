


/*------------constants------------*/
const NEW_BOARD = [
	[0,  1,  0,  1,  0,  1,  0,  1],
	[1,  0,  1,  0,  1,  0,  1,  0],
	[0,  1,  0,  1,  0,  1,  0,  1],
	[0,  0,  0,  0,  0,  0,  0,  0],
	[0,  0,  0,  0,  0,  0,  0,  0],
	[-1, 0, -1,  0, -1,  0, -1,  0],
	[0, -1,  0, -1,  0, -1,  0, -1],
	[-1, 0, -1,  0, -1,  0, -1,  0]
];


/*------------state variables------------*/
let board;
let playerTurn;
let redPieces = [];
let blackPieces = [];



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
  playerTurn = -1;
  getPlayerPieces();
}

function getPlayerPieces() {
  board.forEach((element) => {
    element.forEach((square) => {
      if(square === 1) blackPieces.push(square);
      if(square === -1) redPieces.push(square);
    });
  })
};

function renderPieces() {
  board.forEach((element) => {
  })
}

function handleClick(evt) {
  if(!evt.target.classList.contains('piece')) return;
  console.log('clicked ME!')
}