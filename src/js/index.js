/**
 * Initialize Board
 */
const boardWidth = 8;
const boardHeight = 12;
let board = [];
for (let i = 0; i < boardHeight; i++) {
    board[i] = [];
    for (let j = 0; j < boardWidth; j++) {
        board[i][j] = 0;
    }
}

const boardCellElements = [];
for (let i = 0; i < boardHeight; i++) {
    boardCellElements[i] = [];
    for (let j = 0; j < boardWidth; j++) {
        const cellElement = document.createElement('td');
        cellElement.setAttribute('data-i', i);
        cellElement.setAttribute('data-j', j);
        boardCellElements[i][j] = cellElement;
    }
}

const boardElement = document.createElement('table');
const boardElementBody = boardElement.appendChild(document.createElement('tbody'));
for (let i = 0; i < boardHeight; i++) {
    const boardRow = boardElementBody.appendChild(document.createElement('tr'));
    for (let j = 0; j < boardWidth; j++) {
        boardRow.appendChild(boardCellElements[i][j]);
    }
}



let nextClick = 'x';
const getNextClick = () => {
  nextClick = nextClick == 'x' ? 'o' : 'x';
  return nextClick;
};

window.onload = (() => {
    document.getElementById('game').appendChild(boardElement);

    const tds = document.body.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
        tds[i].onclick = function() {
            tds[i].innerHTML = getNextClick();
        };
    }
});