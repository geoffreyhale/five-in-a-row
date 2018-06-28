import AI from './ai.js';
import Util from './util.js';
//@todo breakup the following into game logic vs DOM manipulation

/**
 * Config
 */
const BOARD_HEIGHT = 15;
const BOARD_WIDTH = 15;
const COLOR_WIN = 'lime';
const USE_COMPUTER_OPPONENT = true;

/**
 * Globals
 */
let playerTurn = 1; //player 1 or 2
let gameover = false;

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
for (let i = 0; i < BOARD_HEIGHT; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
        board[i][j] = 0;
    }
}

/**
 * Cell Is (Part Of At Least) Five In A Row
 */
const cellIsFIAR = (board, i, j) => {
    return 5 <= Util.cellMaxIAR(board, i, j);
};

const checkBoardForFiveInARow = (i, j) => {
    i = parseInt(i);
    j = parseInt(j);

    if (cellIsFIAR(board, i, j)) {
        boardCellElements[i][j].style.background = COLOR_WIN;
        gameover = true;
    }
};

const transitionToNextTurn = () => {
    checkBoardForFiveInARow(...lastMove);

    if (!gameover) {
        if (playerTurn == 1) { playerTurn = 2 }
        else if (playerTurn == 2) { playerTurn = 1 }

        //@todo shouldn't be here
        if (USE_COMPUTER_OPPONENT) {
            const [i,j] = AI.getNextFromBoard(board);
            updateBoard(i, j, playerTurn);
            checkBoardForFiveInARow(i, j);

            if (playerTurn == 1) { playerTurn = 2 }
            else if (playerTurn == 2) { playerTurn = 1 }
        }
    }
};

let lastMove = null;
const attemptMove = (i, j) => {
    if (board[i][j] == 0) {
        updateBoard(i, j, playerTurn);
        lastMove = [i, j];
        transitionToNextTurn();
    }
};

const cellClick = (e) => {
    const i = e.srcElement.getAttribute('data-i');
    const j = e.srcElement.getAttribute('data-j');
    attemptMove(i, j);
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

const boardCellElements = [];
for (let i = 0; i < BOARD_HEIGHT; i++) {
    boardCellElements[i] = [];
    for (let j = 0; j < BOARD_WIDTH; j++) {
        const cellElement = document.createElement('td');
        cellElement.setAttribute('data-i', i.toString());
        cellElement.setAttribute('data-j', j.toString());
        cellElement.addEventListener("click", cellClick);
        cellElement.addEventListener("mouseover", cellMouseover);
        cellElement.addEventListener("mouseout", cellMouseout);
        boardCellElements[i][j] = cellElement;
    }
}

const boardElement = document.createElement('table');
const boardElementBody = boardElement.appendChild(document.createElement('tbody'));
for (let i = 0; i < BOARD_HEIGHT; i++) {
    const boardRow = boardElementBody.appendChild(document.createElement('tr'));
    for (let j = 0; j < BOARD_WIDTH; j++) {
        boardRow.appendChild(boardCellElements[i][j]);
    }
}

const updateBoard = (i, j, playerTurn) => {
    board[i][j] = playerTurn;
    boardCellElements[i][j].innerText = getBoardSymbol(board[i][j]);
    boardCellElements[i][j].style.color = 'black';
};

window.onload = (() => {
    document.getElementById('game').appendChild(boardElement);
});