/**
 * Initialize Board
 *
 * 0 - empty
 * 1 - x
 * 2 - o
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
        if (board[i][j] == 1) {
            cellElement.innerText = 'x';
        }
        else if (board[i][j] == 2) {
            cellElement.innerText = 'o';
        }
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

const updateBoard = (i, j, playerTurn) => {
    board[i][j] = playerTurn;
    const cellElement = boardCellElements[i][j];
    if (board[i][j] == 1) {
        cellElement.innerText = 'x';
    }
    else if (board[i][j] == 2) {
        cellElement.innerText = 'o';
    }
    boardCellElements[i][j] = cellElement;
};

let playerTurn = 1; //player 1 or 2
const clickCell = (e) => {
    const i = e.srcElement.getAttribute('data-i');
    const j = e.srcElement.getAttribute('data-j');

    if (board[i][j] == 0) {
        updateBoard(i, j, playerTurn);

        if (playerTurn == 1) { playerTurn = 2 }
        else if (playerTurn == 2) { playerTurn = 1 }
    }
};

window.onload = (() => {
    document.getElementById('game').appendChild(boardElement);

    const tds = document.body.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
        tds[i].onclick = clickCell;
        //     function() {
        //     tds[i].innerHTML = nextClick;
        //     updateNextClick();
        // };
    }
});