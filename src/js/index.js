/**
 * Config
 */
const boardWidth = 8;
const boardHeight = 8;

/**
 * Initialize Board
 *
 * 0 - empty
 * 1 - player 1
 * 2 - player 2
 */
const getBoardSymbol = (p) => {
    switch (p) {
        case 0:
            return '';
            break;
        case 1:
            return 'x';
            break;
        case 2:
            return 'o';
            break;
        default:
            return '?';
    }
};

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
        cellElement.setAttribute('data-i', i.toString());
        cellElement.setAttribute('data-j', j.toString());
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
    boardCellElements[i][j].innerText = getBoardSymbol(board[i][j]);
    boardCellElements[i][j].style.color = 'black';
};

let playerTurn = 1; //player 1 or 2
const cellClick = (e) => {
    const i = e.srcElement.getAttribute('data-i');
    const j = e.srcElement.getAttribute('data-j');

    if (board[i][j] == 0) {
        updateBoard(i, j, playerTurn);

        if (playerTurn == 1) { playerTurn = 2 }
        else if (playerTurn == 2) { playerTurn = 1 }
    }
};
const cellMouseover = (e) => {
    const i = e.srcElement.getAttribute('data-i');
    const j = e.srcElement.getAttribute('data-j');

    if (board[i][j] == 0) {
        e.srcElement.innerText = getBoardSymbol(playerTurn);
        e.srcElement.style.color = 'lightgrey';
    }
};
const cellMouseout = (e) => {
    const i = e.srcElement.getAttribute('data-i');
    const j = e.srcElement.getAttribute('data-j');

    if (board[i][j] == 0) {
        e.srcElement.innerText = '';
    }
};

window.onload = (() => {
    document.getElementById('game').appendChild(boardElement);

    const tds = document.body.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
        tds[i].addEventListener("click", cellClick);
        tds[i].addEventListener("mouseover", cellMouseover);
        tds[i].addEventListener("mouseout", cellMouseout);
    }
});