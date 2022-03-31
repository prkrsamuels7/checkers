// document.querySelector('.play-again-btn').addEventListener('click', handleClick);

// function handleClick(event) {
//     console.log(event);
// }

let pieces = {
    '1': 'white',
    '-1': 'black',
    'null': ''
}

let board = [];

for(let i = 1; i < 9; i++) {
    board.push(Array.from(document.querySelectorAll(`div div:nth-child(${i})`)));
};

document.querySelector('#board').addEventListener('click', handleClick)

function handleClick(event) {
    console.log(event.target.value);
}

