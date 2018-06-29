import Config from './config.js';
import Util from './util.js';

const boardCellElements = [];
for (let i = 0; i < Config.BOARD_HEIGHT; i++) {
    boardCellElements[i] = [];
    for (let j = 0; j < Config.BOARD_WIDTH; j++) {
        const cellElement = document.createElement('td');
        cellElement.setAttribute('data-i', i.toString());
        cellElement.setAttribute('data-j', j.toString());
        boardCellElements[i][j] = cellElement;
    }
}

const boardElement = document.createElement('table');
const boardElementBody = boardElement.appendChild(document.createElement('tbody'));
for (let i = 0; i < Config.BOARD_HEIGHT; i++) {
    const boardRow = boardElementBody.appendChild(document.createElement('tr'));
    for (let j = 0; j < Config.BOARD_WIDTH; j++) {
        boardRow.appendChild(boardCellElements[i][j]);
    }
}

const init = (Config, Game, attemptMove) => {
    const cellClick = (e) => {
        const i = e.srcElement.getAttribute('data-i');
        const j = e.srcElement.getAttribute('data-j');
        attemptMove(i, j);
    };
    const cellMouseover = (e) => {
        const i = e.srcElement.getAttribute('data-i');
        const j = e.srcElement.getAttribute('data-j');

        if (Game.board[i][j] == 0) {
            e.srcElement.innerText = Util.getBoardSymbol(Game.playerTurn);
            e.srcElement.style.color = 'lightgrey';
        }
    };
    const cellMouseout = (e) => {
        const i = e.srcElement.getAttribute('data-i');
        const j = e.srcElement.getAttribute('data-j');

        if (Game.board[i][j] == 0) {
            e.srcElement.innerText = '';
        }
    };

    for (let i = 0; i < boardCellElements.length; i++) {
        for (let j = 0; j < boardCellElements[0].length; j++) {
            boardCellElements[i][j].addEventListener("click", cellClick);
            boardCellElements[i][j].addEventListener("mouseover", cellMouseover);
            boardCellElements[i][j].addEventListener("mouseout", cellMouseout);
        }
    }
};

const start = (el) => {
    el.appendChild(boardElement);
};

module.exports = {
    boardCellElements: boardCellElements,
    init: init,
    start: start,
};