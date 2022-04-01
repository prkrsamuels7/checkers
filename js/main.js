// document.querySelector('.play-again-btn').addEventListener('click', handleClick);

// function handleClick(event) {
//     console.log(event);
// }

class Piece {
  constructor(color, position) {
    this.color = color;
    this.position = position;
  }
  checkMoves() {

  }
}

let boardOccupied = {
    '1': '.red',
    '-1': '.black',
    'null': ''
}

let board = [
  [0, 1, 0, 1, 0, 1, 0 ,1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0 ,1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0]
];

var pieces = []
// var board = [];

// formula to get distance
var distance = function(x1, x2, y1, y2) {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

class Pieces = {
  constructor
}


let pieces = document.querySelectorAll('.piece');
let currentPiece;
let playerTurn;

document.querySelector('#board').addEventListener('click', handleClick)

init();

function init() {
  resetBoard();
  checkBoardState();
}

function handleClick(event) {
  let isPiece = event.target.classList[1];
  if(!isPiece) return;
  currentPiece = event.target;
  console.log(currentPiece);
  checkLegalMoves();
}

function resetBoard() {
  for(let i = 1; i < 9; i++) {
    board.push(Array.from(document.querySelectorAll(`div div:nth-child(${i})`)));
  };
}

function checkBoardState() {
  board.forEach(function(element) {
    element.forEach(function(square) {
      if(square.classList.contains('.black-occupied')) {
        square = '-1';
      }
    })
  })
}

function checkLegalMoves() {}

function listenForTurn() {
}

// const inventors = [
//   { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
//   { first: 'Isaac', last: 'Newton', year: 1643, passed: 17-17 },
//   { first: 'Galileo', last: 'Galilei', year: 1564, passed: 164-1 },
//   { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
//   { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
//   { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
//   { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
//   { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
//   { first: 'Ada', last: 'Lovelace', year: 1815, passed: 185-1 },
//   { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
//   { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
//   { first: 'Hanna', last: 'Hammarström', year: 18-19, passed: 1909 }
// ];

// const inventorNames = inventors.map(({ first, last }) => ({ first, last }));