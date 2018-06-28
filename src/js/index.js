import * as ai from './ai.js';
//@todo breakup the following into game logic vs DOM manipulation

/**
 * Config
 */
const BOARD_HEIGHT = 15;
const BOARD_WIDTH = 15;
const COLOR_WIN = 'lime';

/**
 * Globals
 */
let playerTurn = 1; //player 1 or 2 //@todo isn't really being used atm
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
 *
 * Strategy:
 * 1. Count similar value consecutive adjacent cells in all 8 directions (starting North, cw)
 * 2. Sum count totals for all 4 directions (starting North, cw)
 */
const cellIsFIAR = (board, i, j) => {
    const minI = 0;
    const maxI = board.length - 1;
    const minJ = 0;
    const maxJ = board[0].length - 1; // warning: assumes rectangular

    const val = board[i][j];
    const count = {n:0, ne:0, e:0, se:0, s:0, sw:0, w:0, nw:0};

    //North
    for (let n = 0; n < 5; n++) {
        if (i - n >= minI) {
            if (board[i-n][j] == val) {
                count.n++;
            }
        }
    }
    //Northeast
    for (let n = 0; n < 5; n++) {
        if (i - n >= minI && j + n <= maxJ) {
            if (board[i-n][j+n] == val) {
                count.ne++;
            }
        }
    }
    //East
    for (let n = 0; n < 5; n++) {
        if (j + n <= maxJ) {
            if (board[i][j+n] == val) {
                count.e++;
            }
        }
    }
    //Southeast
    for (let n = 0; n < 5; n++) {
        if (i + n <= maxI && j + n <= maxJ) {
            if (board[i+n][j+n] == val) {
                count.se++;
            }
        }
    }
    //South
    for (let n = 0; n < 5; n++) {
        if (i + n <= maxI) {
            if (board[i+n][j] == val) {
                count.s++;
            }
        }
    }
    //Southwest
    for (let n = 0; n < 5; n++) {
        if (i + n <= maxI && j - n >= minJ) {
            if (board[i+n][j-n] == val) {
                count.sw++;
            }
        }
    }
    //West
    for (let n = 0; n < 5; n++) {
        if (j - n >= minJ) {
            if (board[i][j-n] == val) {
                count.w++;
            }
        }
    }
    //Northwest
    for (let n = 0; n < 5; n++) {
        if (i - n >= minI && j - n >= minJ) {
            if (board[i-n][j-n] == val) {
                count.nw++;
            }
        }
    }

    return 5 <= count.n + count.s - 1
        || 5 <= count.ne + count.sw - 1
        || 5 <= count.e + count.w - 1
        || 5 <= count.se + count.nw - 1
        ;
};

const checkBoardForFiveInARow = (i, j) => {
    i = parseInt(i);
    j = parseInt(j);

    if (cellIsFIAR(board, i, j)) {
        boardCellElements[i][j].style.background = COLOR_WIN;
        gameover = true;
    }
};

const cellClick = (e) => {
    const i = e.srcElement.getAttribute('data-i');
    const j = e.srcElement.getAttribute('data-j');

    if (board[i][j] == 0) {
        updateBoard(i, j, playerTurn);
        checkBoardForFiveInARow(i, j);

        //@todo shouldn't be here
        if (!gameover) {
            const next = ai.getNextFromBoard(board);
            updateBoard(next[0],next[1],2);
            checkBoardForFiveInARow(next[0],next[1]);
        }
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